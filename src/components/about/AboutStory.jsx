import React from 'react';
import { useMedia } from '../../context/MediaContext';

export const AboutStory = () => {
  const { media } = useMedia();

  return (
    <section className="about-story-section">
      <div className="container about-story-grid">
        <div className="welcome-image-frame border-accent-gold">
          <img src={media.aboutStory1} alt="Bawra Skill House Studio Layout 1" className="welcome-image" />
          <div className="studio-caption glass">
            <h4 className="gold-text">Workstation Lab</h4>
            <p>High-end editing setups & creative workspaces</p>
          </div>
        </div>

        <div className="welcome-image-frame border-accent-gold">
          <img src={media.aboutStory2} alt="Bawra Skill House Studio Layout 2" className="welcome-image" />
          <div className="studio-caption glass">
            <h4 className="gold-text">Collaboration Zone</h4>
            <p>Where students discuss ideas & design briefs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
