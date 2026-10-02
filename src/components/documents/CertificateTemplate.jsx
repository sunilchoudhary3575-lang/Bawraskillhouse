import React, { useEffect, useRef } from 'react';
import artworkURL from '../../assets/certificate-artwork.png';

/**
 * Official Course Completion Certificate Template Component
 * Integrates Bawra Certificate Master Artwork & SVG Vector Text System.
 * viewBox="0 0 841.68 595.2" (Exact A4 Landscape Proportion)
 */
export const CertificateTemplate = ({ student, options = {} }) => {
  if (!student) return null;

  const rootRef = useRef(null);

  const studentName = (student.fullName || student.studentName || 'JITENDRA JANGID').toUpperCase();

  const defaultCourse = Array.isArray(student.courses) && student.courses.length > 0
    ? student.courses.join(' + ').toUpperCase()
    : (typeof student.courses === 'string' ? student.courses.toUpperCase() : 'VIDEO EDITING + GRAPHIC DESIGNING COURSE');

  const rawCourse = (options.courseName || defaultCourse).replace(/COURSE$/i, '').trim();
  const courseName = `${rawCourse} COURSE`.toUpperCase();

  const duration = (options.duration || options.durationText || '45 DAYS').toUpperCase();
  let issueDate = options.issueDate || new Date().toLocaleDateString('en-GB');
  if (/^\d{4}-\d{2}-\d{2}$/.test(issueDate)) {
    issueDate = issueDate.split('-').reverse().join('/');
  }

  // Dynamic SVG text font-size fitting algorithm (matching source certificate.js)
  useEffect(() => {
    if (!rootRef.current) return;
    const root = rootRef.current;
    const nodes = [...root.querySelectorAll('[data-field]')];

    Promise.all([
      document.fonts.load('700 42px "Reference Roboto"'),
      document.fonts.load('400 14px "Reference Roboto"'),
      document.fonts.load('400 59px "Reference Slab"'),
      ...[...root.querySelectorAll('img')].map(img => img.complete ? Promise.resolve() : new Promise(resolve => { img.onload = resolve; img.onerror = resolve; }))
    ]).then(() => {
      const dataValues = { studentName, courseName, duration, issueDate };

      for (const node of nodes) {
        const key = node.dataset.field;
        let val = String(dataValues[key] ?? '').trim();
        if (key === 'issueDate' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
          val = val.split('-').reverse().join('/');
        } else if (key !== 'issueDate') {
          val = val.toUpperCase();
        }

        const baseFontSize = Number(node.dataset.fontSize || 16);
        node.setAttribute('font-size', baseFontSize);
        node.removeAttribute('textLength');
        node.removeAttribute('lengthAdjust');
        node.removeAttribute('letter-spacing');

        node.textContent = val;

        const centerPos = node.dataset.center;
        if (centerPos) {
          node.setAttribute('x', centerPos);
          node.setAttribute('text-anchor', 'middle');
        }

        if (key === 'studentName') node.setAttribute('letter-spacing', '0.9');
        if (key === 'courseName') node.setAttribute('letter-spacing', '0.4');

        const maxWidth = Number(node.dataset.maxWidth);
        if (maxWidth && node.getComputedTextLength && node.getComputedTextLength() > maxWidth) {
          let low = 0.1, high = baseFontSize;
          for (let i = 0; i < 18; i++) {
            const mid = (low + high) / 2;
            node.setAttribute('font-size', mid);
            if (node.getComputedTextLength() <= maxWidth) low = mid; else high = mid;
          }
          node.setAttribute('font-size', low);
        }
      }
    });
  }, [studentName, courseName, duration, issueDate]);

  return (
    <div className="bsh-certificate-wrapper">
      <div
        className="bsh-certificate"
        ref={rootRef}
        id={`certificate-doc-${student.id}`}
        aria-label={`Course completion certificate for ${studentName}`}
      >
        {/* Layer 0: Master Artwork (No student text, 300 DPI A4 Landscape) */}
        <img
          className="bsh-artwork"
          src={artworkURL}
          alt="Bawra Skill House Certificate Artwork"
          draggable="false"
        />

        {/* Layer 1: Vector SVG Text & Metadata */}
        <svg
          className="bsh-type"
          viewBox="0 0 841.68 595.2"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Student certificate details"
        >
          <text x="140.0536 188.7595 237.9245 287.0600 339.0908 370.4590 418.1907 449.5589 498.2654 547.0571 599.0878" y="179.1136" fontFamily="Reference Slab" fontWeight="400" fontSize="58.6796" fill="#cf295d" xmlSpace="preserve">CERTIFICATE</text>
          <text x="280.9621 298.4362 314.9674 324.0847 340.9533 358.4275 378.7540 382.1642 399.1024 415.1770 432.4030 450.4229 461.2871 478.7612" y="208.9152" fontFamily="Reference Slab" fontWeight="400" fontSize="20.3233" fill="#cf295d" xmlSpace="preserve">OF COM PLETION</text>
          <text x="388.12" y="261.6737" textAnchor="middle" fontFamily="Reference Roboto" fontWeight="400" fontSize="13.6183" fill="#090909" xmlSpace="preserve">This certificate is proudly presented to</text>
          <text x="388.12" y="402.9207" textAnchor="middle" fontFamily="Reference Roboto" fontWeight="400" fontSize="12.5727" fill="#090909" xmlSpace="preserve">They have showcased exceptional diligence, hands-on expertise in executing complex</text>
          <text x="388.12" y="420.7291" textAnchor="middle" fontFamily="Reference Roboto" fontWeight="400" fontSize="12.5727" fill="#090909" xmlSpace="preserve">creative design modules and the capability to deliver high-quality digital</text>
          <text x="388.12" y="438.5374" textAnchor="middle" fontFamily="Reference Roboto" fontWeight="400" fontSize="12.5727" fill="#090909" xmlSpace="preserve">media and commercial projects</text>
          <text x="388.12" y="334.8536" textAnchor="middle" fontFamily="Reference Roboto" fontWeight="400" fontSize="13.6183" fill="#090909" xmlSpace="preserve">has successfully completed the</text>

          {/* Dynamic Student Name */}
          <text
            data-field="studentName"
            data-center="388.12"
            data-max-width="424"
            data-font-size="41.4991"
            x="388.12"
            y="307.4982"
            textAnchor="middle"
            fontFamily="Reference Roboto"
            fontWeight="700"
            fontSize="41.4991"
            fill="#3852a4"
            xmlSpace="preserve"
          >
            {studentName}
          </text>

          {/* Dynamic Course Title */}
          <text
            data-field="courseName"
            data-center="388.05"
            data-max-width="588"
            data-font-size="25.4127"
            x="388.05"
            y="372.5238"
            textAnchor="middle"
            fontFamily="Reference Roboto"
            fontWeight="700"
            fontSize="25.4127"
            fill="#3852a4"
            xmlSpace="preserve"
          >
            {courseName}
          </text>

          <text x="493.3658 503.7092 512.4044 517.4337 526.0134 531.1659 534.9935 543.9891 552.6920" y="46.2947" fontFamily="Reference Roboto" fontWeight="400" fontSize="15.7759" fill="#090909" xmlSpace="preserve">Duration:</text>
          <text x="96.7174 107.5023 111.4936 117.0587 125.7717 134.3804 139.5921 148.9718 154.5368 158.6083 168.3655 172.3565 181.5836 190.6580 199.6040 204.9764 214.0428 219.6079" y="492.2899" fontFamily="Reference Roboto" fontWeight="400" fontSize="16.4459" fill="#090909" xmlSpace="preserve">Director Signature</text>
          <text x="564.4811 575.2661 584.2120 589.5845" y="529.9720" fontFamily="Reference Roboto" fontWeight="400" fontSize="16.4459" fill="#090909" xmlSpace="preserve">Date</text>

          {/* Dynamic Duration */}
          <text
            data-field="duration"
            data-center="638.05"
            data-max-width="145"
            data-font-size="19.3184"
            x="638.05"
            y="39.0928"
            textAnchor="middle"
            fontFamily="Reference Roboto"
            fontWeight="700"
            fontSize="19.3184"
            fill="#090909"
            xmlSpace="preserve"
          >
            {duration}
          </text>

          {/* Dynamic Issue Date */}
          <text
            data-field="issueDate"
            data-center="582.05"
            data-max-width="180"
            data-font-size="19.3184"
            x="582.05"
            y="553.4110"
            textAnchor="middle"
            fontFamily="Reference Roboto"
            fontWeight="700"
            fontSize="19.3184"
            fill="#090909"
            xmlSpace="preserve"
          >
            {issueDate}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default CertificateTemplate;
