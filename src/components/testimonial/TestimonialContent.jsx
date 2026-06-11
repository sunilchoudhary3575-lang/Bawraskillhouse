import React from 'react';
import { useMedia } from '../../context/MediaContext';

export const TestimonialContent = ({ triggerModal, navigateTo }) => {
  const { media } = useMedia();
  return (
    <>
      <section className="breadcrumb-banner">
        <div className="container text-center">
          <h1>Student Testimonials</h1>
          <p className="breadcrumb-path">
            <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Home</span> &gt; Testimonials
          </p>
        </div>
      </section>

      {/* Intro Section: Woh Aaye The Seekhne — Gaye Career Lekar. */}
      {/* Intro Section: Woh Aaye The Seekhne — Gaye Career Lekar. */}
      <section className="testimonial-intro-section">
        <div className="container testimonial-intro-grid">
          <div className="testimonial-intro-text">
            <span className="section-subtitle">REAL TRANSFORMATIONS</span>
            <h2 className="section-title">
              Woh Aaye The Seekhne — Gaye Career Lekar.
            </h2>
            <p className="section-desc">
              Sunno unhe jo pehle yahan the — aur aaj industry mein kaam kar rahe hain.
            </p>
            <p className="section-paragraph">
              Bawra Skill House is not just about learning software; it is about building sustainable digital careers. Read and listen to the real stories of our students who transitioned from zero experience to industry-ready creative professionals.
            </p>
          </div>

          <div className="testimonial-intro-graphic">
            <div className="premium-graphic-wrapper">
              <svg className="intro-svg-graphic" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff9a00" />
                    <stop offset="100%" stopColor="#d4a017" />
                  </linearGradient>
                  <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff416c" />
                    <stop offset="100%" stopColor="#ff4b2b" />
                  </linearGradient>
                  <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00c6ff" />
                    <stop offset="100%" stopColor="#0072ff" />
                  </linearGradient>
                  <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.07)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="12" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="rgba(0,0,0,0.15)" />
                  </filter>
                </defs>

                {/* Background decorative grid/circles */}
                <circle cx="250" cy="200" r="160" stroke="rgba(212,160,23,0.08)" strokeWidth="1" strokeDasharray="4 8" />
                <circle cx="250" cy="200" r="110" stroke="rgba(255,65,108,0.06)" strokeWidth="1" />
                <path d="M 90,200 L 410,200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5 5" />
                <path d="M 250,40 L 250,360" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="5 5" />

                {/* Animated connecting neural/career pathways */}
                <path className="path-glow" d="M 120,260 Q 250,150 380,120" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.6" strokeDasharray="6 6" />
                <path className="path-glow-alt" d="M 110,130 Q 250,250 370,280" stroke="url(#pinkGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.4" strokeDasharray="4 4" />

                {/* Interactive Node 1: Zero Experience */}
                <g transform="translate(100, 260)">
                  <g className="graphic-node node-zero">
                    <circle cx="0" cy="0" r="32" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" filter="url(#shadow)" />
                    <circle cx="0" cy="0" r="24" fill="rgba(255,65,108,0.1)" />
                    <circle cx="0" cy="0" r="8" fill="#ff416c" filter="url(#glow)" />
                    <text x="0" y="48" fill="var(--text-secondary)" fontSize="11" fontWeight="700" textAnchor="middle">ZERO EXP</text>
                    <text x="0" y="4" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">0</text>
                  </g>
                </g>

                {/* Interactive Node 2: Skill Growth */}
                <g transform="translate(250, 150)">
                  <g className="graphic-node node-mid">
                    <circle cx="0" cy="0" r="40" fill="url(#cardGrad)" stroke="var(--border-gold)" strokeWidth="1" filter="url(#shadow)" />
                    <circle cx="0" cy="0" r="32" fill="rgba(212,160,23,0.08)" />
                    <g transform="translate(-12, -12) scale(1)">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="url(#goldGrad)" />
                    </g>
                    <text x="0" y="58" fill="var(--gold-primary)" fontSize="12" fontWeight="800" textAnchor="middle">SKILL HOUSE</text>
                  </g>
                </g>

                {/* Interactive Node 3: Industry Ready */}
                <g transform="translate(380, 120)">
                  <g className="graphic-node node-career">
                    <circle cx="0" cy="0" r="36" fill="url(#cardGrad)" stroke="rgba(0,198,255,0.2)" strokeWidth="1" filter="url(#shadow)" />
                    <circle cx="0" cy="0" r="28" fill="rgba(0,198,255,0.1)" />
                    <g transform="translate(-10, -10) scale(0.8)">
                      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" fill="url(#blueGrad)" />
                    </g>
                    <text x="0" y="52" fill="var(--text-secondary)" fontSize="11" fontWeight="700" textAnchor="middle">CAREER READY</text>
                  </g>
                </g>

                {/* Floating tags */}
                <g transform="translate(140, 80)">
                  <g className="floating-tag tag-editor">
                    <rect x="0" y="0" width="100" height="28" rx="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <text x="50" y="18" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle">🎬 Video Editor</text>
                  </g>
                </g>

                <g transform="translate(290, 240)">
                  <g className="floating-tag tag-designer">
                    <rect x="0" y="0" width="115" height="28" rx="14" fill="rgba(255,255,255,0.05)" stroke="var(--border-gold)" strokeWidth="0.8" />
                    <text x="57.5" y="18" fill="var(--gold-primary)" fontSize="10" fontWeight="700" textAnchor="middle">🎨 Brand Designer</text>
                  </g>
                </g>

                <g transform="translate(60, 140)">
                  <g className="floating-tag tag-freelancer">
                    <rect x="0" y="0" width="95" height="28" rx="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <text x="47.5" y="18" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle">💼 Freelancing</text>
                  </g>
                </g>

                {/* Growth spark lines */}
                <path d="M 235,110 L 225,90" stroke="var(--gold-primary)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                <path d="M 265,110 L 275,90" stroke="var(--gold-primary)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                <circle cx="225" cy="90" r="2" fill="var(--gold-primary)" />
                <circle cx="275" cy="90" r="2" fill="var(--gold-primary)" />
              </svg>

              <div className="graphic-stat-card glass">
                <div className="stat-glow"></div>
                <div className="stat-header">
                  <span className="dot pink-dot"></span>
                  <span className="dot gold-dot"></span>
                  <span className="dot blue-dot"></span>
                </div>
                <div className="stat-body">
                  <p className="stat-label">Transformation Rate</p>
                  <p className="stat-value">100% Practical</p>
                  <div className="stat-bar-container">
                    <div className="stat-bar-fill"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section: Videos & Gallery */}
      <section className="testimonial-video-showcase" style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
            <span className="section-subtitle">Real Student Transformations</span>
            <h2 className="section-title">Videos & Gallery</h2>
            <p className="section-desc" style={{ maxWidth: '650px', margin: '0 auto' }}>
              Hear directly from our alumni who started from scratch and are now working with leading brands or building high-paying freelance careers.
            </p>
          </div>

          {/* Unified 6 Video Cards Grid */}
          <div className="video-stories-grid">

            {/* Student 1 */}
            <div className="video-story-card glass" onClick={() => triggerModal('Video Story: Arjun Sharma')}>
              <div className="video-thumbnail-wrapper">
                <video src={media.video_arjun} preload="metadata" muted style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}></video>
                <div className="play-button-overlay">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon-svg">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                </div>
                <span className="video-duration">3:20</span>
              </div>
            </div>

            {/* Student 2 */}
            <div className="video-story-card glass" onClick={() => triggerModal('Video Story: Priya Rathore')}>
              <div className="video-thumbnail-wrapper">
                <video src={media.video_priya} preload="metadata" muted style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}></video>
                <div className="play-button-overlay">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon-svg">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                </div>
                <span className="video-duration">2:50</span>
              </div>
            </div>

            {/* Student 3 */}
            <div className="video-story-card glass" onClick={() => triggerModal('Video Story: Vikram Panwar')}>
              <div className="video-thumbnail-wrapper">
                <video src={media.video_vikram} preload="metadata" muted style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}></video>
                <div className="play-button-overlay">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon-svg">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                </div>
                <span className="video-duration">4:10</span>
              </div>
            </div>

            {/* Student 5 */}
            <div className="video-story-card glass" onClick={() => triggerModal('Video Story: Karan Bhati')}>
              <div className="video-thumbnail-wrapper">
                <video src={media.video_karan} preload="metadata" muted style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}></video>
                <div className="play-button-overlay">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon-svg">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                </div>
                <span className="video-duration">4:45</span>
              </div>
            </div>

            {/* Student 6 */}
            <div className="video-story-card glass" onClick={() => triggerModal('Video Story: Anjali Sharma')}>
              <div className="video-thumbnail-wrapper">
                <video src={media.video_anjali} preload="metadata" muted style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}></video>
                <div className="play-button-overlay">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon-svg">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                </div>
                <span className="video-duration">3:40</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Students Succeed Section */}
      <section className="why-succeed-section">
        <div className="container text-center">
          <div className="section-header text-center">
            <span className="section-subtitle">THE SUCCESS FORMULA</span>
            <h2 className="section-title">Why Students Succeed</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              We don't teach topics. We train creators to work, sell, and build. Here is what makes the Bawra edge.
            </p>
          </div>

          <div className="why-succeed-grid">
            <div className="why-succeed-card glass">
              <span className="why-succeed-card-icon">🎯</span>
              <h4>Practical Learning</h4>
              <p>Forget dry theoretical notes. From day one, you sit with software, building actual projects and designs.</p>
            </div>
            <div className="why-succeed-card glass">
              <span className="why-succeed-card-icon">💼</span>
              <h4>Real Client Projects</h4>
              <p>Work on live briefs and actual marketing budgets to build execution confidence for corporate clients.</p>
            </div>
            <div className="why-succeed-card glass">
              <span className="why-succeed-card-icon">⚡</span>
              <h4>Industry Mentorship</h4>
              <p>Get mentored directly by Rawal Singh and expert creators who active in the creative media sector.</p>
            </div>
            <div className="why-succeed-card glass">
              <span className="why-succeed-card-icon">🎥</span>
              <h4>Professional Equipment</h4>
              <p>Get hands-on training with high-end DSLRs, mirrorless cameras, heavy gimbals, and drone gear.</p>
            </div>
            <div className="why-succeed-card glass">
              <span className="why-succeed-card-icon">📂</span>
              <h4>Portfolio Building</h4>
              <p>Create a robust, ready-to-present professional portfolio that proves your capabilities to agencies.</p>
            </div>
            <div className="why-succeed-card glass">
              <span className="why-succeed-card-icon">📈</span>
              <h4>Freelance Guidance</h4>
              <p>Learn client pitching, proposal writing, retainer pricing strategies, and landing international deals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion / CTA Section */}
      <section className="closing-cta-testimonial">
        <div className="portfolio-conversion-banner dark-gold-gradient text-center">
          <h2>
            Agla Success Story Tumhari Ho Sakti Hai.
          </h2>
          <p>
            Aaj jo students screen par nazar aa rahe hain, kal tak woh bhi ek shuruaat kar rahe the. Bas pehla kadam uthao — baaki Bawra Skillhouse sambhaal lega.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => triggerModal('General Consultation')} className="btn btn-gold btn-large">
              Enroll Today
            </button>
            <button onClick={() => triggerModal('Inquiry')} className="btn btn-outline-white btn-large">
              Inquiry
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialContent;
