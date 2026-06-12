import React from 'react';
import { useMedia } from '../../context/MediaContext';

export const AboutStory = () => {
  const { media } = useMedia();
  return (
    <section className="about-story-section">
      <div className="container welcome-grid">
        <div className="welcome-text">

        </div>

        <div className="welcome-image-frame border-accent-gold">
          <img src={media.studioWorkstations} alt="Bawra Skill House Studio Layout" className="welcome-image" />
          <div className="studio-caption glass">
            <h4 className="gold-text">Bawra Skill House</h4>
            <p>Our Jodhpur Creative Studio campus environment</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
