import React from 'react';

export const AboutClosing = ({ triggerModal, navigateTo }) => {
  return (
    <section className="about-closing-section dark-gold-gradient text-center">
      <div className="container">
        <span className="section-subtitle">JOIN US</span>
        <h2 className="gold-text">Start Your Creative Journey Today</h2>
        <p>
          The digital economy is expanding rapidly. Whether you want to master design software, edit premium commercials, establish an independent freelancing studio, or grow a massive social community—Bawra Skill House provides the roadmap to succeed.
        </p>
        <div className="about-closing-actions">
          <button onClick={() => triggerModal('About Us Closing Page CTA')} className="btn btn-gold btn-large">Book Your Free Call</button>
          <button onClick={() => navigateTo('courses')} className="btn btn-outline-white btn-large">Explore Programs</button>
        </div>
      </div>
    </section>
  );
};

export default AboutClosing;
