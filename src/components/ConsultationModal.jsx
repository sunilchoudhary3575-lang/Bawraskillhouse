import React, { useState } from 'react';
import Icons from './Icons';
import { useMedia } from '../context/MediaContext';

export const ConsultationModal = ({
  isModalOpen,
  setIsModalOpen,
  modalCourse,
  consultationForm,
  setConsultationForm,
  formSubmitted,
  handleFormSubmit
}) => {
  const { media } = useMedia();
  const [showCourseSelection, setShowCourseSelection] = useState(false);

  if (!isModalOpen) return null;

  const videoMap = {
    'Video Story: Arjun Sharma': media.video_arjun,
    'Video Story: Priya Rathore': media.video_priya,
    'Video Story: Vikram Panwar': media.video_vikram,
    'Video Story: Mohit Gehlot': media.video_mohit,
    'Video Story: Karan Bhati': media.video_karan,
    'Video Story: Anjali Sharma': media.video_anjali,
  };


  const isVideoStory = modalCourse && modalCourse.startsWith('Video Story:');
  const videoSrc = isVideoStory ? (videoMap[modalCourse] || '') : null;
  const isYouTube = videoSrc && (videoSrc.includes('youtube') || videoSrc.includes('youtu.be') || videoSrc.includes('embed'));

  const selectedCourse = consultationForm.course || modalCourse || 'General Consultation';
  const isInquiryMode = selectedCourse === 'Inquiry';

  return (
    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
      {isVideoStory ? (
        <div className="modal-content glass-dark" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '320px', width: '90%', padding: '0', background: '#000', borderRadius: '16px', border: '1px solid var(--border-gold)', overflow: 'hidden' }}>
          <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close dialog" style={{ color: '#fff', right: '15px', top: '15px', fontSize: '2rem', zIndex: 10 }}>×</button>
          <div style={{ position: 'relative', width: '100%', paddingTop: '177.78%' }}>
            {isYouTube ? (
              <iframe
                src={videoSrc}
                title={modalCourse}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></iframe>
            ) : (
              <video
                key={videoSrc}
                src={videoSrc}
                controls
                autoPlay
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#000' }}
              ></video>
            )}
          </div>
        </div>
      ) : (
        <div className="modal-content premium-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close dialog">×</button>
          
          <div className="premium-modal-header">
            <span className="premium-badge">
              <span className="premium-badge-dot"></span>
              {isInquiryMode ? 'Quick Inquiry' : 'Bawra Career Hub'}
            </span>
            <h3>{isInquiryMode ? 'Submit Your Inquiry' : 'Book Your Free Career Call'}</h3>
            <p>{isInquiryMode ? 'Enter your details below and we will contact you shortly.' : 'Agla success story tumhara ho sakta hai. Start today!'}</p>
          </div>

          {modalCourse === 'Brochure Request' && (
            <div className="brochure-download-modal-options mb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.5rem', width: '100%', textAlign: 'left' }}>
              <p style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '1rem', fontWeight: 600, textAlign: 'center' }}>Download Brochure PDFs Directly:</p>
              <div className="modal-download-buttons">
                <a href="/Graphic_Designing_Brochure.pdf" download className="btn btn-primary text-center" style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  🎨 Graphic Design (PDF)
                </a>
                <a href="/Video_Editing_Brochure.pdf" download className="btn btn-primary text-center" style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  🎬 Video Editing (PDF)
                </a>
              </div>
              <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '1.25rem', textAlign: 'center', fontWeight: 700 }}>— OR BOOK A CAREER COUNSELING SESSION —</p>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="modal-form">
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="modal-name">Full Name *</label>
                <div className="input-with-icon">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="modal-name"
                    required
                    placeholder="e.g. Vikram Singh"
                    value={consultationForm.name}
                    onChange={(e) => setConsultationForm({ ...consultationForm, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modal-email">Email Address</label>
                <div className="input-with-icon">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    id="modal-email"
                    placeholder="e.g. vikram@gmail.com"
                    value={consultationForm.email}
                    onChange={(e) => setConsultationForm({ ...consultationForm, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="modal-phone">Phone Number *</label>
              <div className="input-with-icon">
                <span className="input-icon">📞</span>
                <input
                  type="tel"
                  id="modal-phone"
                  required
                  placeholder="e.g. +91 73400 53442"
                  value={consultationForm.phone}
                  onChange={(e) => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                />
              </div>
            </div>

            {!isInquiryMode && (
              <div className="form-group">
                <span className="program-selection-label">Program of Interest</span>
                
                {/* Collapsed Trigger showing current selection */}
                {(() => {
                  const programs = [
                    { id: 'Graphic Designing Course', aliases: ['Graphic Design Program', 'Graphic Designing Course'], name: 'Graphic Design', desc: '🎨 Design & Branding', activeColor: '#ff9a00', activeBg: 'rgba(255, 154, 0, 0.12)', activeBorder: 'rgba(255, 154, 0, 0.8)' },
                    { id: 'Video Editing Course', aliases: ['Video Editing Program', 'Video Editing Course'], name: 'Video Editing', desc: '🎬 Storytelling & VFX', activeColor: '#d11a5b', activeBg: 'rgba(209, 26, 91, 0.12)', activeBorder: 'rgba(209, 26, 91, 0.8)' },
                    { id: 'Social Media Marketing', aliases: ['Social Media Marketing'], name: 'Social Marketing', desc: '📱 Instagram & YouTube', activeColor: '#ff4b2b', activeBg: 'rgba(255, 75, 43, 0.12)', activeBorder: 'rgba(255, 75, 43, 0.8)' },
                    { id: 'Performance Marketing', aliases: ['Performance Marketing'], name: 'Performance Ads', desc: '📈 Meta & Google Ads', activeColor: '#4caf50', activeBg: 'rgba(76, 175, 80, 0.12)', activeBorder: 'rgba(76, 175, 80, 0.8)' },
                    { id: 'Cinematography Course', aliases: ['Cinematography Course', 'Cinematography & Shooting'], name: 'Cinematography', desc: '🎥 Camera, Gimbal & Drone', activeColor: '#e91e63', activeBg: 'rgba(233, 30, 99, 0.12)', activeBorder: 'rgba(233, 30, 99, 0.8)' }
                  ];

                  const selectedCourse = consultationForm.course || modalCourse || 'General Consultation';
                  const currentProgramObj = programs.find(p => p.id === selectedCourse || (p.aliases && p.aliases.includes(selectedCourse)));

                  return (
                    <>
                      <div 
                        className={`selected-program-trigger ${showCourseSelection ? 'open' : ''}`}
                        onClick={() => setShowCourseSelection(!showCourseSelection)}
                      >
                        <div className="trigger-left">
                          <span className="trigger-name" style={{ color: 'var(--gold-primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select Program</span>
                          <span className="trigger-desc" style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '800', marginTop: '0.2rem' }}>
                            {currentProgramObj ? `${currentProgramObj.name} (${currentProgramObj.desc})` : 'Choose from 5 available courses...'}
                          </span>
                        </div>
                        <div className="trigger-arrow">
                          ▼
                        </div>
                      </div>

                      {showCourseSelection && (
                        <div className="program-selection-grid-wrapper">
                          <div className="program-selection-grid">
                            {programs.map((prog) => {
                              const isActive = currentProgramObj && currentProgramObj.id === prog.id;
                              return (
                                <div
                                  key={prog.id}
                                  className={`program-card ${isActive ? 'active' : ''}`}
                                  onClick={() => {
                                    setConsultationForm({ ...consultationForm, course: prog.id });
                                    setShowCourseSelection(false);
                                  }}
                                  style={isActive ? {
                                    '--card-bg-active': prog.activeBg,
                                    '--card-border-active': prog.activeBorder,
                                    '--card-text-active': prog.activeColor,
                                    '--card-shadow-active': prog.activeBg,
                                  } : {}}
                                >
                                  <span className="program-card-name">{prog.name}</span>
                                  <span className="program-card-desc">{prog.desc}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}



            <div className="form-group">
              <label htmlFor="modal-message">Description / Message</label>
              <div className="input-with-icon">
                <span className="input-icon">📝</span>
                <textarea
                  id="modal-message"
                  placeholder="Tell us about your requirements or queries..."
                  rows="3"
                  value={consultationForm.message || ''}
                  onChange={(e) => setConsultationForm({ ...consultationForm, message: e.target.value })}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    color: '#fff',
                    padding: '0.95rem 1.25rem 0.95rem 2.85rem',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.3s ease',
                    resize: 'none',
                    width: '100%'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--gold-primary)';
                    e.target.style.boxShadow = '0 0 15px rgba(255, 154, 0, 0.15)';
                    if (e.target.previousSibling) {
                      e.target.previousSibling.style.color = 'var(--gold-primary)';
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.boxShadow = 'none';
                    if (e.target.previousSibling) {
                      e.target.previousSibling.style.color = 'rgba(255, 255, 255, 0.4)';
                    }
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn-premium-submit">
              {formSubmitted ? 'Submitting Request...' : 'Submit Request ✨'}
            </button>
          </form>

          {!isInquiryMode && (
            <>
              <div className="modal-or-divider" style={{ textAlign: 'center', margin: '1.25rem 0 0.75rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.05em' }}>— OR CHAT ON WHATSAPP —</div>

              <a
                href={`https://wa.me/917340053442?text=Hi%20Bawra%20Skill%20House,%20I'm%20interested%20in%20booking%20a%20consultation%20for%20${encodeURIComponent(consultationForm.course || modalCourse || 'General Consultation')}!`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-full"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.9rem' }}
              >
                <Icons.WhatsApp /> Book via WhatsApp
              </a>
            </>
          )}

          <div className="modal-footer-note" style={{ marginTop: '1.25rem', opacity: 0.8 }}>
            <Icons.Calendar /> Guaranteed callback within 2 hours.
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationModal;
