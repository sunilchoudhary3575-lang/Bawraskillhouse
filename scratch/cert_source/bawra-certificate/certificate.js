/* Standalone browser module, no network, no framework and no database writes. */
(function(global){
  'use strict';
  const defaults={studentName:'JITENDRA JANGID',courseName:'VIDEO EDITING + GRAPHIC DESIGNING COURSE',duration:'45 DAYS',issueDate:'30/09/2026'};
  function displayDate(value){
    if(/^\d{4}-\d{2}-\d{2}$/.test(value))return value.split('-').reverse().join('/');
    return value;
  }
  function mount(root){
    if(!root)throw new Error('A certificate root is required.');
    const nodes=[...root.querySelectorAll('[data-field]')];
    const originals=new Map(nodes.map(node=>[node,{x:node.getAttribute('x'),text:node.textContent}]));
    let state={...defaults};
    const ready=Promise.all([
      document.fonts.load('700 42px "Reference Roboto"'),
      document.fonts.load('400 14px "Reference Roboto"'),
      document.fonts.load('400 59px "Reference Slab"'),
      ...[...root.querySelectorAll('img')].map(img=>img.decode())
    ]);
    function render(){
      for(const node of nodes){
        const key=node.dataset.field;let value=String(state[key]??'').trim();
        value=key==='issueDate'?displayDate(value):value.toUpperCase();
        const original=originals.get(node);
        node.setAttribute('font-size',node.dataset.fontSize);
        node.removeAttribute('textLength');node.removeAttribute('lengthAdjust');
        node.removeAttribute('letter-spacing');
        // Never interpolate student data as HTML.
        node.textContent=value;
        if(value===original.text){node.setAttribute('x',original.x);node.removeAttribute('text-anchor');continue;}
        node.setAttribute('x',node.dataset.center);node.setAttribute('text-anchor','middle');
        if(key==='studentName'||key==='courseName')node.setAttribute('letter-spacing',key==='studentName'?'0.9':'0.4');
        const max=Number(node.dataset.maxWidth);
        if(node.getComputedTextLength()>max){
          // Tracking remains fixed while glyph size changes, so use measured
          // binary search rather than a single proportional estimate.
          let low=0.1,high=Number(node.dataset.fontSize);
          for(let i=0;i<18;i++){
            const mid=(low+high)/2;node.setAttribute('font-size',mid);
            if(node.getComputedTextLength()<=max)low=mid;else high=mid;
          }
          node.setAttribute('font-size',low);
        }
      }
      root.setAttribute('aria-label',`Course completion certificate for ${state.studentName}`);
    }
    async function update(data={}){
      for(const key of Object.keys(defaults))if(Object.prototype.hasOwnProperty.call(data,key))state[key]=data[key];
      await ready;render();
    }
    ready.then(render);
    return {ready,update,getData:()=>({...state})};
  }
  global.BawraCertificate={mount};
})(window);
