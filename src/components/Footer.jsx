import React from 'react';
import Logo from './Logo';

export const Footer = ({ navigateTo }) => {
  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#" className="footer-logo-link" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
            <Logo />
          </a>
          <p className="footer-tagline">
            Premium academy designed for visual designers, film editors, and creators aiming for elite client placements and global freelancing careers.
          </p>
        </div>
        
        <div className="footer-links-col">
          <h4>Programs</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('courses', 'graphic-design'); }}>Graphic Design</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('courses', 'video-editing'); }}>Video Editing</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('courses', 'cinematography'); }}>Cinematography</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('courses', 'social-media-marketing'); }}>Social Media Marketing</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('courses', 'performance-marketing'); }}>Performance Marketing</a>
        </div>

        <div className="footer-links-col">
          <h4>Quick Links</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>About Us</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); }}>Testimonial</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('career'); }}>Career</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Contact Us</a>
        </div>

        <div className="footer-links-col">
          <h4>Contact Info</h4>
          <p>
            <a href="mailto:contact@bawraskillhouse.com" style={{ textDecoration: 'underline' }}>contact@bawraskillhouse.com</a>
          </p>
          <p>
            <a href="tel:+917340053442" style={{ textDecoration: 'underline' }}>+91 73400 53442</a>
          </p>
          <p>
            <a 
              href="https://www.google.com/maps/place/Bawra+Digitals+Pvt.+Ltd./@26.2798087,72.9976924,17z/data=!3m1!4b1!4m6!3m5!1s0xf13e4866b3a4841:0xca51de0c41730bad!8m2!3d26.2798039!4d73.0002673!16s%2Fg%2F11trq_7fr4?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline' }}
            >
              Jodhpur, Rajasthan
            </a>
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Bawra Skill House. All rights reserved. Designed to Awwwards premium design guidelines.</p>
        <div className="footer-social-row">
          <a href="#" aria-label="Behance">Behance</a>
          <a href="#" aria-label="YouTube">YouTube</a>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Dribbble">Dribbble</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
