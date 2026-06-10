import React from 'react';

export const AboutMilestones = () => {
  return (
    <section className="about-milestones-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">MILESTONES</span>
          <h2 className="section-title">Key Milestones</h2>
          <p className="section-desc">Key metrics and recognitions that validate our visual journey and student impact.</p>
        </div>

        <div className="milestones-grid">
          <div className="milestone-card glass">
            <div className="milestone-icon">👥</div>
            <div className="milestone-num">500K+</div>
            <h4>YouTube Community</h4>
            <p>A thriving online community learning creative skills daily.</p>
          </div>

          <div className="milestone-card glass">
            <div className="milestone-icon">🥈</div>
            <div className="milestone-num">Silver Play</div>
            <h4>Button Recipient</h4>
            <p>Recognized by YouTube for crossing the 100K subscriber benchmark.</p>
          </div>

          <div className="milestone-card glass">
            <div className="milestone-icon">🏆</div>
            <div className="milestone-num">6+</div>
            <h4>National Awards</h4>
            <p>Honored nationally for outstanding digital content creation.</p>
          </div>

          <div className="milestone-card glass">
            <div className="milestone-icon">🏛️</div>
            <div className="milestone-num">Rajasthan Govt</div>
            <h4>Official Recognition</h4>
            <p>State-level creator recognition for educational impact.</p>
          </div>

          <div className="milestone-card glass">
            <div className="milestone-icon">🇮🇳</div>
            <div className="milestone-num">PM Invited</div>
            <h4>Narendra Modi</h4>
            <p>Personally invited for PM Modi's National Creator Recognition.</p>
          </div>

          <div className="milestone-card glass">
            <div className="milestone-num">25+</div>
            <h4>Team Members</h4>
            <p>Expert designers, editing curators, and support staff.</p>
          </div>

          <div className="milestone-card glass milestone-wide">
            <div className="milestone-icon">🏢</div>
            <div className="milestone-num">2</div>
            <h4>City Campuses</h4>
            <p>State-of-the-art physical workspaces for classroom education.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMilestones;
