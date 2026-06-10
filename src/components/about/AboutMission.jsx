import React from 'react';

export const AboutMission = () => {
  return (
    <section className="about-mission-section">
      <div className="container mission-vision-grid">
        <div className="mission-card-about glass">
          <div className="card-icon-halo">🎯</div>
          <h3>Our Mission</h3>
          <p>
            To bridge the massive gap between traditional academic systems and real-world execution. We champion employability, creative independence, and creator-driven learning, ensuring every student acquires monetization skills.
          </p>
        </div>
        <div className="mission-card-about glass border-accent-gold">
          <div className="card-icon-halo">👁️</div>
          <h3>Our Vision</h3>
          <p>
            To establish Bawra Skill House as India's leading skill-development ecosystem, equipping the country's youth with the tools to innovate, create, and secure successful careers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
