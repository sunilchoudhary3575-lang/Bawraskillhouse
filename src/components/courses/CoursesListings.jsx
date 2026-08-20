import React from 'react';
import Icons from '../Icons';
import { useMedia } from '../../context/MediaContext';

export const CoursesListings = ({ triggerModal, navigateTo }) => {
  const { media } = useMedia();
  return (
    <>
      <section className="courses-listings-section">
        <div className="container">
          
          <div className="section-header text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-subtitle">4 POWERFUL COURSES • 1 BRIGHT FUTURE</span>
            <h2 className="section-title">Our Professional Courses</h2>
            <p className="section-desc">In-depth offline programs taught directly by industry practitioners</p>
            
            {/* New Batch Schedule Ribbon */}
            <div className="batch-schedule-badge" style={{ marginTop: '1.25rem' }}>
              <span className="batch-icon">🗓️</span>
              <span><span className="batch-label-text">New Batch Starts:</span> <strong>Every 1st & 15th Of Every Month</strong></span>
              <span className="limited-seats-tag">LIMITED SEATS</span>
            </div>
          </div>

          {/* ==================== SPECIAL COMBO OFFERS SECTION ==================== */}
          <div className="combo-offers-container" style={{ marginBottom: '4rem' }}>
            <div className="combo-section-header text-center">
              <div className="combo-badge-pill">🔥 SPECIAL COMBO OFFERS</div>
              <h3 className="combo-section-title">Career Combo Packages</h3>
              <p className="combo-section-desc">Save ₹10,000 instantly when you combine complementary skills!</p>
            </div>

            <div className="combo-cards-grid">
              
              {/* Combo 1: Video Editing + Graphic Designing */}
              <div className="combo-offer-card glass">
                <div className="combo-card-tag">POPULAR COMBO • SAVE ₹10,000</div>
                <div className="combo-card-content">
                  <div className="combo-programs-row">
                    <div className="combo-program-chip">
                      <span className="chip-icon">🎬</span>
                      <span className="chip-text">Video Editing</span>
                    </div>
                    <span className="combo-plus-sign">+</span>
                    <div className="combo-program-chip">
                      <span className="chip-icon">🎨</span>
                      <span className="chip-text">Graphic Designing</span>
                    </div>
                  </div>

                  <div className="combo-price-block">
                    <div className="combo-duration-capsule">45 DAYS COURSE</div>
                    <div className="combo-price-flex">
                      <span className="combo-original-price">₹40,000</span>
                      <span className="combo-final-price">₹30,000/-</span>
                    </div>
                    <span className="combo-savings-text">🎉 You Save ₹10,000 Instant Discount!</span>
                  </div>

                  <div className="combo-software-row">
                    <Icons.Photoshop />
                    <Icons.Illustrator />
                    <Icons.Premiere />
                    <Icons.AfterEffects />
                  </div>

                  <p className="combo-description">
                    Master visual design + video editing in one complete program. Become a complete content machine for agencies and clients.
                  </p>

                  <div className="combo-actions">
                    <button 
                      onClick={() => triggerModal('Combo 1: Video Editing + Graphic Designing')} 
                      className="btn btn-primary btn-block-combo"
                    >
                      Claim Combo Offer ₹30,000
                    </button>
                  </div>
                </div>
              </div>

              {/* Combo 2: Video Editing + Cinematography & Film Making */}
              <div className="combo-offer-card glass combo-featured">
                <div className="combo-card-tag gold-tag">MASTER FILMMAKER COMBO • SAVE ₹10,000</div>
                <div className="combo-card-content">
                  <div className="combo-programs-row">
                    <div className="combo-program-chip">
                      <span className="chip-icon">🎬</span>
                      <span className="chip-text">Video Editing</span>
                    </div>
                    <span className="combo-plus-sign">+</span>
                    <div className="combo-program-chip">
                      <span className="chip-icon">📹</span>
                      <span className="chip-text">Cinematography & Film Making</span>
                    </div>
                  </div>

                  <div className="combo-price-block">
                    <div className="combo-duration-capsule">45 DAYS COURSE</div>
                    <div className="combo-price-flex">
                      <span className="combo-original-price">₹55,000</span>
                      <span className="combo-final-price gold-price">₹45,000/-</span>
                    </div>
                    <span className="combo-savings-text">🎉 You Save ₹10,000 Instant Discount!</span>
                  </div>

                  <div className="combo-software-row">
                    <Icons.Camera />
                    <Icons.Drone />
                    <Icons.Premiere />
                    <Icons.AfterEffects />
                  </div>

                  <p className="combo-description">
                    From shooting on set with DSLR & Drone to editing final cinema cuts. Total hands-on filmmaking package for directors & creators.
                  </p>

                  <div className="combo-actions">
                    <button 
                      onClick={() => triggerModal('Combo 2: Video Editing + Cinematography')} 
                      className="btn btn-primary btn-block-combo gold-btn"
                    >
                      Claim Combo Offer ₹45,000
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ==================== 4 MAIN INDIVIDUAL COURSES ==================== */}
          <div className="course-details-stack">
          
          {/* Graphic Design */}
          <div id="graphic-design" className="course-listing-row glass">
            <div className="listing-text">
              <span className="course-label-badge">SINGLE PROGRAM • 45 DAYS COURSE</span>
              <h2>Graphic Designing Course</h2>
              <p className="outcome-tag">Adobe Photoshop & Illustrator Course</p>
              <div className="course-inline-image">
                <img src={media.course_graphic} alt="Graphic Design Workstation" />
              </div>
              <p className="price-tag gold-text">₹20,000/-</p>
              <div className="software-row-listing">
                <Icons.Photoshop />
                <Icons.Illustrator />
              </div>
              
              <div className="detailed-syllabus-split">
                <div className="syllabus-col">
                  <h4>Course Includes:</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Social Media Creatives</li>
                    <li><span>✦</span> Logo & Branding Design</li>
                    <li><span>✦</span> Posters, Banners & Brochures</li>
                    <li><span>✦</span> Real Projects & Portfolio Building</li>
                    <li><span>✦</span> Photo Editing & Retouching</li>
                    <li><span>✦</span> Vector Artwork & Illustration</li>
                  </ul>
                </div>
                
                <div className="syllabus-col">
                  <h4>Core Software Covered:</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Adobe Photoshop (Ps)</li>
                    <li><span>✦</span> Adobe Illustrator (Ai)</li>
                    <li><span>✦</span> Typography & Color Theory</li>
                    <li><span>✦</span> Print & Digital Layouts</li>
                    <li><span>✦</span> Behance Portfolio Setup</li>
                    <li><span>✦</span> 100% Practical Training</li>
                  </ul>
                </div>
              </div>

              <div className="design-skills-footer border-top pt-3 mt-3">
                <h4>Core Design Skills Trained:</h4>
                <p className="design-skills-list">
                  Creative Concepts | Color Theory | Fonts & Typography | Layout & Composition | Print & Digital Design | Portfolio Development
                </p>
              </div>

              <div className="course-action-buttons mt-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => triggerModal('Graphic Designing Course')} className="btn btn-primary">Enroll Now</button>
                <button onClick={() => triggerModal('Enquiry')} className="btn btn-outline">Enquiry</button>
              </div>
            </div>
          </div>

          {/* Video Editing */}
          <div id="video-editing" className="course-listing-row glass">
            <div className="listing-text">
              <span className="course-label-badge">SINGLE PROGRAM • 45 DAYS COURSE</span>
              <h2>Video Editing Course</h2>
              <p className="outcome-tag">Adobe Premiere Pro & After Effects Course</p>
              <div className="course-inline-image">
                <img src={media.course_video} alt="Video Editing Workspace" style={{ aspectRatio: 'auto', objectFit: 'contain' }} />
              </div>
              <p className="price-tag gold-text">₹20,000/-</p>
              <div className="software-row-listing">
                <Icons.Premiere />
                <Icons.AfterEffects />
              </div>
              
              <div className="detailed-syllabus-split">
                <div className="syllabus-col">
                  <h4>Course Includes:</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Video Cutting & Transitions</li>
                    <li><span>✦</span> Logo & Branding Design</li>
                    <li><span>✦</span> Motion Graphics & VFX</li>
                    <li><span>✦</span> Real Projects & Portfolio Building</li>
                    <li><span>✦</span> Timeline & Sequence Management</li>
                    <li><span>✦</span> Audio Syncing & Sound Design</li>
                  </ul>
                </div>
                
                <div className="syllabus-col">
                  <h4>Core Software Covered:</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Adobe Premiere Pro (Pr)</li>
                    <li><span>✦</span> Adobe After Effects (Ae)</li>
                    <li><span>✦</span> Motion Titles & Lower Thirds</li>
                    <li><span>✦</span> Commercial Reels & YouTube Editing</li>
                    <li><span>✦</span> Color Correction & Grading</li>
                    <li><span>✦</span> 100% Practical Training</li>
                  </ul>
                </div>
              </div>

              <div className="course-action-buttons mt-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => triggerModal('Video Editing Course')} className="btn btn-primary">Enroll Now</button>
                <button onClick={() => triggerModal('Enquiry')} className="btn btn-outline">Enquiry</button>
              </div>
            </div>
          </div>

          {/* Cinematography & Film Making */}
          <div id="cinematography" className="course-listing-row glass">
            <div className="listing-text">
              <span className="course-label-badge">SINGLE PROGRAM • 45 DAYS COURSE</span>
              <h2>Cinematography & Film Making</h2>
              <p className="outcome-tag">Camera Handling | Gimbal | Drone Shooting | Lighting</p>
              <div className="course-inline-images-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1.5rem 0', maxWidth: '800px' }}>
                <div className="course-inline-image" style={{ flex: '1 1 280px', margin: 0 }}>
                  <img src={media.course_cinematography_1} alt="Cinematography DSLR Shooting Set" />
                </div>
                <div className="course-inline-image" style={{ flex: '1 1 280px', margin: 0 }}>
                  <img src={media.course_cinematography_2} alt="Cinematography Clapperboard Gear" />
                </div>
              </div>
              <p className="price-tag gold-text">₹35,000/-</p>
              <div className="software-row-listing" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Icons.Camera />
                <Icons.Drone />
              </div>
              
              <div className="detailed-syllabus-split">
                <div className="syllabus-col">
                  <h4>Course Includes:</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Camera Handling & Settings</li>
                    <li><span>✦</span> Gimbal Techniques & Movements</li>
                    <li><span>✦</span> Drone Shooting & Aerial Filming</li>
                    <li><span>✦</span> Composition & Framing Rules</li>
                    <li><span>✦</span> Lighting Techniques (3-Point Light)</li>
                    <li><span>✦</span> Shoot Practice & Real Projects</li>
                  </ul>
                </div>
                
                <div className="syllabus-col">
                  <h4>Production Equipment Covered:</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Professional DSLR / Mirrorless Cameras</li>
                    <li><span>✦</span> 3-Axis Motorized Gimbals</li>
                    <li><span>✦</span> Aerial Drones & Quadcopters</li>
                    <li><span>✦</span> Studio Softboxes & LED Panels</li>
                    <li><span>✦</span> On-Set Audio & Mics</li>
                    <li><span>✦</span> Live Shoot Practice</li>
                  </ul>
                </div>
              </div>

              <div className="design-skills-footer border-top pt-3 mt-3">
                <h4>Core Technical Shooting Skills Trained:</h4>
                <p className="design-skills-list">
                  Framing & Composition | ISO & Aperture Control | Gimbal Stabilization | Aerial Filming | Studio Lighting | Live Production Workflows
                </p>
              </div>

              <div className="course-action-buttons mt-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => triggerModal('Cinematography Course')} className="btn btn-primary">Enroll Now</button>
                <button onClick={() => triggerModal('Enquiry')} className="btn btn-outline">Enquiry</button>
              </div>
            </div>
          </div>

          {/* Social Media Marketing */}
          <div id="social-media-marketing" className="course-listing-row glass">
            <div className="listing-text">
              <span className="course-label-badge">SINGLE PROGRAM • 45 DAYS COURSE</span>
              <h2>Social Media Marketing</h2>
              <p className="outcome-tag">Instagram | Facebook | YouTube | Google Ads</p>
              <div className="course-inline-images-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1.5rem 0', maxWidth: '800px' }}>
                <div className="course-inline-image" style={{ flex: '1 1 280px', margin: 0 }}>
                  <img src={media.course_social_phone} alt="Social Media Phone Mockup" style={{ aspectRatio: 'auto', objectFit: 'contain' }} />
                </div>
                <div className="course-inline-image" style={{ flex: '1 1 280px', margin: 0 }}>
                  <img src={media.course_social} alt="Social Media Strategy Workspace" />
                </div>
              </div>
              <p className="price-tag gold-text">₹35,000/-</p>
              <div className="software-row-listing">
                <Icons.Instagram />
                <Icons.Youtube />
                <Icons.Facebook />
                <Icons.Google />
              </div>
              
              <div className="detailed-syllabus-split">
                <div className="syllabus-col">
                  <h4>Course Includes:</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Instagram, Facebook, YouTube & Google</li>
                    <li><span>✦</span> Content Strategy & Creation</li>
                    <li><span>✦</span> Google Ads Setup & Scaling</li>
                    <li><span>✦</span> Meta (Facebook & Instagram) Ads</li>
                    <li><span>✦</span> Analytics & Performance Tracking</li>
                    <li><span>✦</span> Grow & Monetize Social Media</li>
                  </ul>
                </div>
                
                <div className="syllabus-col">
                  <h4>Platforms & Tools Covered:</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Meta Business Suite & Ad Manager</li>
                    <li><span>✦</span> Google Ads Platform</li>
                    <li><span>✦</span> YouTube Studio & Monetization</li>
                    <li><span>✦</span> Instagram Reel & Organic Growth</li>
                    <li><span>✦</span> Copywriting & Hook Scripting</li>
                    <li><span>✦</span> Real Digital Client Campaigns</li>
                  </ul>
                </div>
              </div>

              <div className="design-skills-footer border-top pt-3 mt-3">
                <h4>Core Marketing Skills Trained:</h4>
                <p className="design-skills-list">
                  Audience Analytics | Content Scheduling | Organic Growth Tactics | Influencer Collaboration | Brand Voice Development | Paid Ads Scaling
                </p>
              </div>

              <div className="course-action-buttons mt-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => triggerModal('Social Media Marketing')} className="btn btn-primary">Enroll Now</button>
                <button onClick={() => triggerModal('Enquiry')} className="btn btn-outline">Enquiry</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
};

export default CoursesListings;
