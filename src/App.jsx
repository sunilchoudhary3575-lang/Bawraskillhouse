import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { useMedia } from './context/MediaContext';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import logoImg from './assets/logo.png';

// Layout & Common Components
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileStickyCTA from './components/MobileStickyCTA';

// Lazy Loaded Components for Optimization
const ConsultationModal = React.lazy(() => import('./components/ConsultationModal'));
const AboutHero = React.lazy(() => import('./components/about/AboutHero'));
const AboutStory = React.lazy(() => import('./components/about/AboutStory'));
const AboutMission = React.lazy(() => import('./components/about/AboutMission'));
const AboutFounder = React.lazy(() => import('./components/about/AboutFounder'));
const AboutMilestones = React.lazy(() => import('./components/about/AboutMilestones'));
const AboutWhy = React.lazy(() => import('./components/about/AboutWhy'));
const AboutClosing = React.lazy(() => import('./components/about/AboutClosing'));

const CoursesListings = React.lazy(() => import('./components/courses/CoursesListings'));
const ModulesBreakdown = React.lazy(() => import('./components/courses/ModulesBreakdown'));

const TestimonialContent = React.lazy(() => import('./components/testimonial/TestimonialContent'));

const CareerOpportunities = React.lazy(() => import('./components/career/CareerOpportunities'));

const ContactDetails = React.lazy(() => import('./components/contact/ContactDetails'));
const ContactForm = React.lazy(() => import('./components/contact/ContactForm'));

const AdminPage = React.lazy(() => import('./components/AdminPage'));

// Home Page Components (Statically loaded for instant render)
import Hero from './components/home/Hero';
import Welcome from './components/home/Welcome';
import CoursesHome from './components/home/CoursesHome';
import WhoCanJoin from './components/home/WhoCanJoin';
import WhyChoose from './components/home/WhyChoose';

// Floating Scroll Popup
import LeadPopup from './components/LeadPopup';

export default function App() {
  const { media } = useMedia();
  // Page Routing State: 'home', 'about', 'courses', 'portfolio', 'career', 'contact'
  const [currentPage, setCurrentPage] = useState('home');
  const [showPreloader, setShowPreloader] = useState(true);
  const [isPreloaderFading, setIsPreloaderFading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCourse, setModalCourse] = useState('General Consultation');
  const [portfolioFilter, setPortfolioFilter] = useState('all');
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  // Preloader timeout effect
  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = 'hidden';

    // Start fading out after 1800ms
    const fadeTimeout = setTimeout(() => {
      setIsPreloaderFading(true);
      // Unlock scroll as it starts fading out
      document.body.style.overflow = '';
    }, 1800);

    // Completely unmount/remove the preloader after 2300ms (allowing 500ms fade transition)
    const unmountTimeout = setTimeout(() => {
      setShowPreloader(false);
    }, 2300);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(unmountTimeout);
      // Reset body style just in case of unmounts
      document.body.style.overflow = '';
    };
  }, []);
  
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

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px', // triggers when elements are slightly inside the viewport
      threshold: 0.02
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [currentPage]);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!consultationForm.name || !consultationForm.phone) {
      alert('Please fill out your Name and Phone Number.');
      return;
    }
    setFormSubmitted(true);

    const isEnquiry = currentPage === 'contact' || consultationForm.course === 'Enquiry' || modalCourse === 'Brochure Request';
    const targetCollection = isEnquiry ? 'enquiries' : 'enrollments';

    try {
      await addDoc(collection(db, targetCollection), {
        name: consultationForm.name,
        phone: consultationForm.phone,
        email: consultationForm.email || '',
        course: consultationForm.course || 'General Consultation',
        message: consultationForm.message || '',
        submittedAt: new Date().toISOString(),
        source: currentPage === 'contact' ? 'contact_page' : 'consultation_modal'
      });

      // Send to Google Sheets if URL is configured in environment variables
      const googleSheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;
      if (googleSheetUrl) {
        try {
          if (isEnquiry) {
            await fetch(googleSheetUrl, {
              method: "POST",
              headers: {
                "Content-Type": "text/plain;charset=utf-8",
              },
              body: JSON.stringify({
                action: "enquiry",
                name: consultationForm.name,
                phone: consultationForm.phone,
                email: consultationForm.email || "",
                message: consultationForm.message || "",
                source: "Hero Form",
              }),
            });
          } else {
            await fetch(googleSheetUrl, {
              method: "POST",
              headers: {
                "Content-Type": "text/plain;charset=utf-8",
              },
              body: JSON.stringify({
                action: "enrollment",
                name: consultationForm.name,
                phone: consultationForm.phone,
                email: consultationForm.email || "",
                course: consultationForm.course || "General Consultation",
                message: consultationForm.message || "",
                source: "Course Page",
              }),
            });
          }
        } catch (sheetErr) {
          console.error('Google Sheets submission error:', sheetErr);
        }
      }

      setFormSubmitted(false);
      setIsModalOpen(false);
      setConsultationForm({ name: '', phone: '', email: '', course: 'General Consultation', message: '' });
      alert('Your request has been received. Our counselor will reach out to you within 2 hours!');
    } catch (err) {
      console.error(`Failed to save to Firestore ${targetCollection}:`, err);
      setFormSubmitted(false);
      alert(`Submission failed: ${err.message}. Please try again.`);
    }
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
      {showPreloader && (
        <div className={`bawra-preloader ${isPreloaderFading ? 'fade-out' : ''}`}>
          <div className="preloader-content">
            <div className="preloader-logo-wrapper">
              <img src={logoImg} alt="Bawra Skill House Logo" className="preloader-logo" />
              <div className="preloader-glow"></div>
            </div>
            <div className="preloader-progress-bar">
              <div className="preloader-progress-fill"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Dynamic Glassmorphism Header */}
      <Header 
        showHeader={showHeader}
        currentPage={currentPage}
        navigateTo={navigateTo}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        triggerModal={triggerModal}
      />

      {/* Dynamic Pages Render with Suspense for Performance Optimization */}
      <React.Suspense fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="preloader-progress-bar" style={{ width: '100px', height: '4px' }}>
            <div className="preloader-progress-fill" style={{ animationDuration: '0.8s', width: '100%' }}></div>
          </div>
        </div>
      }>
        {/* ==================== PAGE 1: HOME ==================== */}
        {currentPage === 'home' && (
          <main className="page-fade-in">
            <Hero triggerModal={triggerModal} showPreloader={showPreloader} />
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
      </React.Suspense>

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
      <React.Suspense fallback={null}>
        <ConsultationModal 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalCourse={modalCourse}
          consultationForm={consultationForm}
          setConsultationForm={setConsultationForm}
          formSubmitted={formSubmitted}
          handleFormSubmit={handleFormSubmit}
        />
      </React.Suspense>

      {/* Floating Scroll-triggered Lead Ad Popup */}
      <LeadPopup />

    </div>
  );
}
