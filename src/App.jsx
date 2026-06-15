import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useMedia } from './context/MediaContext';

// Layout & Common Components
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileStickyCTA from './components/MobileStickyCTA';
import ConsultationModal from './components/ConsultationModal';

// Home Page Components
import Hero from './components/home/Hero';
import Welcome from './components/home/Welcome';
import CoursesHome from './components/home/CoursesHome';
import WhoCanJoin from './components/home/WhoCanJoin';
import WhyChoose from './components/home/WhyChoose';

// About Us Page Components
import AboutHero from './components/about/AboutHero';
import AboutStory from './components/about/AboutStory';
import AboutMission from './components/about/AboutMission';
import AboutFounder from './components/about/AboutFounder';
import AboutMilestones from './components/about/AboutMilestones';
import AboutWhy from './components/about/AboutWhy';
import AboutClosing from './components/about/AboutClosing';

// Courses Page Components
import CoursesListings from './components/courses/CoursesListings';
import ModulesBreakdown from './components/courses/ModulesBreakdown';

// Testimonial Page Components
import TestimonialContent from './components/testimonial/TestimonialContent';

// Career Page Components
import CareerOpportunities from './components/career/CareerOpportunities';

// Contact Page Components
import ContactDetails from './components/contact/ContactDetails';
import ContactForm from './components/contact/ContactForm';

// Floating Scroll Popup
import LeadPopup from './components/LeadPopup';

// Admin Page Component
import AdminPage from './components/AdminPage';

