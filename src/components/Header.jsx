import React from 'react';
import Logo from './Logo';

export const Header = ({
  showHeader,
  currentPage,
  navigateTo,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  triggerModal
}) => {
  return (
    <header className={`navbar glass-dark ${showHeader ? 'header-visible' : 'header-hidden'}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo-link" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
          <Logo />
        </a>

        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#" className={currentPage === 'home' ? 'active-page' : ''} onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a>
          <a href="#" className={currentPage === 'about' ? 'active-page' : ''} onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>About Us</a>
          <a href="#" className={currentPage === 'courses' ? 'active-page' : ''} onClick={(e) => { e.preventDefault(); navigateTo('courses'); }}>Courses</a>
          <a href="#" className={currentPage === 'portfolio' ? 'active-page' : ''} onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); }}>Testimonial</a>
          <a href="#" className={currentPage === 'career' ? 'active-page' : ''} onClick={(e) => { e.preventDefault(); navigateTo('career'); }}>Career</a>
          <a href="#" className={currentPage === 'contact' ? 'active-page' : ''} onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Contact Us</a>
          <button 
            className="btn-enroll-today nav-cta-mobile" 
            onClick={() => {
              setIsMobileMenuOpen(false);
              triggerModal('General Consultation');
            }} 
            style={{ textDecoration: 'none' }}
          >
            <span className="btn-enroll-text">Enroll Today</span>
          </button>

        </nav>

        <div className="nav-actions">
          <button className="btn btn-outline nav-cta" onClick={() => triggerModal('Enquiry')} style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem', borderRadius: '50px' }}>
            Enquiry
          </button>
          
          {/* Admin Panel Trigger */}
          <button 
            className="nav-admin-trigger" 
            onClick={() => navigateTo('admin')}
            aria-label="Open Admin Dashboard"
            title="Admin Panel"
          >
            <div className="admin-avatar-glow"></div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="admin-avatar-icon">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>

          <button className="menu-toggle" aria-label="Toggle Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


