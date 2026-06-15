import React from 'react';
import Icons from '../Icons';

export const ContactDetails = ({ navigateTo, children }) => {
  return (
    <>
      <section className="breadcrumb-banner">
        <div className="container text-center">
          <h1>Contact Us</h1>
        </div>
      </section>

      <section className="contact-details-section">
        <div className="container welcome-grid">

          {/* Left Column Contact Details */}
          <div className="welcome-text">
            <span className="section-subtitle">GET IN TOUCH</span>
            <h2>Get In Touch</h2>
            <p>Have questions? We are here to help. Reach out to us to start your creative learning journey!</p>

            <div className="contact-details-list">
              <div className="contact-item-detail glass">
                <span className="contact-detail-icon">📞</span>
                <div>
                  <p className="contact-lbl">Phone Numbers</p>
                  <p className="contact-val">
                    <a href="tel:+917340053442" style={{ color: 'inherit', textDecoration: 'none' }}>+91 73400 53442</a>
                  </p>
                  <p className="contact-val">
                    <a href="tel:+916377790409" style={{ color: 'inherit', textDecoration: 'none' }}>+91 63777 90409</a>
                  </p>
                </div>
              </div>

              <a href="mailto:contact@bawraskillhouse.com" className="contact-item-detail glass social-link-card">
                <span className="contact-detail-icon">✉️</span>
                <div>
                  <p className="contact-lbl">Email Address</p>
                  <p className="contact-val">contact@bawraskillhouse.com</p>
                </div>
              </a>

              <a href="https://www.bawradigital.com" target="_blank" rel="noopener noreferrer" className="contact-item-detail glass social-link-card">
                <span className="contact-detail-icon">🌐</span>
                <div>
                  <p className="contact-lbl">Official Website</p>
                  <p className="contact-val">www.bawradigital.com</p>
                </div>
              </a>

              <div className="contact-item-detail glass">
                <span className="contact-detail-icon">📄</span>
                <div>
                  <p className="contact-lbl">GSTIN</p>
                  <p className="contact-val">08AAMCB1287D1ZO</p>
                </div>
              </div>

              <a 
                href="https://www.google.com/maps/place/Bawra+Digitals+Pvt.+Ltd./@26.2798087,72.9976924,17z/data=!3m1!4b1!4m6!3m5!1s0xf13e4866b3a4841:0xca51de0c41730bad!8m2!3d26.2798039!4d73.0002673!16s%2Fg%2F11trq_7fr4?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-item-detail glass social-link-card"
              >
                <span className="contact-detail-icon">📍</span>
                <div>
                  <p className="contact-lbl">Location Address</p>
                  <p className="contact-val">Jodhpur, Rajasthan</p>
                </div>
              </a>

              <a href="https://www.instagram.com/p/DZIskdwk3ao/" target="_blank" rel="noopener noreferrer" className="contact-item-detail glass social-link-card">
                <span className="contact-detail-icon instagram-color"><Icons.Instagram /></span>
                <div>
                  <p className="contact-lbl">Instagram</p>
                  <p className="contact-val">@bawraskillhouse</p>
                </div>
              </a>

              <a href="https://youtube.com/@bawraskillhouse" target="_blank" rel="noopener noreferrer" className="contact-item-detail glass social-link-card">
                <span className="contact-detail-icon youtube-color"><Icons.Youtube /></span>
                <div>
                  <p className="contact-lbl">YouTube Channel</p>
                  <p className="contact-val">Bawra Skill House</p>
                </div>
              </a>
            </div>

            {/* Google Maps Mockup */}
            <a 
              href="https://www.google.com/maps/place/Bawra+Digitals+Pvt.+Ltd./@26.2798087,72.9976924,17z/data=!3m1!4b1!4m6!3m5!1s0xf13e4866b3a4841:0xca51de0c41730bad!8m2!3d26.2798039!4d73.0002673!16s%2Fg%2F11trq_7fr4?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="google-map-mockup glass text-center"
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <span className="map-icon">🗺️</span>
              <h4>Interactive Jodhpur Studio Map Location</h4>
              <p>Bawra Skill House Creative Sector, Jodhpur, Rajasthan</p>
            </a>
          </div>

          {children}

        </div>
      </section>
    </>
  );
};

export default ContactDetails;
