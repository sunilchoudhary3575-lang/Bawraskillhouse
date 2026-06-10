import React, { useState, useEffect } from 'react';

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
    const handleScroll = () => {
      if (isDismissed || formSubmitted) return;

      if (window.scrollY > 200) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed, formSubmitted]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill out your Name and Phone Number.');
      return;
    }

    setFormSubmitted(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsVisible(false);
      setIsDismissed(true);
      alert(`Thank you, ${formData.name}! Your enrollment request has been received. Our counselor will contact you in 2 hours.`);
      setFormData({ name: '', phone: '', email: '', description: '' });
      setFormSubmitted(false);
    }, 1200);
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
