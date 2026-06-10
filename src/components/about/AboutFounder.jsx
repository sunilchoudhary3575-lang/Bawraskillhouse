import React from 'react';
import { useMedia } from '../../context/MediaContext';

export const AboutFounder = () => {
  const { media } = useMedia();
  return (
    <section className="about-founder-section">
      <div className="container">
        <div className="founder-card-wrapper glass-dark">
          <div className="founder-grid">
            <div className="founder-image-col">
              <div className="founder-img-container">
                <img src={media.founderRawalSingh} alt="Rawal Singh - Founder of Bawra Skill House" className="founder-img" />
                <div className="founder-badge-overlay glass">
                  <span className="founder-age">26 Years Old</span>
                  <span className="founder-role-tag">Founder & Creator</span>
                </div>
              </div>
            </div>
            
            <div className="founder-info-col">
              <span className="section-subtitle text-pink">MEET OUR FOUNDER</span>
              <h2 className="founder-name">Rawal Singh</h2>
              <p className="founder-title">Founder, Creator & Entrepreneur</p>
              
              <p className="founder-bio">
                Rawal Singh is a 26-year-old visionary designer, content editor, and digital entrepreneur who has spent years building a community of <strong>500,000+ subscribers</strong> on YouTube. Having navigated the ups and downs of the creative workspace himself, Rawal now dedicates his leadership to mentoring students, developing cutting-edge visual programs, and cultivating next-gen creators.
              </p>

              <h4 className="achievements-title">Achievements & National Recognition:</h4>
              <div className="founder-recognitions-list">
                <div className="recognition-item">
                  <span className="rec-number">01</span>
                  <div className="rec-detail">
                    <strong>Government of Rajasthan Recognition</strong>
                    <p>Officially recognized by the State Government with state-level creator recognition for outstanding work in youth education.</p>
                  </div>
                </div>
                
                <div className="recognition-item">
                  <span className="rec-number">02</span>
                  <div className="rec-detail">
                    <strong>Personal Invitation from PM Narendra Modi</strong>
                    <p>Personally invited by Prime Minister Narendra Modi for National Creator Recognition at the PM's official gathering.</p>
                  </div>
                </div>

                <div className="recognition-item">
                  <span className="rec-number">03</span>
                  <div className="rec-detail">
                    <strong>Creator Nation Award</strong>
                    <p>Recipient of the prestigious Creator Nation Award for visual excellence in digital content creation and creative mentoring.</p>
                  </div>
                </div>

                <div className="recognition-item">
                  <span className="rec-number">04</span>
                  <div className="rec-detail">
                    <strong>National Print & Digital Media Features</strong>
                    <p>Repeatedly featured in leading national publications as one of Rajasthan's prominent digital creators and skill builders.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFounder;
