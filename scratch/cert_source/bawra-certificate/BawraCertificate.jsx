import { useEffect, useRef } from 'react';
import fragment from './certificate-fragment.html?raw';
import artworkURL from './assets/certificate-artwork.png';
import './certificate.css';
import './certificate.js';

// Only this trusted, bundled template enters innerHTML. Student data is bound
// by certificate.js through textContent after mount.
const markup = fragment.replace('assets/certificate-artwork.png', artworkURL);

export default function BawraCertificate({ studentName, courseName, duration, issueDate }) {
  const container = useRef(null);
  const controller = useRef(null);
  useEffect(() => {
    controller.current = window.BawraCertificate.mount(container.current.querySelector('.bsh-certificate'));
    return () => { controller.current = null; };
  }, []);
  useEffect(() => {
    controller.current?.update({ studentName, courseName, duration, issueDate });
  }, [studentName, courseName, duration, issueDate]);
  return <div ref={container} dangerouslySetInnerHTML={{ __html: markup }} />;
}
