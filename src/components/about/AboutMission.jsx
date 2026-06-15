import React from 'react';

export const AboutMission = () => {
  return (
    <section className="about-mission-section">
      <div className="container mission-vision-grid">
        
        {/* Mission block */}
        <div className="premium-mission-card glass">
          <div className="mission-card-content">
            <div className="mission-badge">
              <span className="badge-icon">🎯</span>
              <span>Our Mission</span>
            </div>
            <h3>Empowering Creators</h3>
            <p>
              Bridging the gap between traditional education and modern agency needs through practical, creator-driven training.
            </p>
          </div>
          <div className="mission-card-media">
            <div className="media-glow pink-glow"></div>
            <div className="media-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80" 
                alt="Motion Graphics and Video Editing Timeline UI Screen" 
                className="mission-media-img" 
              />
              <div className="media-overlay-gradient"></div>
            </div>
          </div>
        </div>

        {/* Vision block */}
        <div className="premium-mission-card glass border-accent-gold">
          <div className="mission-card-content">
            <div className="mission-badge gold-badge">
              <span className="badge-icon">👁️</span>
              <span>Our Vision</span>
            </div>
            <h3>Pioneering the Future</h3>
            <p>
              To build India's ultimate skill ecosystem, equipping young talent to launch independent global freelance careers.
            </p>
          </div>
          <div className="mission-card-media">
            <div className="media-glow gold-glow"></div>
            <div className="media-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80" 
                alt="Technical Digital Figma Design Dashboard" 
                className="mission-media-img" 
              />
              <div className="media-overlay-gradient"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutMission;
