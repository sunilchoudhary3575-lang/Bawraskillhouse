import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export const Header = ({
  showHeader = true,
  currentPage,
  navigateTo,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  triggerModal
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = currentPage === 'home' || currentPage === '' || !currentPage;
  const isDarkNav = scrolled || isHomePage;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'courses', label: 'Courses' },
    { id: 'portfolio', label: 'Testimonial' },
    { id: 'career', label: 'Career' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header className={`navbar-header-root ${showHeader ? 'header-visible' : 'header-hidden'}`}>
      <nav className={`navbar-inner-wrapper ${scrolled ? 'is-scrolled' : 'is-unscrolled'}`}>
        <div
          className={`nav-capsule-container ${
            scrolled
              ? 'capsule-scrolled'
              : isHomePage
              ? 'capsule-transparent'
              : 'capsule-light'
          }`}
        >
          {/* Logo with dynamic white glass pill badge when over dark background/video */}
          <div className="nav-logo-wrapper">
            <a
              href="#"
              className={`nav-logo-link ${isDarkNav ? 'logo-badge-dark' : 'logo-badge-light'}`}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                navigateTo('home');
              }}
              aria-label="Bawra Skill House Home"
            >
              <Logo />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="nav-desktop-links" aria-label="Desktop Navigation">
            {navLinks.map((link) => {
              const active = currentPage === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`nav-item-link ${active ? 'active' : ''} ${isDarkNav ? 'nav-item-dark' : 'nav-item-light'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(link.id);
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Actions: Enquiry Button, Admin Icon (Desktop only), Hamburger Toggle */}
          <div className="nav-actions-wrapper">
            <button
              className={`nav-btn-enquiry ${isDarkNav ? 'btn-enquiry-dark' : 'btn-enquiry-light'}`}
              onClick={() => triggerModal('Enquiry')}
            >
              Enquiry
            </button>

            {/* Admin Panel Trigger (hidden on mobile navbar for cleanliness, accessible in mobile menu) */}
            <button
              className={`nav-admin-trigger ${isDarkNav ? 'admin-dark' : 'admin-light'}`}
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

            {/* Mobile Menu Toggle Button with clean SVG icons */}
            <button
              className={`nav-mobile-toggle-btn ${isDarkNav ? 'toggle-dark' : 'toggle-light'}`}
              aria-label="Toggle navigation menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="nav-toggle-svg">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="nav-toggle-svg">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Panel (bawradigitals.com style floating pill) */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-dropdown-pill">
          <div className="mobile-menu-links-list">
            {navLinks.map((link) => {
              const active = currentPage === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`mobile-nav-link ${active ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    navigateTo(link.id);
                  }}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Mobile Admin Portal Entry */}
            <a
              href="#admin"
              className={`mobile-nav-link mobile-admin-link ${currentPage === 'admin' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                navigateTo('admin');
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Admin Portal
            </a>

            <div className="mobile-menu-bottom-cta">
              <button
                className="btn-enroll-today"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  triggerModal('General Consultation');
                }}
                style={{ textDecoration: 'none', width: '100%', justifyContent: 'center' }}
              >
                <span className="btn-enroll-text">Enroll Today</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
