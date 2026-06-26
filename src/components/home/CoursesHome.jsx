import React, { useRef } from 'react';
import Icons from '../Icons';

export const CoursesHome = ({ navigateTo, triggerModal }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 372; // Card width (340px) + Gap (32px)
      const target = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: target, behavior: 'smooth' });
    }
  };

  return (
    <section className="our-courses-home reveal-on-scroll">
      <div className="container">
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle">OUR PROGRAMS</span>
          <h2 className="section-title">Our Courses</h2>
          <p className="section-desc">Choose your path and start your creative journey</p>
        </div>

        <div className="courses-slider-container">
          <button className="slider-arrow arrow-left" onClick={() => scroll('left')} aria-label="Slide Left">‹</button>
          <button className="slider-arrow arrow-right" onClick={() => scroll('right')} aria-label="Slide Right">›</button>

          <div ref={scrollRef} className="courses-home-grid">
            
            {/* 1. Graphic Designing Course */}
            <div className="course-card-pricing white-card reveal-on-scroll">
              <div className="card-top-header">
                <div className="icon-container">🎨</div>
                <div className="plan-label-capsule">30 DAYS</div>
              </div>
              <h3 className="course-title-pricing">Graphic Designing</h3>
              <div className="course-outcome-pricing">
                <Icons.Photoshop />
                <Icons.Illustrator />
              </div>
              <div className="price-container-pricing">
                <span className="currency">₹</span>
                <span className="price">19,999</span>
                <span className="duration">/ total</span>
              </div>
              <p className="card-description-pricing">Perfect for starting your creative visual branding career.</p>
              <div className="divider-line"></div>
              <ul className="course-features-list">
                <li><span className="checkmark-circle">✓</span> Photo Editing & Retouching</li>
                <li><span className="checkmark-circle">✓</span> Social Media Post Design</li>
                <li><span className="checkmark-circle">✓</span> Logo Design & Branding</li>
                <li><span className="checkmark-circle">✓</span> Vector Artwork & Illustration</li>
                <li><span className="checkmark-circle">✓</span> Packaging & Flyer Layouts</li>
                <li><span className="checkmark-circle">✓</span> Behance Portfolio Building</li>
              </ul>
              <button onClick={() => navigateTo('courses', 'graphic-design')} className="btn-pricing-secondary">More Details</button>
              <button onClick={() => triggerModal('Graphic Designing Course')} className="btn-pricing-primary">Enroll Now</button>
              <p className="footer-subtext-pricing">100% Offline | Live Project Work</p>
            </div>

            {/* 2. Video Editing Course - FEATURED BLUE CARD */}
            <div className="course-card-pricing blue-card featured reveal-on-scroll">
              <div className="card-top-header">
                <div className="icon-container">🎬</div>
                <div className="plan-label-capsule">30 DAYS</div>
              </div>
              <h3 className="course-title-pricing">Video Editing</h3>
              <div className="course-outcome-pricing">
                <Icons.Premiere />
                <Icons.AfterEffects />
                <Icons.Davinci />
              </div>
              <div className="price-container-pricing">
                <span className="currency">₹</span>
                <span className="price">19,999</span>
                <span className="duration">/ total</span>
              </div>
              <p className="card-description-pricing">Most popular program for social media creators & ad editors.</p>
              <div className="divider-line"></div>
              <ul className="course-features-list">
                <li><span className="checkmark-circle">✓</span> Timeline cuts, transitions & SFX</li>
                <li><span className="checkmark-circle">✓</span> Audio Syncing & Sound Design</li>
                <li><span className="checkmark-circle">✓</span> Color Correction & DaVinci Grading</li>
                <li><span className="checkmark-circle">✓</span> After Effects Motion Graphics</li>
                <li><span className="checkmark-circle">✓</span> YouTube & Reel editing setups</li>
                <li><span className="checkmark-circle">✓</span> Real studio internship access</li>
              </ul>
              <button onClick={() => navigateTo('courses', 'video-editing')} className="btn-pricing-outline-white">More Details</button>
              <button onClick={() => triggerModal('Video Editing Course')} className="btn-pricing-white">Enroll Now</button>
              <p className="footer-subtext-pricing">Best Seller | Placement Assistance</p>
            </div>

            {/* 3. Cinematography & Shooting */}
            <div className="course-card-pricing white-card reveal-on-scroll">
              <div className="card-top-header">
                <div className="icon-container">📹</div>
                <div className="plan-label-capsule">45 DAYS</div>
              </div>
              <h3 className="course-title-pricing">Cinematography</h3>
              <div className="course-outcome-pricing">
                <Icons.Camera />
                <Icons.Drone />
                <Icons.Mic />
              </div>
              <div className="price-container-pricing">
                <span className="currency">₹</span>
                <span className="price">39,999</span>
                <span className="duration">/ total</span>
              </div>
              <p className="card-description-pricing">Comprehensive hands-on cameras & equipment training.</p>
              <div className="divider-line"></div>
              <ul className="course-features-list">
                <li><span className="checkmark-circle">✓</span> Camera manual settings & controls</li>
                <li><span className="checkmark-circle">✓</span> Gimbal movement shots & rigging</li>
                <li><span className="checkmark-circle">✓</span> Drone piloting & composition rules</li>
                <li><span className="checkmark-circle">✓</span> Studio 3-point lighting setups</li>
                <li><span className="checkmark-circle">✓</span> Live production sets practice</li>
                <li><span className="checkmark-circle">✓</span> Raw video editing with Premiere</li>
              </ul>
              <button onClick={() => navigateTo('courses', 'cinematography')} className="btn-pricing-secondary">More Details</button>
              <button onClick={() => triggerModal('Cinematography Course')} className="btn-pricing-primary">Enroll Now</button>
              <p className="footer-subtext-pricing">Professional Rigs | Real Shoots</p>
            </div>

            {/* 4. Social Media Marketing */}
            <div className="course-card-pricing white-card reveal-on-scroll">
              <div className="card-top-header">
                <div className="icon-container">📱</div>
                <div className="plan-label-capsule">45 DAYS</div>
              </div>
              <h3 className="course-title-pricing">Social Media Marketing</h3>
              <div className="course-outcome-pricing">
                <Icons.Instagram />
                <Icons.Youtube />
                <Icons.Facebook />
                <Icons.LinkedIn />
              </div>
              <div className="price-container-pricing">
                <span className="currency">₹</span>
                <span className="price">34,999</span>
                <span className="duration">/ total</span>
              </div>
              <p className="card-description-pricing">Master algorithms, platform growth and brand consulting.</p>
              <div className="divider-line"></div>
              <ul className="course-features-list">
                <li><span className="checkmark-circle">✓</span> Algorithmic platform growth rules</li>
                <li><span className="checkmark-circle">✓</span> Captions & hook copywriting scripts</li>
                <li><span className="checkmark-circle">✓</span> Stated content schedule plans</li>
                <li><span className="checkmark-circle">✓</span> Influencer collaborations campaign</li>
                <li><span className="checkmark-circle">✓</span> Audience analytics & scaling strategy</li>
                <li><span className="checkmark-circle">✓</span> Real digital client pages management</li>
              </ul>
              <button onClick={() => navigateTo('courses', 'social-media-marketing')} className="btn-pricing-secondary">More Details</button>
              <button onClick={() => triggerModal('Social Media Marketing')} className="btn-pricing-primary">Enroll Now</button>
              <p className="footer-subtext-pricing">Organic Tactics | Live Campaigns</p>
            </div>

            {/* 5. Performance Marketing */}
            <div className="course-card-pricing white-card reveal-on-scroll">
              <div className="card-top-header">
                <div className="icon-container">🎯</div>
                <div className="plan-label-capsule">30 DAYS</div>
              </div>
              <h3 className="course-title-pricing">Performance Marketing</h3>
              <div className="course-outcome-pricing">
                <Icons.MetaAds />
                <Icons.GoogleAds />
              </div>
              <div className="price-container-pricing">
                <span className="currency">₹</span>
                <span className="price">29,999</span>
                <span className="duration">/ total</span>
              </div>
              <p className="card-description-pricing">Drive paid acquisitions, optimize ROAS and scale budgets.</p>
              <div className="divider-line"></div>
              <ul className="course-features-list">
                <li><span className="checkmark-circle">✓</span> Meta (Facebook + Insta) campaigns</li>
                <li><span className="checkmark-circle">✓</span> Custom target audience setup & A/B</li>
                <li><span className="checkmark-circle">✓</span> Google Search & YouTube display ads</li>
                <li><span className="checkmark-circle">✓</span> Funnels build & metrics reading</li>
                <li><span className="checkmark-circle">✓</span> Live ad budget management</li>
                <li><span className="checkmark-circle">✓</span> ROI scaling & optimization models</li>
              </ul>
              <button onClick={() => navigateTo('courses', 'performance-marketing')} className="btn-pricing-secondary">More Details</button>
              <button onClick={() => triggerModal('Performance Marketing')} className="btn-pricing-primary">Enroll Now</button>
              <p className="footer-subtext-pricing">ROI Optimization | Live Accounts</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesHome;
