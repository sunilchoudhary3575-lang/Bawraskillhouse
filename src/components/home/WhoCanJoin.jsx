import React from 'react';

export const WhoCanJoin = () => {
  return (
    <section className="who-can-join-section">
      {/* Shared Brand Gradients */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="bawraNavyPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#003580" />
            <stop offset="100%" stopColor="#d11a5b" />
          </linearGradient>
          <linearGradient id="bawraPinkGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d11a5b" />
            <stop offset="100%" stopColor="#ff9a00" />
          </linearGradient>
          <linearGradient id="bawraNavyGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#003580" />
            <stop offset="100%" stopColor="#ff9a00" />
          </linearGradient>
          <linearGradient id="bawraPurplePink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#800080" />
            <stop offset="100%" stopColor="#d11a5b" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">ELIGIBILITY</span>
          <h2 className="section-title">Who Can Join?</h2>
          <p className="section-desc">Our training program is designed to support diverse career paths.</p>
        </div>

        <div className="who-can-join-grid">
          {/* Students */}
          <div className="join-card glass student-card">
            <svg className="join-card-bg-shape" viewBox="0 0 120 120" fill="none">
              <path d="M60 25 L105 45 L60 65 L15 45 Z" fill="url(#bawraNavyPink)" fillOpacity="0.05" stroke="url(#bawraNavyPink)" strokeWidth="1.2" strokeOpacity="0.2" />
              <path d="M30 51.5 L30 75 C30 90, 90 90, 90 75 L90 51.5" stroke="url(#bawraNavyPink)" strokeWidth="1.2" strokeOpacity="0.2" />
              <path d="M105 45 L105 75 C105 77, 103 79, 100 79" stroke="url(#bawraNavyPink)" strokeWidth="1.2" strokeOpacity="0.2" />
              <circle cx="100" cy="79" r="2" fill="url(#bawraNavyPink)" fillOpacity="0.3" />
            </svg>
            <div className="join-icon">🎓</div>
            <h3>Students</h3>
            <p>Enhance your college credentials and build an early source of visual income.</p>
          </div>

          {/* Freelancers */}
          <div className="join-card glass freelancer-card">
            <svg className="join-card-bg-shape" viewBox="0 0 120 120" fill="none">
              <rect x="20" y="30" width="80" height="50" rx="4" stroke="url(#bawraPurplePink)" strokeWidth="1.2" strokeOpacity="0.2" fill="url(#bawraPurplePink)" fillOpacity="0.03" />
              <path d="M15 80 L105 80 L110 88 L10 88 Z" fill="url(#bawraPurplePink)" fillOpacity="0.08" stroke="url(#bawraPurplePink)" strokeWidth="1.2" strokeOpacity="0.2" />
              <circle cx="60" cy="84" r="2" fill="url(#bawraPurplePink)" fillOpacity="0.3" />
              <path d="M30 42 H 45 M30 52 H 65 M30 62 H 50" stroke="url(#bawraPurplePink)" strokeWidth="1.2" strokeOpacity="0.2" strokeLinecap="round" />
            </svg>
            <div className="join-icon">💻</div>
            <h3>Freelancers</h3>
            <p>Scale your client retainers, expand your service suite, and earn in foreign currency.</p>
          </div>

          {/* Business Owners */}
          <div className="join-card glass business-card">
            <svg className="join-card-bg-shape" viewBox="0 0 120 120" fill="none">
              <path d="M20 95 L20 70 M45 95 L45 50 M70 95 L70 35 M95 95 L95 15" stroke="url(#bawraNavyGold)" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.12" />
              <path d="M20 70 L45 50 L70 35 L95 15" stroke="url(#bawraNavyGold)" strokeWidth="1.5" strokeOpacity="0.25" strokeLinecap="round" />
              <circle cx="95" cy="15" r="3" fill="#ff9a00" fillOpacity="0.5" />
            </svg>
            <div className="join-icon">💼</div>
            <h3>Business Owners</h3>
            <p>Design your own brand creatives and edit commercial video ads without outsourcing.</p>
          </div>

          {/* Content Creators */}
          <div className="join-card glass creator-card">
            <svg className="join-card-bg-shape" viewBox="0 0 120 120" fill="none">
              <polygon points="45,35 90,60 45,85" fill="url(#bawraPinkGold)" fillOpacity="0.06" stroke="url(#bawraPinkGold)" strokeWidth="1.5" strokeOpacity="0.25" strokeLinejoin="round" />
              <rect x="15" y="15" width="20" height="20" rx="3" stroke="url(#bawraPinkGold)" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="3,3" />
              <rect x="85" y="85" width="20" height="20" rx="3" stroke="url(#bawraPinkGold)" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="3,3" />
            </svg>
            <div className="join-icon">✨</div>
            <h3>Content Creators</h3>
            <p>Level up your social media presence, edit professional YouTube content, and craft thumbnails.</p>
          </div>

          {/* Unemployed Youth */}
          <div className="join-card glass youth-card">
            <svg className="join-card-bg-shape" viewBox="0 0 120 120" fill="none">
              <path d="M85 30 L45 70 M85 30 L65 35 M85 30 L80 50" stroke="url(#bawraNavyPink)" strokeWidth="1.5" strokeOpacity="0.25" strokeLinecap="round" />
              <path d="M30 90 C35 75, 45 60, 85 30" stroke="url(#bawraNavyPink)" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="3,3" />
              <path d="M25 95 C30 95, 35 90, 30 85 C25 80, 20 85, 25 95 Z" fill="url(#bawraNavyPink)" fillOpacity="0.08" stroke="url(#bawraNavyPink)" strokeWidth="1" strokeOpacity="0.15" />
            </svg>
            <div className="join-icon">🚀</div>
            <h3>Unemployed Youth</h3>
            <p>Gain high-demand practical creative skills and land direct agency placements.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoCanJoin;
