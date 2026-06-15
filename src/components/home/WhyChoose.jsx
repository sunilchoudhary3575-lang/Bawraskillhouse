import React from 'react';
import { useMedia } from '../../context/MediaContext';

export const WhyChoose = () => {
  const { media } = useMedia();

  return (
    <section className="why-choose-us">
      {/* Self-contained Brand Gradients */}
      <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="bawraNavyPink2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#003580" />
            <stop offset="100%" stopColor="#d11a5b" />
          </linearGradient>
          <linearGradient id="bawraPinkGold2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d11a5b" />
            <stop offset="100%" stopColor="#ff9a00" />
          </linearGradient>
          <linearGradient id="bawraNavyGold2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#003580" />
            <stop offset="100%" stopColor="#ff9a00" />
          </linearGradient>
          <linearGradient id="bawraPurplePink2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#800080" />
            <stop offset="100%" stopColor="#d11a5b" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">THE BAWRA EDGE</span>
          <h2 className="section-title">Why Choose Us?</h2>
        </div>

        <div className="why-grid-home">
          {/* Real Project Work */}
          <div className="why-card glass">
            <div className="why-card-bg-image" style={{ backgroundImage: `url(${media.heroWorkspace})` }}></div>
            <svg className="why-card-bg-shape" viewBox="0 0 120 120" fill="none">
              <rect x="20" y="30" width="80" height="60" rx="6" stroke="url(#bawraNavyPink2)" strokeWidth="1.2" strokeOpacity="0.25" fill="url(#bawraNavyPink2)" fillOpacity="0.03" />
              <line x1="20" y1="50" x2="100" y2="50" stroke="url(#bawraNavyPink2)" strokeWidth="1.2" strokeOpacity="0.2" />
              <circle cx="35" cy="40" r="3" fill="url(#bawraNavyPink2)" fillOpacity="0.3" />
              <circle cx="45" cy="40" r="3" fill="url(#bawraNavyPink2)" fillOpacity="0.3" />
              <circle cx="55" cy="40" r="3" fill="url(#bawraNavyPink2)" fillOpacity="0.3" />
              <rect x="30" y="60" width="25" height="20" rx="3" stroke="url(#bawraNavyPink2)" strokeWidth="1.2" strokeOpacity="0.2" />
              <rect x="65" y="60" width="25" height="20" rx="3" stroke="url(#bawraNavyPink2)" strokeWidth="1.2" strokeOpacity="0.2" />
            </svg>
            <div className="why-icon">💼</div>
            <h3>Real Project Work</h3>
            <p>Gain hands-on experience by working on real client project layouts and commercial briefings.</p>
          </div>

          {/* Internship Opportunity */}
          <div className="why-card glass">
            <div className="why-card-bg-image" style={{ backgroundImage: `url(${media.studioWorkstations})` }}></div>
            <svg className="why-card-bg-shape" viewBox="0 0 120 120" fill="none">
              <path d="M25 60 C25 40, 95 40, 95 60 C95 80, 25 80, 25 60 Z" stroke="url(#bawraPurplePink2)" strokeWidth="1.2" strokeOpacity="0.2" fill="url(#bawraPurplePink2)" fillOpacity="0.03" />
              <circle cx="45" cy="60" r="10" stroke="url(#bawraPurplePink2)" strokeWidth="1.2" strokeOpacity="0.2" />
              <circle cx="75" cy="60" r="10" stroke="url(#bawraPurplePink2)" strokeWidth="1.2" strokeOpacity="0.2" />
              <path d="M53 60 H 67" stroke="url(#bawraPurplePink2)" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round" />
            </svg>
            <div className="why-icon">🤝</div>
            <h3>Keep Learning & Interning</h3>
            <p>Top design candidates receive direct internship placements inside Bawra Creative Studio.</p>
          </div>

          {/* Portfolio Development */}
          <div className="why-card glass">
            <div className="why-card-bg-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=60')` }}></div>
            <svg className="why-card-bg-shape" viewBox="0 0 120 120" fill="none">
              <path d="M20 35 C20 30, 25 30, 30 30 H 45 L 55 40 H 95 C100 40, 100 45, 100 50 V 85 C100 90, 95 90, 95 85 H 30 C25 85, 20 85, 20 80 Z" stroke="url(#bawraNavyGold2)" strokeWidth="1.2" strokeOpacity="0.25" fill="url(#bawraNavyGold2)" fillOpacity="0.03" />
              <rect x="30" y="50" width="60" height="30" rx="3" stroke="url(#bawraNavyGold2)" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3,3" />
            </svg>
            <div className="why-icon">📁</div>
            <h3>Portfolio Development</h3>
            <p>Build high-end visual showcases on Behance and YouTube reels that grab employer attention.</p>
          </div>

          {/* Freelancing Guidance */}
          <div className="why-card glass">
            <div className="why-card-bg-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=60')` }}></div>
            <svg className="why-card-bg-shape" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="35" stroke="url(#bawraPinkGold2)" strokeWidth="1.2" strokeOpacity="0.25" fill="url(#bawraPinkGold2)" fillOpacity="0.03" />
              <ellipse cx="60" cy="60" rx="15" ry="35" stroke="url(#bawraPinkGold2)" strokeWidth="1" strokeOpacity="0.15" />
              <ellipse cx="60" cy="60" rx="35" ry="12" stroke="url(#bawraPinkGold2)" strokeWidth="1" strokeOpacity="0.15" />
              <line x1="25" y1="60" x2="95" y2="60" stroke="url(#bawraPinkGold2)" strokeWidth="1" strokeOpacity="0.15" />
              <line x1="60" y1="25" x2="60" y2="95" stroke="url(#bawraPinkGold2)" strokeWidth="1" strokeOpacity="0.15" />
            </svg>
            <div className="why-icon">🌍</div>
            <h3>Freelancing Guidance</h3>
            <p>Learn target pricing models, Upwork profile creation, cold pitch formulas, and client contracts.</p>
          </div>

          {/* Job Assistance Support */}
          <div className="why-card glass">
            <div className="why-card-bg-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=60')` }}></div>
            <svg className="why-card-bg-shape" viewBox="0 0 120 120" fill="none">
              <path d="M60 20 L80 65 L60 55 L40 65 Z" stroke="url(#bawraPurplePink2)" strokeWidth="1.2" strokeOpacity="0.25" fill="url(#bawraPurplePink2)" fillOpacity="0.03" />
              <path d="M60 55 V 95" stroke="url(#bawraPurplePink2)" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3,3" />
              <path d="M48 70 L35 85" stroke="url(#bawraPurplePink2)" strokeWidth="1.2" strokeOpacity="0.15" />
              <path d="M72 70 L85 85" stroke="url(#bawraPurplePink2)" strokeWidth="1.2" strokeOpacity="0.15" />
            </svg>
            <div className="why-icon">🚀</div>
            <h3>Job Assistance Support</h3>
            <p>Direct resume updates, interview mock rounds, and hiring recommendations to top studios.</p>
          </div>

          {/* Certificate of Completion */}
          <div className="why-card glass">
            <div className="why-card-bg-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=60')` }}></div>
            <svg className="why-card-bg-shape" viewBox="0 0 120 120" fill="none">
              <polygon points="60,20 100,40 60,60 20,40" stroke="url(#bawraNavyPink2)" strokeWidth="1.2" strokeOpacity="0.25" fill="url(#bawraNavyPink2)" fillOpacity="0.03" />
              <path d="M35 48 V 75 C35 88, 85 88, 85 75 V 48" stroke="url(#bawraNavyPink2)" strokeWidth="1.2" strokeOpacity="0.2" />
              <path d="M100 40 V 70 L 93 67 L 100 70 Z" stroke="url(#bawraNavyPink2)" strokeWidth="1.2" strokeOpacity="0.2" />
            </svg>
            <div className="why-icon">🎓</div>
            <h3>Certificate of Completion</h3>
            <p>Receive a Bawra Skill House verified certification to validate your skill set.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
