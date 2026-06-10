import React from 'react';

export const MobileStickyCTA = ({ showStickyCTA, triggerModal }) => {
  return (
    <div className={`mobile-sticky-cta glass ${showStickyCTA ? 'visible' : ''}`}>
      <div className="sticky-cta-content">
        <div>
          <p className="sticky-title">Bawra Skill House</p>
          <p className="sticky-subtitle">Creative Careers Consultation</p>
        </div>
        <button onClick={() => triggerModal('Sticky Bottom Call')} className="btn btn-primary sticky-btn">
          Book Call
        </button>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
