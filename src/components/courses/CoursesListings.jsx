import React from 'react';
import Icons from '../Icons';
import { useMedia } from '../../context/MediaContext';

export const CoursesListings = ({ triggerModal, navigateTo }) => {
  const { media } = useMedia();
  return (
    <>
      <section className="courses-listings-section">
        <div className="container">
          
          <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
            <span className="section-subtitle">OUR PROGRAMS</span>
            <h2 className="section-title">Our Professional Courses</h2>
            <p className="section-desc">In-depth offline programs taught directly by industry practitioners</p>
          </div>

          <div className="course-details-stack">
          
          {/* Graphic Design */}
          <div id="graphic-design" className="course-listing-row glass">
            <div className="listing-text">
              <span className="course-label-badge">SINGLE PROGRAM • 30 DAYS</span>
              <h2>Graphic Designing Course</h2>
              <p className="outcome-tag">Adobe Photoshop & Illustrator Course</p>
              <p className="price-tag gold-text">₹19,999/-</p>
              <div className="software-row-listing">
                <Icons.Photoshop />
                <Icons.Illustrator />
              </div>
              
              <div className="detailed-syllabus-split">
                <div className="syllabus-col">
                  <h4>Photoshop Syllabus</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Photo Editing & Retouching</li>
                    <li><span>✦</span> Social Media Post Design</li>
                    <li><span>✦</span> Poster & Banner Design</li>
                    <li><span>✦</span> Thumbnail Design</li>
                    <li><span>✦</span> Photo Manipulation & Effects</li>
                    <li><span>✦</span> Typography & Layout Principles</li>
                  </ul>
                </div>
                
                <div className="syllabus-col">
                  <h4>Illustrator Syllabus</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Logo Design & Branding</li>
                    <li><span>✦</span> Brand Identity Manuals</li>
                    <li><span>✦</span> Vector Artwork & Illustration</li>
                    <li><span>✦</span> Flyer & Brochure Design</li>
                    <li><span>✦</span> Business Card Design</li>
                    <li><span>✦</span> Packaging Design Layouts</li>
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
                <a href="/Graphic_Designing_Brochure.pdf" download className="btn btn-outline">Download Syllabus PDF</a>
              </div>
            </div>
            <div className="listing-image">
              <img src={media.course_graphic} alt="Graphic Design Workstation" />
            </div>
          </div>

          {/* Video Editing */}
          <div id="video-editing" className="course-listing-row glass">
            <div className="listing-text">
              <span className="course-label-badge">SINGLE PROGRAM • 30 DAYS</span>
              <h2>Video Editing Course</h2>
              <p className="outcome-tag">Adobe Premiere Pro, After Effects & DaVinci Resolve</p>
              <p className="price-tag gold-text">₹19,999/-</p>
              <div className="software-row-listing">
                <Icons.Premiere />
                <Icons.Davinci />
                <Icons.AfterEffects />
              </div>
              
              <div className="detailed-syllabus-split">
                <div className="syllabus-col">
                  <h4>Premiere Pro Syllabus</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Video Editing Basics</li>
                    <li><span>✦</span> Timeline & Sequence management</li>
                    <li><span>✦</span> Cuts, Transitions & visual effects</li>
                    <li><span>✦</span> Audio Editing & Audio Syncing</li>
                    <li><span>✦</span> Titles, Text & Lower Thirds</li>
                    <li><span>✦</span> Reels, YouTube & Commercial Editing</li>
                  </ul>
                </div>
                
                <div className="syllabus-col">
                  <h4>DaVinci & After Effects</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Professional Color Correction</li>
                    <li><span>✦</span> Advanced Color Grading</li>
                    <li><span>✦</span> LUTs, Presets & Creative Looks</li>
                    <li><span>✦</span> Motion Graphics & Text Animations</li>
                    <li><span>✦</span> Shape Layers & Keyframes</li>
                    <li><span>✦</span> Visual Effects & Logo Animations</li>
                  </ul>
                </div>
              </div>

              <div className="course-action-buttons mt-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => triggerModal('Video Editing Course')} className="btn btn-primary">Enroll Now</button>
                <a href="/Video_Editing_Brochure.pdf" download className="btn btn-outline">Download Syllabus PDF</a>
              </div>
            </div>
            <div className="listing-image">
              <img src={media.course_video} alt="Video Editing Workspace" />
            </div>
          </div>

          {/* Social Media Marketing */}
          <div id="social-media-marketing" className="course-listing-row glass">
            <div className="listing-text">
              <span className="course-label-badge">SINGLE PROGRAM • 45 DAYS</span>
              <h2>Social Media Marketing</h2>
              <p className="outcome-tag">Instagram | YouTube | LinkedIn | Strategy</p>
              <p className="price-tag gold-text">₹34,999/-</p>
              <div className="software-row-listing">
                <Icons.Instagram />
                <Icons.Youtube />
                <Icons.Facebook />
                <Icons.Google />
              </div>
              
              <div className="detailed-syllabus-split">
                <div className="syllabus-col">
                  <h4>Content & Platform Strategy</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Content strategy — kya post karo, kab karo, kyun karo</li>
                    <li><span>✦</span> Platforms growth — Instagram, YouTube, LinkedIn</li>
                    <li><span>✦</span> Copywriting — captions, hooks, CTAs jo actually kaam karein</li>
                  </ul>
                </div>
                
                <div className="syllabus-col">
                  <h4>Community & Collaboration</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Community building — followers ko audience mein badalna</li>
                    <li><span>✦</span> Influencer & brand collaboration campaigns</li>
                    <li><span>✦</span> Real accounts management on live digital pages</li>
                  </ul>
                </div>
              </div>

              <div className="design-skills-footer border-top pt-3 mt-3">
                <h4>Core Marketing Skills Trained:</h4>
                <p className="design-skills-list">
                  Audience Analytics | Content Scheduling | Organic Growth Tactics | Influencer Collaboration | Brand Voice Development | Copywriting & Caption Creation
                </p>
              </div>

              <div className="course-action-buttons mt-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => triggerModal('Social Media Marketing')} className="btn btn-primary">Enroll Now</button>
                <button onClick={() => triggerModal('Inquiry')} className="btn btn-outline">Inquiry</button>
              </div>
            </div>
            <div className="listing-image">
              <img src={media.course_social} alt="Social Media Strategy Workspace" />
            </div>
          </div>

          {/* Performance Marketing */}
          <div id="performance-marketing" className="course-listing-row glass">
            <div className="listing-text">
              <span className="course-label-badge">SINGLE PROGRAM • 30 DAYS</span>
              <h2>Performance Marketing</h2>
              <p className="outcome-tag">Meta Ads | Google Ads | Analytics</p>
              <p className="price-tag gold-text">₹29,999/-</p>
              <div className="software-row-listing ads-platform-row">
                <Icons.MetaAds />
                <div className="platform-vertical-divider"></div>
                <Icons.GoogleAds />
              </div>
              
              <div className="detailed-syllabus-split">
                <div className="syllabus-col">
                  <h4>Advertising campaigns</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Meta Ads (Facebook + Instagram) campaign setup</li>
                    <li><span>✦</span> Custom audience targeting & A/B testing</li>
                    <li><span>✦</span> Google Ads — search, display, YouTube ads</li>
                  </ul>
                </div>
                
                <div className="syllabus-col">
                  <h4>Funnels & Budgets</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Analytics — reading data, optimization & ROAS</li>
                    <li><span>✦</span> Funnel building — from awareness to conversion</li>
                    <li><span>✦</span> Budget management & campaigns on live accounts</li>
                  </ul>
                </div>
              </div>

              <div className="design-skills-footer border-top pt-3 mt-3">
                <h4>Core Advertising Skills Trained:</h4>
                <p className="design-skills-list">
                  Paid Acquisition | ROI Optimization | Custom Audiences | Ad Account Setup | Landing Page Funnels | Campaign Scaling
                </p>
              </div>

              <div className="course-action-buttons mt-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => triggerModal('Performance Marketing')} className="btn btn-primary">Enroll Now</button>
                <button onClick={() => triggerModal('Inquiry')} className="btn btn-outline">Inquiry</button>
              </div>
            </div>
            <div className="listing-image">
              <img src={media.course_performance} alt="Performance Advertising Analytics" />
            </div>
          </div>

          {/* Cinematography & Shooting */}
          <div id="cinematography" className="course-listing-row glass">
            <div className="listing-text">
              <span className="course-label-badge">SINGLE PROGRAM • 45 DAYS</span>
              <h2>Cinematography & Shooting</h2>
              <p className="outcome-tag">Camera (DSLR/Mirrorless) | Gimbal | Drone</p>
              <p className="price-tag gold-text">₹39,999/-</p>
              <div className="software-row-listing" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px', color: 'var(--brand-pink)' }}>
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <Icons.Premiere />
              </div>
              
              <div className="detailed-syllabus-split">
                <div className="syllabus-col">
                  <h4>Camera & Rig Operation</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Camera operation settings & manual control</li>
                    <li><span>✦</span> Gimbal movement shots & composition</li>
                    <li><span>✦</span> Drone piloting, aerial composition & legalities</li>
                  </ul>
                </div>
                
                <div className="syllabus-col">
                  <h4>Lighting & Live Production</h4>
                  <ul className="listing-bullets">
                    <li><span>✦</span> Lighting setup — natural, studio & 3-point light</li>
                    <li><span>✦</span> Shot composition rules & depth of field</li>
                    <li><span>✦</span> Real shoots & production sets practical practice</li>
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
                <button onClick={() => triggerModal('Inquiry')} className="btn btn-outline">Inquiry</button>
              </div>
            </div>
            <div className="listing-image">
              <img src={media.course_cinematography} alt="Cinematography DSLR Shooting" />
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
};

export default CoursesListings;
