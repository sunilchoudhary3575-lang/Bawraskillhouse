import React from 'react';
import Icons from '../Icons';

export const ModulesBreakdown = ({ triggerModal }) => {
  return (
    <section className="modules-breakdown">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">CURRICULUM MODULES</span>
          <h2 className="section-title">What You Will Learn?</h2>
        </div>

        <div className="modules-grid-courses">
          
          <div className="module-card glass">
            <div className="module-header-row">
              <div className="module-badge">Module 1</div>
              <Icons.Photoshop />
            </div>
            <h3>Photoshop</h3>
            <p>Photo Editing, Professional Retouching, Banner Layouts, and Social Media Posts creation.</p>
          </div>

          <div className="module-card glass">
            <div className="module-header-row">
              <div className="module-badge">Module 2</div>
              <Icons.Illustrator />
            </div>
            <h3>Illustrator</h3>
            <p>Logo Design, Vector Art construction, Brand Visual Identity, and Vector Illustrations.</p>
          </div>

          <div className="module-card glass">
            <div className="module-header-row">
              <div className="module-badge">Module 3</div>
              <Icons.Premiere />
            </div>
            <h3>Premiere Pro</h3>
            <p>Video Editing, Transitions, Sound Effects alignment, and YouTube Commercial layouts.</p>
          </div>

          <div className="module-card glass">
            <div className="module-header-row">
              <div className="module-badge">Module 4</div>
              <Icons.AfterEffects />
            </div>
            <h3>After Effects</h3>
            <p>Motion Graphics, Logo Animations, Keyframe styling, and Visual Effects.</p>
          </div>

          <div className="module-card glass">
            <div className="module-header-row">
              <div className="module-badge">Module 5</div>
              <Icons.Davinci />
            </div>
            <h3>DaVinci Resolve</h3>
            <p>Professional Color Grading, primary and secondary wheels, node workflow layouts.</p>
          </div>

        </div>

        <div className="demo-callout-box text-center glass">
          <h3>Want to book a free demo class?</h3>
          <p>Attend a live session, interact with trainers and get clarity.</p>
          <button onClick={() => triggerModal('Free Demo Class')} className="btn btn-gold">Book Free Class</button>
        </div>
      </div>
    </section>
  );
};

export default ModulesBreakdown;
