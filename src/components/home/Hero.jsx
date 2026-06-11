import React from 'react';
import Icons from '../Icons';
import { useMedia } from '../../context/MediaContext';

export const Hero = ({ triggerModal }) => {
  const { media } = useMedia();

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-text-top">
          <div className="academy-badge">
            Jodhpur, Rajasthan · Offline · Practical · Career-Ready
          </div>
          <h1 className="hero-headline">
            RAJASTHAN'S #1<br />
            <span className="gold-text">SKILL HOUSE</span>
          </h1>
          <p className="hero-subheadline">
            Welcome to Bawra Skill House.
            We provide practical, industry-focused training.
            Learn from expert mentors with hands-on experience.
            Build skills, grow confidently, and achieve success.
          </p>

          {/* Infinite News Ticker */}
          <div className="hero-ticker-container vertical">
            <div className="hero-ticker-vertical-wrapper">
              <div className="hero-ticker-vertical-line">
                <span className="separator">✦</span> <span className="highlight">Sirf Degree Nahi — Skill Chahiye.</span>
              </div>
              <div className="hero-ticker-vertical-line">
                <span className="separator">✦</span> <span className="highlight">Rajasthan ka Pehla Institute Jahan Aap Sikhte Nahi — Banate Ho.</span>
              </div>

              {/* Duplicate for seamless vertical loop */}
              <div className="hero-ticker-vertical-line">
                <span className="separator">✦</span> <span className="highlight">Sirf Degree Nahi — Skill Chahiye.</span>
              </div>
              <div className="hero-ticker-vertical-line">
                <span className="separator">✦</span> <span className="highlight">Rajasthan ka Pehla Institute Jahan Aap Sikhte Nahi — Banate Ho.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-media-wrapper">
          <div className="hero-frame">
            <img src={media.heroWorkspace} alt="Luxury Studio Workspace" className="hero-image" />
          </div>
        </div>

        <div className="hero-bottom-content">
          <div className="hero-actions">
            <button onClick={() => triggerModal('General Consultation')} className="btn btn-primary">Enroll Now</button>
            <button onClick={() => triggerModal('Brochure Request')} className="btn btn-outline">
              Watch Inside Classes <Icons.ArrowRight />
            </button>
          </div>

          {/* Floating Tools Badges */}
          <div className="software-integration">
            <span className="software-label">Tools We Teach:</span>
            <div className="software-icons-list">
              <div className="software-item-badge"><Icons.Photoshop /></div>
              <div className="software-item-badge"><Icons.Illustrator /></div>
              <div className="software-item-badge"><Icons.Premiere /></div>
              <div className="software-item-badge"><Icons.AfterEffects /></div>
              <div className="software-item-badge"><Icons.Davinci /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
