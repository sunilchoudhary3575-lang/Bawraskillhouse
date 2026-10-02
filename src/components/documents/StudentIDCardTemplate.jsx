import React, { useEffect, useRef } from 'react';
import logoImg from '../../assets/id-card-logo.png';
import backImg from '../../assets/id-card-back.png';
import placeholderImg from '../../assets/id-card-placeholder.svg';

/**
 * Official Student ID Card Template Component (Front & Back)
 * Replicates EXACT Master Bawra ID Card Source Design (Bawra-ID-Card-Source.zip).
 * Vector SVG Canvas (viewBox="0 0 612 976") + 300DPI Back Artwork.
 */
export const StudentIDCardTemplate = ({ student, options = {}, side = 'both' }) => {
  if (!student) return null;

  const rootRef = useRef(null);

  // Student Details Extraction
  const rawName = (student.fullName || student.studentName || 'Yashmit Bohra').trim();

  // Split name into first part and last part for 2-line rendering
  const nameParts = rawName.split(/\s+/).filter(Boolean);
  const nameLine1 = nameParts.length < 2 ? (nameParts[0] || '') : nameParts.slice(0, -1).join(' ');
  const nameLine2 = nameParts.length < 2 ? '' : nameParts.at(-1);

  // ID Formatting (e.g., "0033")
  let formattedId = (options.studentId !== undefined && options.studentId !== '')
    ? options.studentId
    : (() => {
        let rawId = student.registrationId || student.studentId || '0033';
        const digitsMatch = String(rawId).match(/\d+$/);
        if (digitsMatch) {
          const numStr = digitsMatch[0];
          return numStr.length >= 4 ? numStr.slice(-4) : numStr.padStart(4, '0');
        }
        return String(rawId).length < 4 ? String(rawId).padStart(4, '0') : String(rawId);
      })();
  const studentIdText = `Student ID - ${formattedId}`;

  // Phone Formatting (+91 XXXXX XXXXX)
  const rawPhone = student.mobile || student.phone || '8000997935';
  const cleanPhone = String(rawPhone).replace(/\D/g, '').slice(-10);
  const formattedPhone = cleanPhone.length === 10
    ? `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`
    : `+91 ${rawPhone}`;

  // Course / Batch Formatting
  const coursesArr = Array.isArray(student.courses)
    ? student.courses
    : (student.courses ? [student.courses] : ['Graphic Designing']);

  let batchMain = student.batch || options.batch || '';
  let courseSub = '';

  if (!batchMain) {
    if (coursesArr.some(c => c.toLowerCase().includes('combo'))) {
      batchMain = 'Combo Course';
      courseSub = '(Graphic Designing and Video Editing)';
    } else if (coursesArr.length > 1) {
      batchMain = 'Combo Course';
      courseSub = `(${coursesArr.join(' and ')})`;
    } else {
      batchMain = coursesArr[0] || 'Graphic Designing';
    }
  }
  const courseText = `Batch - ${batchMain}`;
  const descriptionText = courseSub ? courseSub : '';

  const photoUrl = student.studentPhotoUrl || student.studentPhoto || placeholderImg;

  // Text fitting algorithm matching master card.js
  useEffect(() => {
    if (!rootRef.current) return;
    const root = rootRef.current;
    const nodes = [...root.querySelectorAll('[data-id-field]')];

    Promise.all([
      document.fonts.load('400 36px "BSH ID Fira"'),
      document.fonts.load('700 92px "BSH ID Fira"'),
      ...[...root.querySelectorAll('img')].map(img => img.complete ? Promise.resolve() : new Promise(resolve => { img.onload = resolve; img.onerror = resolve; }))
    ]).then(() => {
      const fieldValues = {
        nameLine1,
        nameLine2,
        studentId: studentIdText,
        phone: formattedPhone,
        course: courseText,
        description: descriptionText
      };

      for (const node of nodes) {
        const key = node.dataset.idField;
        const val = fieldValues[key] ?? '';
        node.textContent = val;

        const baseSize = Number(node.dataset.base || 36);
        node.setAttribute('font-size', baseSize);

        const maxW = Number(node.dataset.width);
        if (maxW && node.getComputedTextLength && node.getComputedTextLength() > maxW) {
          let low = 1, high = baseSize;
          for (let i = 0; i < 18; i++) {
            const mid = (low + high) / 2;
            node.setAttribute('font-size', mid);
            if (node.getComputedTextLength() <= maxW) low = mid; else high = mid;
          }
          node.setAttribute('font-size', low);
        }
      }
    });
  }, [nameLine1, nameLine2, studentIdText, formattedPhone, courseText, descriptionText]);

  return (
    <div className="bsh-id-set" ref={rootRef}>
      {/* FRONT SIDE */}
      {(side === 'front' || side === 'both') && (
        <figure className="bsh-id-side">
          <figcaption>FRONT</figcaption>
          <div className="bsh-id-card bsh-id-front" id={`id-card-front-${student.id}`} aria-label={`Student ID card for ${rawName}`}>
            {/* Background SVG vector graphics & gradients */}
            <svg className="bsh-id-graphics" viewBox="0 0 612 976" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id={`bsh-base-${student.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#3d5ca8"/>
                  <stop offset="1" stopColor="#395ca6"/>
                </linearGradient>
                <linearGradient id={`bsh-sweep-${student.id}`} x1="0" y1="1" x2="1" y2="0">
                  <stop stopColor="#225ba7"/>
                  <stop offset="1" stopColor="#375daa"/>
                </linearGradient>
                <filter id={`bsh-shadow-${student.id}`} x="-30%" y="-30%" width="170%" height="190%">
                  <feDropShadow dx="0" dy="23" stdDeviation="15" floodColor="#111626" floodOpacity=".78"/>
                </filter>
                <linearGradient id={`bsh-ring-${student.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#101828"/>
                  <stop offset=".4" stopColor="#828f91"/>
                  <stop offset="1" stopColor="#ffffff"/>
                </linearGradient>
              </defs>
              <path fill="#fff" d="M0 0H612V976H0Z"/>
              <path fill={`url(#bsh-base-${student.id})`} d="M0 252H612V976H0Z"/>
              <path fill={`url(#bsh-sweep-${student.id})`} opacity=".64" d="M0 597L449 260C545 203 584 226 550 398C525 548 431 629 304 757C230 833 203 909 192 976H0Z"/>
              <path fill="#4661aa" opacity=".6" d="M42 976C86 877 145 803 199 724C252 646 228 580 317 483L559 285C550 458 548 650 493 773C458 854 400 922 354 976Z"/>
              <path filter={`url(#bsh-shadow-${student.id})`} fill="#4861aa" stroke="#c2cbe0" strokeWidth="1.3" d="M612 167H286A153 153 0 0 0 286 473H612Z"/>
              <path fill="#3d5ca8" opacity=".52" d="M286 167A153 153 0 0 0 286 473L612 242V167Z"/>
              <circle cx="292" cy="320" r="139" fill={`url(#bsh-ring-${student.id})`}/>
              <circle cx="292" cy="320" r="134" fill="#fff"/>
            </svg>

            {/* Logo */}
            <img className="bsh-id-logo" src={logoImg} alt="Bawra Skill House Logo" />

            {/* Student Photograph */}
            <img className="bsh-id-photo" src={photoUrl} alt={`Photograph of ${rawName}`} onError={(e) => { e.target.src = placeholderImg; }} />

            {/* SVG Text Layer */}
            <svg className="bsh-id-text" viewBox="0 0 612 976" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Student information">
              <g fill="white" fontFamily="BSH ID Fira, sans-serif">
                <text data-id-field="nameLine1" x="64" y="612" fontSize="92" fontWeight="700" data-base="92" data-width="492">{nameLine1}</text>
                {nameLine2 ? (
                  <text data-id-field="nameLine2" x="64" y="692" fontSize="72" fontWeight="700" data-base="72" data-width="492">{nameLine2}</text>
                ) : null}
                <text data-id-field="studentId" x="64" y={nameLine2 ? "755" : "705"} fontSize="36" data-base="36" data-width="490">{studentIdText}</text>
                <text data-id-field="phone" x="94" y={nameLine2 ? "807" : "757"} fontSize="34" data-base="34" data-width="470">{formattedPhone}</text>
                <text data-id-field="course" x="64" y={nameLine2 ? "861" : "811"} fontSize="36" data-base="36" data-width="530">{courseText}</text>
                {descriptionText ? (
                  <text data-id-field="description" x="64" y={nameLine2 ? "906" : "856"} fontSize="30" data-base="30" data-width="534">{descriptionText}</text>
                ) : null}
              </g>
              <g transform={nameLine2 ? "translate(63 779)" : "translate(63 729)"} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 5C0 9 3 24 14 29L19 24L13 20L10 23C6 19 5 15 6 12L9 10Z" fill="#fff" stroke="none"/>
                <path d="M13 3C19 4 22 8 22 14M14 0C22 1 26 7 26 14M13 7C16 8 18 10 18 13" strokeWidth="1"/>
              </g>
            </svg>
          </div>
        </figure>
      )}

      {/* BACK SIDE */}
      {(side === 'back' || side === 'both') && (
        <figure className="bsh-id-side">
          <figcaption>BACK</figcaption>
          <div className="bsh-id-card bsh-id-back" id={`id-card-back-${student.id}`} aria-label="Student ID card back">
            <img src={backImg} alt="Bawra Skill House Creative Learning Institute Back Artwork" />
          </div>
        </figure>
      )}
    </div>
  );
};

export default StudentIDCardTemplate;
