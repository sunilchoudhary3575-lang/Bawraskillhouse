import React from 'react';

export const ContactForm = ({
  consultationForm,
  setConsultationForm,
  formSubmitted,
  handleFormSubmit
}) => {
  return (
    <div className="contact-form-card glass">
      <h3>Send Us A Message</h3>
      <p>Fill out the form below and our counselor will coordinate a call.</p>
      
      <form onSubmit={handleFormSubmit} className="contact-main-form">
        <div className="form-group">
          <label htmlFor="contact-name">Your Name</label>
          <input 
            type="text" 
            id="contact-name" 
            required 
            placeholder="e.g. Vikram Singh" 
            value={consultationForm.name}
            onChange={(e) => setConsultationForm({...consultationForm, name: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-email">Your Email</label>
          <input 
            type="email" 
            id="contact-email" 
            placeholder="e.g. vikram@gmail.com" 
            value={consultationForm.email}
            onChange={(e) => setConsultationForm({...consultationForm, email: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-phone">Phone Number</label>
          <input 
            type="tel" 
            id="contact-phone" 
            required 
            placeholder="e.g. +91 73400 53442" 
            value={consultationForm.phone}
            onChange={(e) => setConsultationForm({...consultationForm, phone: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-course">Select Course</label>
          <select 
            id="contact-course" 
            value={consultationForm.course}
            onChange={(e) => setConsultationForm({...consultationForm, course: e.target.value})}
          >
            <option value="General Consultation">General Consultation</option>
            <option value="Graphic Design Program">Graphic Design Course</option>
            <option value="Video Editing Program">Video Editing Course</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contact-msg">Your Message</label>
          <textarea 
            id="contact-msg" 
            rows="4" 
            placeholder="Ask us anything..."
            value={consultationForm.message}
            onChange={(e) => setConsultationForm({...consultationForm, message: e.target.value})}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-gold btn-full">
          {formSubmitted ? 'Sending message...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
