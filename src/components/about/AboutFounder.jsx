import React from 'react';
import { useMedia } from '../../context/MediaContext';
import Icons from '../Icons';

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
              {/* Mobile-only founder image */}
              <div className="founder-img-container founder-img-mobile">
                <img src={media.founderRawalSingh} alt="Rawal Singh - Founder of Bawra Skill House" className="founder-img" />
                <div className="founder-badge-overlay glass">
                  <span className="founder-age">26 Years Old</span>
                  <span className="founder-role-tag">Founder & Creator</span>
                </div>
              </div>
              <h2 className="founder-name">Rawal Singh</h2>
              <p className="founder-title">Founder, Creator & Entrepreneur</p>

              <p className="founder-bio">
                2018. Ek camera. Ek junoon. Koi plan nahi.<br />
                <b>Rawal Singh</b> ne content creation tab start kiya jab log sirf "secure job" ki baat karte the. Unhone multiple companies ke saath kaam kiya — cinematographer bane, creator bane, learner bane.
                Phir college choda. Log hanse.<br /><br />
                Aaj — <span className="youtube-bold"><b>5 lakh+ YouTube subscribers</b> <Icons.Youtube className="youtube-small-logo" /></span>. 30+ team ki agency. Pan-India clients. International trips. Apni gaadi. Apni company.<br /><br />
                Sab kuch 26 saal ki umra mein — bina kisi "proper degree" ke.<br /><br />
                <b> Bawra Digital Private Limited bani </b>— ek real, running agency. Aur uske anubhav se bana <b> Bawra Skillhouse</b> — Rajasthan ka pehla offline skill institute jahan ek real agency founder tumhara mentor hai.
              </p>

              <h4 className="achievements-title">Achievements & National Recognition:</h4>
              <div className="founder-recognitions-list">
                <div className="recognition-item">
                  <span className="rec-number">01</span>
                  <div className="rec-detail">
                    <strong>Government of Rajasthan Recognition</strong>
                  </div>
                </div>

                <div className="recognition-item">
                  <span className="rec-number">02</span>
                  <div className="rec-detail">
                    <strong>Personal Invitation from PM Narendra Modi</strong>
                  </div>
                </div>

                <div className="recognition-item">
                  <span className="rec-number">03</span>
                  <div className="rec-detail">
                    <strong>Creator Nation Award</strong>
                  </div>
                </div>

                <div className="recognition-item">
                  <span className="rec-number">04</span>
                  <div className="rec-detail">
                    <strong>National Print & Digital Media Features</strong>
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
