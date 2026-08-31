import React, { useState } from 'react';
import Logo from './Logo';

export const Footer = ({ navigateTo }) => {
  const [showSeoDirectory, setShowSeoDirectory] = useState(false);

  const seoKeywordCategories = [
    {
      category: "Digital Marketing & Strategy",
      keywords: [
        "Digital Marketing Agency", "Digital Marketing Services", "Performance Marketing", "Digital Marketing Strategy",
        "Digital Advertising Agency", "Digital Marketing Business", "Growth Marketing Agency", "Inbound Marketing Agency",
        "Digital Marketing Consultation", "Digital Branding Services", "Full Stack Marketing Agency", "Digital Media Agency",
        "ROI Driven Digital Marketing", "Digital Marketing Plan", "Online Marketing Agency", "Digital Marketing Leads"
      ]
    },
    {
      category: "Social Media Marketing & Ads",
      keywords: [
        "Social Media Marketing", "Social Media Agency", "Social Media Advertising Services", "Social Media Campaign",
        "Social Media Branding", "Social Media Ad Agency", "Social Media Content Strategy", "Paid Social Media Marketing",
        "Social Media Lead Generation", "Social Media Growth Marketing", "Social Media Agency Services", "Social Media Marketing Strategy"
      ]
    },
    {
      category: "Performance Marketing & Lead Generation",
      keywords: [
        "Performance Marketing Agency", "Lead Generation Agency", "Performance Advertising", "Paid Media Marketing Agency",
        "Inbound Lead Generation", "Demand Generation Agency", "Performance Branding Agency", "Conversion Digital Marketing",
        "Lead Generation Digital Marketing", "Performance Media Agency", "B2B Lead Generation"
      ]
    },
    {
      category: "Branding, Content & Advertising",
      keywords: [
        "Branding and Marketing Agency", "Brand Strategy Agency", "Content Marketing Agency", "Content Creation Digital Marketing",
        "Brand Performance Marketing", "Creative Digital Marketing Agency", "Digital Ad Strategy", "Brand Advertising Agency",
        "Digital Content Strategy", "Digital Brand Management", "Multimedia Marketing Agency"
      ]
    },
    {
      category: "Local & Regional SEO (Jodhpur, Rajasthan, India)",
      keywords: [
        "Digital Marketing Agency in Jodhpur", "Social Media Marketing Jodhpur", "Digital Marketing Agency India",
        "Performance Marketing Agency in India", "Branding Agency India", "Digital Marketing Rajasthan",
        "Advertising Agency in Jodhpur", "Digital Marketing Agency Near Me", "Local Business Social Media Marketing"
      ]
    }
  ];

  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#" className="footer-logo-link" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
            <Logo />
          </a>
          <p className="footer-tagline">
            Premier Digital Marketing & Skill Academy in Jodhpur, Rajasthan. Helping businesses scale with ROI-driven digital marketing, performance ads, social media strategies, and industry-focused professional training.
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
              Jodhpur, Rajasthan, India
            </a>
          </p>
        </div>
      </div>

      {/* SEO Keywords Directory Section */}
      <div className="container footer-seo-container">
        <div className="seo-toggle-header" onClick={() => setShowSeoDirectory(!showSeoDirectory)}>
          <h3>Popular Digital Marketing, Social Media & SEO Topics</h3>
          <button className="seo-toggle-btn" aria-label="Toggle SEO Directory">
            {showSeoDirectory ? '▲ Hide Topics' : '▼ Explore All Topics'}
          </button>
        </div>

        <div className={`seo-directory-content ${showSeoDirectory ? 'open' : ''}`}>
          <p className="seo-directory-intro">
            Explore top search topics and digital marketing solutions offered by Bawra Skill House & Bawra Digitals across Jodhpur, Rajasthan, and India.
          </p>
          <div className="seo-categories-grid">
            {seoKeywordCategories.map((cat, idx) => (
              <div key={idx} className="seo-category-card">
                <h4>{cat.category}</h4>
                <div className="seo-tags-wrap">
                  {cat.keywords.map((kw, i) => (
                    <span key={i} className="seo-tag">{kw}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Bawra Skill House. All rights reserved. Top Digital Marketing & Creative Academy in Jodhpur.</p>
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
