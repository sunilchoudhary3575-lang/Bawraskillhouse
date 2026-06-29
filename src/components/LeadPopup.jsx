import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const LeadPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: ''
  });

  useEffect(() => {
    if (isDismissed || formSubmitted) return;

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(prev => prev ? prev : true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed, formSubmitted]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill out your Name and Phone Number.');
      return;
    }

    setFormSubmitted(true);
    try {
      await addDoc(collection(db, 'enrollments'), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || '',
        description: formData.description || '',
        course: 'General Consultation',
        submittedAt: new Date().toISOString(),
        source: 'lead_popup'
      });

      // Send to Google Sheets if URL is configured in environment variables
      const googleSheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;
      if (googleSheetUrl) {
        try {
          await fetch(googleSheetUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
              action: "enquiry",
              name: formData.name,
              phone: formData.phone,
              email: formData.email || "",
              message: formData.description || "",
              source: "Lead Popup",
            }),
          });
        } catch (sheetErr) {
          console.error('Google Sheets submission error (popup):', sheetErr);
        }
      }

      setIsVisible(false);
      setIsDismissed(true);
      alert(`Thank you, ${formData.name}! Your enrollment request has been received. Our counselor will contact you in 2 hours.`);
      setFormData({ name: '', phone: '', email: '', description: '' });
      setFormSubmitted(false);
    } catch (err) {
      console.error('Failed to save popup lead to Firestore:', err);
      setFormSubmitted(false);
      alert(`Submission failed: ${err.message}. Please try again.`);
    }
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="popup-overlay" onClick={handleDismiss}>
      <div className="lead-ad-popup glass-dark" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={handleDismiss} aria-label="Close popup">×</button>
        
        <div className="popup-header">
          <span className="popup-badge">🔥 ENROLL NOW</span>
          <h3>Bawra Skill House</h3>
          <p>Book your trial seat & shape your creative career today!</p>
        </div>

        <form onSubmit={handleSubmit} className="popup-form">
          <div className="popup-form-group">
            <input
              type="text"
              required
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="popup-input"
            />
          </div>

          <div className="popup-form-group">
            <input
              type="tel"
              required
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="popup-input"
            />
          </div>

          <div className="popup-form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="popup-input"
            />
          </div>

          <div className="popup-form-group">
            <textarea
              placeholder="Description / Queries..."
              rows="2"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="popup-textarea"
            ></textarea>
          </div>

          <button type="submit" className="popup-submit-btn">
            {formSubmitted ? 'Submitting...' : 'Submit Request ✨'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadPopup;
