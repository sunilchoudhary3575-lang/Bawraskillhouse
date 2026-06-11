import React from 'react';
import Icons from '../Icons';
import { useMedia } from '../../context/MediaContext';


export const CoursesHome = ({ navigateTo, triggerModal }) => {
  const { media } = useMedia();
  return (
    <section className="our-courses-home">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">OUR PROGRAMS</span>
          <h2 className="section-title">Our Courses</h2>
          <p className="section-desc">Choose your path and start your creative journey</p>
        </div>

        <div className="courses-home-grid">

          {/* Graphic Design */}
          <div className="course-card-home graphic-design-bg">
            <div className="card-header-inner">
              <div className="card-header-top">
                <div className="card-header-left">
                  <span className="card-number-badge">1</span>
                  <h3>Graphic Designing</h3>
                </div>
                <span className="card-price-badge">₹19,999</span>
              </div>
              <p className="outcome-tag">Adobe Suite Masterclass</p>
              <p className="course-duration-tag">30 Days Training</p>
            </div>
            
            <div className="card-body-inner">
              <div className="card-section-label">TOOLS COVERED</div>
              <div className="mini-software-row">
                <Icons.Photoshop />
                <Icons.Illustrator />
              </div>

              <div className="card-section-wrapper">
                <div className="card-section-left">
                  <p className="card-section-title">What You'll Learn</p>
                  <ul className="card-bullets">
                    <li>Social Media Design</li>
                    <li>Poster & Banner Design</li>
                    <li>Logo Design</li>
                    <li>Branding Design</li>
                    <li>Packaging Design</li>
                  </ul>
                </div>
                <div className="card-section-right">
                  <svg viewBox="0 0 100 100" className="card-section-svg svg-orange">
                    <path d="M20,80 Q50,20 80,80" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="5 5" />
                    <path d="M50,50 L35,35 L40,30 L55,45 Z" fill="currentColor" />
                    <rect x="17" y="77" width="6" height="6" fill="#fff" stroke="currentColor" strokeWidth="2.5" />
                    <rect x="77" y="77" width="6" height="6" fill="#fff" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="50" cy="50" r="5" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <div className="card-section-wrapper">
                <div className="card-section-left">
                  <p className="card-section-title">Career Opportunities</p>
                  <ul className="card-bullets">
                    <li>Graphic Designer</li>
                    <li>Social Media Designer</li>
                    <li>Branding Designer</li>
                    <li>Freelancer</li>
                  </ul>
                </div>
                <div className="card-section-right">
                  <svg viewBox="0 0 100 100" className="card-section-svg svg-orange">
                    <rect x="20" y="35" width="60" height="45" rx="5" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path d="M38,35 V25 A5,5 0 0,1 43,20 H57 A5,5 0 0,1 62,25 V35" fill="none" stroke="currentColor" strokeWidth="4" />
                    <circle cx="50" cy="57" r="5" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <div className="card-benefits-section">
                <p className="benefits-title">Benefits</p>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <span className="benefit-icon">🎓</span>
                    <span className="benefit-label">Practical Training</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🎥</span>
                    <span className="benefit-label">Live Projects</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">📜</span>
                    <span className="benefit-label">Certificate</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🤝</span>
                    <span className="benefit-label">Placement Support</span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => navigateTo('courses', 'graphic-design')} className="btn btn-secondary btn-full">View Details</button>
          </div>

          {/* Video Editing */}
          <div className="course-card-home video-editing-bg">
            <div className="card-header-inner">
              <div className="card-header-top">
                <div className="card-header-left">
                  <span className="card-number-badge">2</span>
                  <h3>Video Editing</h3>
                </div>
                <span className="card-price-badge">₹19,999</span>
              </div>
              <p className="outcome-tag">Cinematic Commercial Focus</p>
              <p className="course-duration-tag">30 Days Training</p>
            </div>
            
            <div className="card-body-inner">
              <div className="card-section-label">TOOLS COVERED</div>
              <div className="mini-software-row">
                <Icons.Premiere />
                <Icons.Davinci />
                <Icons.AfterEffects />
              </div>

              <div className="card-section-wrapper">
                <div className="card-section-left">
                  <p className="card-section-title">What You'll Learn</p>
                  <ul className="card-bullets">
                    <li>Reels Editing</li>
                    <li>YouTube Video Editing</li>
                    <li>Color Grading</li>
                    <li>Motion Graphics</li>
                    <li>Commercial Editing</li>
                  </ul>
                </div>
                <div className="card-section-right">
                  <svg viewBox="0 0 100 100" className="card-section-svg svg-blue">
                    <rect x="20" y="35" width="60" height="45" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path d="M20,35 L80,20 M20,27 L80,12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M28,23 L32,32 M44,20 L48,29 M60,17 L64,26" stroke="currentColor" strokeWidth="3" />
                    <polygon points="45,50 62,57 45,65" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <div className="card-section-wrapper">
                <div className="card-section-left">
                  <p className="card-section-title">Career Opportunities</p>
                  <ul className="card-bullets">
                    <li>Video Editor</li>
                    <li>Motion Graphic Designer</li>
                    <li>YouTube Editor</li>
                    <li>Freelancer</li>
                  </ul>
                </div>
                <div className="card-section-right">
                  <svg viewBox="0 0 100 100" className="card-section-svg svg-blue">
                    <rect x="15" y="25" width="70" height="48" rx="5" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path d="M35,73 H65 M50,73 V83 M40,83 H60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <polygon points="45,43 60,49 45,55" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <div className="card-benefits-section">
                <p className="benefits-title">Benefits</p>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <span className="benefit-icon">🎓</span>
                    <span className="benefit-label">Practical Training</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🎥</span>
                    <span className="benefit-label">Live Projects</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">📜</span>
                    <span className="benefit-label">Certificate</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🤝</span>
                    <span className="benefit-label">Placement Support</span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => navigateTo('courses', 'video-editing')} className="btn btn-secondary btn-full">View Details</button>
          </div>

          {/* Cinematography */}
          <div className="course-card-home cinematography-bg">
            <div className="card-header-inner">
              <div className="card-header-top">
                <div className="card-header-left">
                  <span className="card-number-badge">3</span>
                  <h3>Cinematography</h3>
                </div>
                <span className="card-price-badge">₹39,999</span>
              </div>
              <p className="outcome-tag">Camera | Gimbal | Drone | Lighting</p>
              <p className="course-duration-tag">45 Days Training</p>
            </div>
            
            <div className="card-body-inner">
              <div className="card-section-label">EQUIPMENT COVERED</div>
              <div className="equipment-covered-grid">
                <div className="equipment-item">
                  <div className="equipment-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="equipment-icon">
                      <path d="M4 5h3l1.5-2h7l1.5 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                  <span className="equipment-label">Camera</span>
                </div>
                <div className="equipment-item">
                  <div className="equipment-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="equipment-icon">
                      <rect x="11" y="14" width="2" height="9" rx="1" />
                      <circle cx="12" cy="13" r="1.5" />
                      <path d="M12 13c3 0 5-1.5 5-4.5V6h-1.5v2.5c0 2-1 3-3.5 3S8.5 10.5 8.5 8.5V6H7v2.5c0 3 2 4.5 5 4.5z" />
                      <rect x="9.5" y="7" width="5" height="1.5" rx="0.5" />
                      <path d="M8.5 4.5h1.2l.6-.8h3.4l.6.8h1.2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z" />
                      <circle cx="12" cy="6.8" r="1.2" fill="#0e1126" />
                    </svg>
                  </div>
                  <span className="equipment-label">Gimbal</span>
                </div>
                <div className="equipment-item">
                  <div className="equipment-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="equipment-icon">
                      <rect x="1.5" y="6" width="6" height="1" rx="0.5" />
                      <rect x="16.5" y="6" width="6" height="1" rx="0.5" />
                      <rect x="4" y="7" width="1" height="1.5" />
                      <rect x="19" y="7" width="1" height="1.5" />
                      <path d="M4.5 8h1.5l5 3h-1.5z M19.5 8h-1.5l-5 3h1.5z" />
                      <rect x="8.5" y="9.5" width="7" height="4.5" rx="2" />
                      <path d="M10 13.5l-2 4.5h1.5l1.5-4.5z M14 13.5l2 4.5h-1.5l-1.5-4.5z" />
                      <circle cx="12" cy="15.5" r="1.5" />
                      <rect x="11.5" y="14" width="1" height="1.5" />
                    </svg>
                  </div>
                  <span className="equipment-label">Drone</span>
                </div>
                <div className="equipment-item">
                  <div className="equipment-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="equipment-icon">
                      <rect x="11.25" y="9" width="1.5" height="11" rx="0.5" />
                      <path d="M12 19.5l-4 3.5h1.5l2.5-2.2 2.5 2.2h1.5z" />
                      <circle cx="12" cy="13" r="1" />
                      <rect x="10.5" y="7.5" width="3" height="1.5" rx="0.5" />
                      <path d="M13.5 4l4.5-1.5v7l-4.5-1.5z" />
                      <path d="M20 3.5h2M20.5 6h2.5M20 8.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="equipment-label">Lights</span>
                </div>
                <div className="equipment-item">
                  <div className="equipment-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="equipment-icon">
                      <rect x="9.5" y="2" width="5" height="9" rx="2.5" />
                      <rect x="10.5" y="3.5" width="3" height="0.8" fill="#0e1126" />
                      <rect x="10.5" y="5.2" width="3" height="0.8" fill="#0e1126" />
                      <path d="M7 6.5v2.5a5 5 0 0 0 10 0v-2.5h-1.5v2.5a3.5 3.5 0 0 1-7 0v-2.5z" />
                      <rect x="11.25" y="14" width="1.5" height="6" />
                      <ellipse cx="12" cy="20" rx="4" ry="1.5" />
                    </svg>
                  </div>
                  <span className="equipment-label">Mic</span>
                </div>
              </div>

              <div className="card-section-wrapper">
                <div className="card-section-left">
                  <p className="card-section-title">What You'll Learn</p>
                  <ul className="card-bullets">
                    <li>Camera Operation</li>
                    <li>Cinematic Shots</li>
                    <li>Drone Shooting</li>
                    <li>Lighting Setup</li>
                    <li>Audio Recording</li>
                  </ul>
                </div>
                <div className="card-section-right">
                  <img src={media.cinemaCameraImg} alt="Real Cinema Camera" className="card-section-real-img" />
                </div>
              </div>

              <div className="card-section-wrapper">
                <div className="card-section-left">
                  <p className="card-section-title">Career Opportunities</p>
                  <ul className="card-bullets">
                    <li>Cinematographer</li>
                    <li>Camera Operator</li>
                    <li>Drone Operator</li>
                    <li>Wedding Filmmaker</li>
                  </ul>
                </div>
                <div className="card-section-right">
                  <img src={media.droneImg} alt="Real Drone Logo" className="card-section-real-img" />
                </div>
              </div>

              <div className="card-benefits-section">
                <p className="benefits-title">Benefits</p>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <span className="benefit-icon">🛠️</span>
                    <span className="benefit-label">Hands-on Equip.</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🎬</span>
                    <span className="benefit-label">Real Shoots</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">📜</span>
                    <span className="benefit-label">Certificate</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🤝</span>
                    <span className="benefit-label">Placement Support</span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => navigateTo('courses', 'cinematography')} className="btn btn-secondary btn-full">View Details</button>
          </div>

          {/* Social Media Marketing */}
          <div className="course-card-home social-media-bg">
            <div className="card-header-inner">
              <div className="card-header-top">
                <div className="card-header-left">
                  <span className="card-number-badge">4</span>
                  <h3>Social Media Marketing</h3>
                </div>
                <span className="card-price-badge">₹34,999</span>
              </div>
              <p className="outcome-tag">Instagram | YouTube | Facebook | Strategy</p>
              <p className="course-duration-tag">45 Days Training</p>
            </div>
            
            <div className="card-body-inner">
              <div className="card-section-label">PLATFORMS COVERED</div>
              <div className="mini-software-row">
                <Icons.Instagram />
                <Icons.Youtube />
                <Icons.Facebook />
                <Icons.Google />
              </div>

              <div className="card-section-wrapper">
                <div className="card-section-left">
                  <p className="card-section-title">What You'll Learn</p>
                  <ul className="card-bullets">
                    <li>Content Strategy</li>
                    <li>Reels & Audience Growth</li>
                    <li>Personal Branding</li>
                    <li>Community Building</li>
                    <li>Analytics & Reporting</li>
                  </ul>
                </div>
                <div className="card-section-right">
                  <svg viewBox="0 0 100 100" className="card-section-svg svg-pink">
                    <path d="M15,85 H85 M20,80 L42,52 L62,60 L85,25" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <polygon points="85,25 74,25 82,36" fill="currentColor" />
                    <rect x="25" y="65" width="8" height="15" fill="currentColor" fillOpacity="0.15" />
                    <rect x="45" y="45" width="8" height="35" fill="currentColor" fillOpacity="0.15" />
                    <rect x="65" y="35" width="8" height="45" fill="currentColor" fillOpacity="0.15" />
                  </svg>
                </div>
              </div>

              <div className="card-section-wrapper">
                <div className="card-section-left">
                  <p className="card-section-title">Career Opportunities</p>
                  <ul className="card-bullets">
                    <li>Social Media Manager</li>
                    <li>Content Strategist</li>
                    <li>Digital Marketing Exec.</li>
                    <li>Freelancer</li>
                  </ul>
                </div>
                <div className="card-section-right">
                  <svg viewBox="0 0 100 100" className="card-section-svg svg-pink">
                    <path d="M20,40 H35 L60,20 V80 L35,60 H20 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M35,60 L45,80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M68,40 C75,45 75,55 68,60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M74,32 C85,42 85,58 74,68" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <div className="card-benefits-section">
                <p className="benefits-title">Benefits</p>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <span className="benefit-icon">🎓</span>
                    <span className="benefit-label">Practical Training</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🎥</span>
                    <span className="benefit-label">Live Projects</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">📜</span>
                    <span className="benefit-label">Certificate</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🤝</span>
                    <span className="benefit-label">Placement Support</span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => navigateTo('courses', 'social-media-marketing')} className="btn btn-secondary btn-full">View Details</button>
          </div>

          {/* Performance Marketing */}
          <div className="course-card-home performance-bg">
            <div className="card-header-inner">
              <div className="card-header-top">
                <div className="card-header-left">
                  <span className="card-number-badge">5</span>
                  <h3>Performance Marketing</h3>
                </div>
                <span className="card-price-badge">₹29,999</span>
              </div>
              <p className="outcome-tag">Meta Ads | Google Ads | Analytics</p>
              <p className="course-duration-tag">30 Days Training</p>
            </div>
            
            <div className="card-body-inner">
              <div className="card-section-label">PLATFORMS COVERED</div>
              <div className="mini-software-row ads-platform-row">
                <Icons.MetaAds />
                <div className="platform-vertical-divider"></div>
                <Icons.GoogleAds />
              </div>

              <div className="card-section-wrapper">
                <div className="card-section-left">
                  <p className="card-section-title">What You'll Learn</p>
                  <ul className="card-bullets">
                    <li>Ad Campaign Setup</li>
                    <li>Audience Targeting</li>
                    <li>Lead Generation</li>
                    <li>Conversion Tracking</li>
                    <li>Optimization & Scaling</li>
                  </ul>
                </div>
                <div className="card-section-right">
                  <svg viewBox="0 0 100 100" className="card-section-svg svg-green">
                    <path d="M15,85 H85 M25,75 L48,42 L68,52 L85,18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <polygon points="85,18 74,18 82,29" fill="currentColor" />
                    <circle cx="25" cy="75" r="4" fill="currentColor" />
                    <circle cx="48" cy="42" r="4" fill="currentColor" />
                    <circle cx="68" cy="52" r="4" fill="currentColor" />
                    <circle cx="85" cy="18" r="4" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <div className="card-section-wrapper">
                <div className="card-section-left">
                  <p className="card-section-title">Career Opportunities</p>
                  <ul className="card-bullets">
                    <li>Performance Marketer</li>
                    <li>Media Buyer</li>
                    <li>PPC Executive</li>
                    <li>Freelancer</li>
                  </ul>
                </div>
                <div className="card-section-right">
                  <svg viewBox="0 0 100 100" className="card-section-svg svg-green">
                    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="4" />
                    <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="4" />
                    <circle cx="50" cy="50" r="9" fill="currentColor" />
                    <path d="M80,20 L55,45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <polygon points="53,47 50,38 59,41" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <div className="card-benefits-section">
                <p className="benefits-title">Benefits</p>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <span className="benefit-icon">📈</span>
                    <span className="benefit-label">Live Campaigns</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">📜</span>
                    <span className="benefit-label">Certification</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🤝</span>
                    <span className="benefit-label">Placement Support</span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => navigateTo('courses', 'performance-marketing')} className="btn btn-secondary btn-full">View Details</button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoursesHome;
