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
        
        {/* Section Header with Batch Start Alert */}
        <div className="section-header text-center reveal-on-scroll">
          <span className="section-subtitle">4 POWERFUL COURSES • 1 BRIGHT FUTURE</span>
          <h2 className="section-title">Our Professional Courses & Combos</h2>
          <p className="section-desc">Practical, industry-focused offline training taught directly by expert mentors.</p>
          
          {/* New Batch Schedule Ribbon */}
          <div className="batch-schedule-badge">
            <span className="batch-icon">🗓️</span>
            <span><span className="batch-label-text">New Batch Starts:</span> <strong>Every 1st & 15th Of Every Month</strong></span>
            <span className="limited-seats-tag">LIMITED SEATS</span>
          </div>
        </div>

        {/* ==================== COURSES & COMBOS SLIDER ==================== */}
        <div className="courses-slider-container">
          <button className="slider-arrow arrow-left" onClick={() => scroll('left')} aria-label="Slide Left">‹</button>
          <button className="slider-arrow arrow-right" onClick={() => scroll('right')} aria-label="Slide Right">›</button>

          <div ref={scrollRef} className="courses-home-grid">
            
            {/* 1. Graphic Designing Course */}
            <div className="course-card-pricing white-card reveal-on-scroll">
              <div className="card-top-header">
                <div className="icon-container">🎨</div>
                <div className="plan-label-capsule">45 DAYS COURSE</div>
              </div>
              <h3 className="course-title-pricing">Graphic Designing</h3>
              <div className="course-outcome-pricing">
                <Icons.Photoshop />
                <Icons.Illustrator />
              </div>
              <div className="price-container-pricing">
                <span className="currency">₹</span>
                <span className="price">20,000</span>
                <span className="duration">/ total</span>
              </div>
              <p className="card-description-pricing">Perfect for starting your creative visual branding & design career.</p>
              <div className="divider-line"></div>
              <ul className="course-features-list">
                <li><span className="checkmark-circle">✓</span> Social Media Creatives</li>
                <li><span className="checkmark-circle">✓</span> Logo & Branding Design</li>
                <li><span className="checkmark-circle">✓</span> Posters, Banners & Brochures</li>
                <li><span className="checkmark-circle">✓</span> Photo Editing & Retouching</li>
                <li><span className="checkmark-circle">✓</span> Vector Artwork & Illustration</li>
                <li><span className="checkmark-circle">✓</span> Real Projects & Portfolio Building</li>
              </ul>
              <button onClick={() => navigateTo('courses', 'graphic-design')} className="btn-pricing-secondary">More Details</button>
              <button onClick={() => triggerModal('Graphic Designing Course')} className="btn-pricing-primary">Enroll Now</button>
              <p className="footer-subtext-pricing">100% Offline | Live Project Work</p>
            </div>

            {/* 2. Video Editing Course - FEATURED BLUE CARD */}
            <div className="course-card-pricing blue-card featured reveal-on-scroll">
              <div className="card-top-header">
                <div className="icon-container">🎬</div>
                <div className="plan-label-capsule">45 DAYS COURSE</div>
              </div>
              <h3 className="course-title-pricing">Video Editing</h3>
              <div className="course-outcome-pricing">
                <Icons.Premiere />
                <Icons.AfterEffects />
              </div>
              <div className="price-container-pricing">
                <span className="currency">₹</span>
                <span className="price">20,000</span>
                <span className="duration">/ total</span>
              </div>
              <p className="card-description-pricing">Most popular program for social media creators & commercial ad editors.</p>
              <div className="divider-line"></div>
              <ul className="course-features-list">
                <li><span className="checkmark-circle">✓</span> Video Cutting & Transitions</li>
                <li><span className="checkmark-circle">✓</span> Logo & Branding Design</li>
                <li><span className="checkmark-circle">✓</span> Motion Graphics & VFX</li>
                <li><span className="checkmark-circle">✓</span> Audio Syncing & Sound Design</li>
                <li><span className="checkmark-circle">✓</span> YouTube & Reel Editing Setups</li>
                <li><span className="checkmark-circle">✓</span> Real Projects & Portfolio Building</li>
              </ul>
              <button onClick={() => navigateTo('courses', 'video-editing')} className="btn-pricing-outline-white">More Details</button>
              <button onClick={() => triggerModal('Video Editing Course')} className="btn-pricing-white">Enroll Now</button>
              <p className="footer-subtext-pricing">Best Seller | Placement Assistance</p>
            </div>

            {/* 3. Cinematography & Film Making */}
            <div className="course-card-pricing white-card reveal-on-scroll">
              <div className="card-top-header">
                <div className="icon-container">📹</div>
                <div className="plan-label-capsule">45 DAYS COURSE</div>
              </div>
              <h3 className="course-title-pricing">Cinematography & Film Making</h3>
              <div className="course-outcome-pricing">
                <Icons.Camera />
                <Icons.Drone />
              </div>
              <div className="price-container-pricing">
                <span className="currency">₹</span>
                <span className="price">35,000</span>
                <span className="duration">/ total</span>
              </div>
              <p className="card-description-pricing">Comprehensive hands-on cameras, drone & equipment shooting masterclass.</p>
              <div className="divider-line"></div>
              <ul className="course-features-list">
                <li><span className="checkmark-circle">✓</span> Camera Handling & Settings</li>
                <li><span className="checkmark-circle">✓</span> Gimbal Techniques & Movements</li>
                <li><span className="checkmark-circle">✓</span> Drone Shooting & Aerial Composition</li>
                <li><span className="checkmark-circle">✓</span> Composition & Framing Rules</li>
                <li><span className="checkmark-circle">✓</span> Studio Lighting Techniques</li>
                <li><span className="checkmark-circle">✓</span> Shoot Practice & Real Projects</li>
              </ul>
              <button onClick={() => navigateTo('courses', 'cinematography')} className="btn-pricing-secondary">More Details</button>
              <button onClick={() => triggerModal('Cinematography Course')} className="btn-pricing-primary">Enroll Now</button>
              <p className="footer-subtext-pricing">Professional Rigs | Real Shoots</p>
            </div>

            {/* 4. Social Media Marketing */}
            <div className="course-card-pricing white-card reveal-on-scroll">
              <div className="card-top-header">
                <div className="icon-container">📱</div>
                <div className="plan-label-capsule">45 DAYS COURSE</div>
              </div>
              <h3 className="course-title-pricing">Social Media Marketing</h3>
              <div className="course-outcome-pricing">
                <Icons.Instagram />
                <Icons.Youtube />
                <Icons.Facebook />
                <Icons.Google />
              </div>
              <div className="price-container-pricing">
                <span className="currency">₹</span>
                <span className="price">35,000</span>
                <span className="duration">/ total</span>
              </div>
              <p className="card-description-pricing">Master algorithms, paid ads, audience growth and brand monetization.</p>
              <div className="divider-line"></div>
              <ul className="course-features-list">
                <li><span className="checkmark-circle">✓</span> Instagram, Facebook, YouTube & Google</li>
                <li><span className="checkmark-circle">✓</span> Content Strategy & Creation</li>
                <li><span className="checkmark-circle">✓</span> Google Ads Setup & Optimization</li>
                <li><span className="checkmark-circle">✓</span> Meta (Facebook & Instagram) Ads</li>
                <li><span className="checkmark-circle">✓</span> Analytics & Performance Tracking</li>
                <li><span className="checkmark-circle">✓</span> Grow & Monetize Social Media</li>
              </ul>
              <button onClick={() => navigateTo('courses', 'social-media-marketing')} className="btn-pricing-secondary">More Details</button>
              <button onClick={() => triggerModal('Social Media Marketing')} className="btn-pricing-primary">Enroll Now</button>
              <p className="footer-subtext-pricing">Organic Tactics | Live Campaigns</p>
            </div>

            {/* 5. COMBO OFFER 1: Video Editing + Graphic Designing (Placed at End) */}
            <div className="course-card-pricing combo-slider-card reveal-on-scroll">
              <div className="card-top-header">
                <div className="icon-container">🔥</div>
                <div className="plan-label-capsule combo-capsule">SAVE ₹10,000</div>
              </div>
              <div className="combo-card-badge">POPULAR COMBO OFFER</div>
              <h3 className="course-title-pricing">Video Editing + Graphic Designing</h3>
              <div className="course-outcome-pricing">
                <Icons.Photoshop />
                <Icons.Illustrator />
                <Icons.Premiere />
                <Icons.AfterEffects />
              </div>
              <div className="price-container-pricing">
                <span className="original-price-strike">₹40,000</span>
                <span className="currency">₹</span>
                <span className="price combo-highlight-price">30,000</span>
                <span className="duration">/ total</span>
              </div>
              <p className="card-description-pricing">Complete visual design + video editing suite (45 Days Course).</p>
              <div className="divider-line"></div>
              <ul className="course-features-list">
                <li><span className="checkmark-circle">✓</span> Full Graphic Designing Syllabus</li>
                <li><span className="checkmark-circle">✓</span> Full Video Editing & VFX Syllabus</li>
                <li><span className="checkmark-circle">✓</span> Photoshop, Illustrator, Premiere, After Effects</li>
                <li><span className="checkmark-circle">✓</span> Double Skill Certification</li>
                <li><span className="checkmark-circle">✓</span> Real Client Projects & Portfolio</li>
                <li><span className="checkmark-circle">✓</span> 🎉 Instant ₹10,000 Discount Savings</li>
              </ul>
              <button onClick={() => triggerModal('Combo 1: Video Editing + Graphic Designing')} className="btn-pricing-primary combo-claim-btn">
                Claim Combo Offer ₹30,000
              </button>
              <p className="footer-subtext-pricing">45 Days | Double Skill Package</p>
            </div>

            {/* 6. COMBO OFFER 2: Video Editing + Cinematography & Film Making (Placed at End) */}
            <div className="course-card-pricing combo-slider-card gold-combo-slider reveal-on-scroll">
              <div className="card-top-header">
                <div className="icon-container">🎥</div>
                <div className="plan-label-capsule combo-capsule-gold">SAVE ₹10,000</div>
              </div>
              <div className="combo-card-badge gold-badge">MASTER FILMMAKER COMBO</div>
              <h3 className="course-title-pricing">Video Editing + Cinematography</h3>
              <div className="course-outcome-pricing">
                <Icons.Camera />
                <Icons.Drone />
                <Icons.Premiere />
                <Icons.AfterEffects />
              </div>
              <div className="price-container-pricing">
                <span className="original-price-strike">₹55,000</span>
                <span className="currency">₹</span>
                <span className="price combo-highlight-price-gold">45,000</span>
                <span className="duration">/ total</span>
              </div>
              <p className="card-description-pricing">Shoot on set with DSLR & Drone + Edit cinema cuts (45 Days Course).</p>
              <div className="divider-line"></div>
              <ul className="course-features-list">
                <li><span className="checkmark-circle">✓</span> Full Cinematography & Drone Syllabus</li>
                <li><span className="checkmark-circle">✓</span> Full Video Editing & Motion VFX Syllabus</li>
                <li><span className="checkmark-circle">✓</span> Camera, Gimbal, Drone, Premiere, After Effects</li>
                <li><span className="checkmark-circle">✓</span> Complete Shoot-to-Edit Master Package</li>
                <li><span className="checkmark-circle">✓</span> Real Shoots & Studio Internship</li>
                <li><span className="checkmark-circle">✓</span> 🎉 Instant ₹10,000 Discount Savings</li>
              </ul>
              <button onClick={() => triggerModal('Combo 2: Video Editing + Cinematography')} className="btn-pricing-primary gold-claim-btn">
                Claim Combo Offer ₹45,000
              </button>
              <p className="footer-subtext-pricing">45 Days | Filmmaking Master Pack</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CoursesHome;