export default function App() {
  const { media } = useMedia();
  // Page Routing State: 'home', 'about', 'courses', 'portfolio', 'career', 'contact'
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState('General Consultation');
  const [portfolioFilter, setPortfolioFilter] = useState('all');
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  
  // Form submission states
  const [consultationForm, setConsultationForm] = useState({ name: '', phone: '', email: '', course: 'General Consultation', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const scrollTargetRef = useRef(null);

  // Handle mobile/browser back button history tracking
  useEffect(() => {
    if (!window.history.state || !window.history.state.page) {
      window.history.replaceState({ page: 'home' }, '', '');
    } else {
      setCurrentPage(window.history.state.page);
    }

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Auto-scroll when page changes
  useEffect(() => {
    const target = scrollTargetRef.current;
    if (target) {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const timer = setTimeout(() => {
          const el = document.getElementById(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
      scrollTargetRef.current = null; // reset
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  // Monitor scroll height to show Mobile Sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 400;
      setShowStickyCTA(prev => {
        if (prev === shouldShow) return prev;
        return shouldShow;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor scroll direction to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If mobile menu is open, keep the header visible so user doesn't lose close toggle
      if (isMobileMenuOpen) {
        setShowHeader(prev => prev ? prev : true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide header if scrolling down and scrolled more than 100px
      const shouldHide = currentScrollY > lastScrollY.current && currentScrollY > 100;
      setShowHeader(prev => {
        const nextShow = !shouldHide;
        if (prev === nextShow) return prev;
        return nextShow;
      });
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // Lock background scroll when mobile menu or modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isModalOpen]);

  const triggerModal = (courseName) => {
    setModalCourse(courseName);
    setConsultationForm(prev => ({ ...prev, course: courseName }));
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!consultationForm.name || !consultationForm.phone) {
      alert('Please fill out your Name and Phone Number.');
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
      setConsultationForm({ name: '', phone: '', email: '', course: 'General Consultation', message: '' });
      alert('Your request has been received. Our counselor will reach out to you within 2 hours!');
    }, 1500);
  };

  // Switch page handler
  const navigateTo = (pageId, anchorId = null) => {
    scrollTargetRef.current = anchorId;
    
    if (pageId !== currentPage) {
      window.history.pushState({ page: pageId }, '', '');
    }
    
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);

    // If we are navigating to the same page, we can scroll immediately
    if (currentPage === pageId && anchorId) {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        scrollTargetRef.current = null; // reset
      }
    }
  };

  // Data mapping for sections
  const portfolioItems = [
    { title: 'Premium Craft Gin Identity', category: 'branding', type: 'Branding', image: media.portfolio_1 },
    { title: 'Nike Phantom Cinematic Campaign', category: 'video', type: 'Video Editing', image: media.portfolio_2 },
    { title: 'Liquid Fluid Motion Graphics Loop', category: 'motion', type: 'Motion Graphics', image: media.portfolio_3 },
    { title: 'Zephyr Organics Cosmetics Box', category: 'branding', type: 'Packaging Design', image: media.portfolio_4 },
    { title: 'Minimalist Sneaker Social Assets', category: 'branding', type: 'Social Campaign', image: media.portfolio_5 },
    { title: 'SaaS App Animated Interface Mockup', category: 'motion', type: 'Motion Graphic', image: media.portfolio_6 }
  ];

  const filteredPortfolio = portfolioFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === portfolioFilter || (portfolioFilter === 'branding' && item.category === 'branding'));

  return (
    <div className="bawra-academy">
      
      {/* Dynamic Glassmorphism Header */}
      <Header 
        showHeader={showHeader}
        currentPage={currentPage}
        navigateTo={navigateTo}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        triggerModal={triggerModal}
      />

      {/* Dynamic Pages Render */}
      
      {/* ==================== PAGE 1: HOME ==================== */}
      {currentPage === 'home' && (
        <main className="page-fade-in">
          <Hero triggerModal={triggerModal} />
          <Welcome navigateTo={navigateTo} />
          <CoursesHome navigateTo={navigateTo} triggerModal={triggerModal} />
          <WhoCanJoin />
          <WhyChoose />
        </main>
      )}

      {/* ==================== PAGE 2: ABOUT US ==================== */}
      {currentPage === 'about' && (
        <main className="page-fade-in">
          <AboutHero navigateTo={navigateTo} />
          <AboutStory />
          <AboutMission />
          <AboutFounder />
          <AboutMilestones />
          <AboutWhy />
          <AboutClosing triggerModal={triggerModal} navigateTo={navigateTo} />
        </main>
      )}

      {/* ==================== PAGE 3: COURSES ==================== */}
      {currentPage === 'courses' && (
        <main className="page-fade-in">
          <CoursesListings triggerModal={triggerModal} navigateTo={navigateTo} />
          <ModulesBreakdown triggerModal={triggerModal} />
        </main>
      )}

      {/* ==================== PAGE 4: TESTIMONIAL ==================== */}
      {currentPage === 'portfolio' && (
        <main className="page-fade-in">
          <TestimonialContent 
            portfolioFilter={portfolioFilter}
            setPortfolioFilter={setPortfolioFilter}
            filteredPortfolio={filteredPortfolio}
            triggerModal={triggerModal}
            navigateTo={navigateTo}
          />
        </main>
      )}

      {/* ==================== PAGE 5: CAREER ==================== */}
      {currentPage === 'career' && (
        <main className="page-fade-in">
          <CareerOpportunities navigateTo={navigateTo} />
        </main>
      )}

      {/* ==================== PAGE 6: CONTACT US ==================== */}
      {currentPage === 'contact' && (
        <main className="page-fade-in">
          <ContactDetails navigateTo={navigateTo}>
            <ContactForm 
              consultationForm={consultationForm}
              setConsultationForm={setConsultationForm}
              formSubmitted={formSubmitted}
              handleFormSubmit={handleFormSubmit}
            />
          </ContactDetails>
        </main>
      )}

      {/* ==================== PAGE 7: ADMIN PORTAL ==================== */}
      {currentPage === 'admin' && (
        <main className="page-fade-in" style={{ paddingTop: '80px' }}>
          <AdminPage />
        </main>
      )}

      {/* ==================== COMMON FOOTER ==================== */}
      <Footer navigateTo={navigateTo} />

      {/* Mobile Sticky bottom CTA bar */}
      <MobileStickyCTA 
        showStickyCTA={showStickyCTA}
        triggerModal={triggerModal}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Booking Consultation Modal */}
      <ConsultationModal 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalCourse={modalCourse}
        consultationForm={consultationForm}
        setConsultationForm={setConsultationForm}
        formSubmitted={formSubmitted}
        handleFormSubmit={handleFormSubmit}
      />

      {/* Floating Scroll-triggered Lead Ad Popup */}
      <LeadPopup />

    </div>
  );
}
