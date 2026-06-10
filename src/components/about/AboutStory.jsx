import React from 'react';
import { useMedia } from '../../context/MediaContext';

export const AboutStory = () => {
  const { media } = useMedia();
  return (
    <section className="about-story-section">
      <div className="container welcome-grid">
        <div className="welcome-text">
          <span className="section-subtitle">OUR ORIGINS</span>
          <h2>How Bawra Skill House Was Founded</h2>
          <p>
            Founded by <strong>Rawal Singh</strong>, Bawra Skill House was born out of a simple, disruptive idea: that traditional visual education is outdated and fails to prepare youth for the fast-evolving creative industry. 
          </p>
          <p>
            Recognizing the immense potential of the digital creator economy, Rawal set out to build an institute that bypasses heavy theoretical lectures. Instead, we focus on practical, tool-based mastery in Graphic Design, Video Editing, Motion Graphics, Content Creation, and Digital Marketing.
          </p>
          <p>
            Today, we empower thousands of young people to bypass the traditional college path, build high-impact portfolios, gain direct agency employment, or launch independent freelance businesses.
          </p>
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
