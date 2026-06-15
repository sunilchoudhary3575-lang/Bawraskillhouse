import React, { useState, useEffect, useRef } from 'react';

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing: easeOutQuad
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * end);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

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
          {/* Card 1: 500K+ YouTube Community */}
          <div className="milestone-card glass">
            <div className="milestone-icon">👥</div>
            <div className="milestone-num">
              <CountUp end={500} suffix="K+" />
            </div>
            <h4>YouTube Community</h4>
            <p>A thriving online community learning creative skills daily.</p>
            {/* SVG Background Icon */}
            <svg className="milestone-bg-icon youtube-bg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>

          {/* Card 2: Silver Play Button */}
          <div className="milestone-card glass">
            <div className="milestone-icon">🥈</div>
            <div className="milestone-num">Silver Play</div>
            <h4>Button Recipient</h4>
            <p>Recognized by YouTube for crossing the 100K subscriber benchmark.</p>
            {/* SVG Background Icon */}
            <svg className="milestone-bg-icon silver-play-bg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>

          {/* Card 3: 6+ National Awards */}
          <div className="milestone-card glass">
            <div className="milestone-icon">🏆</div>
            <div className="milestone-num">
              <CountUp end={6} suffix="+" />
            </div>
            <h4>National Awards</h4>
            <p>Honored nationally for outstanding digital content creation.</p>
            {/* SVG Background Icon */}
            <svg className="milestone-bg-icon award-bg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 4 4.9V19H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-3v-4.1a5 5 0 0 0 4-4.9V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v3a3 3 0 0 1-6 0V7zm-4 0a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4h1a6 6 0 0 1-4-5V8a1 1 0 0 0 0-1zm16 1v1a6 6 0 0 1-4 5h1a4 4 0 0 0 4-4V8a1 1 0 0 0-1-1 1 1 0 0 0-1 1z"/>
            </svg>
          </div>

          {/* Card 4: Rajasthan Govt */}
          <div className="milestone-card glass">
            <div className="milestone-icon">🏛️</div>
            <div className="milestone-num">Rajasthan Govt</div>
            <h4>Official Recognition</h4>
            <p>State-level creator recognition for educational impact.</p>
            {/* SVG Background Icon */}
            <svg className="milestone-bg-icon govt-bg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          </div>

          {/* Card 5: PM Invited */}
          <div className="milestone-card glass">
            <div className="milestone-icon">🇮🇳</div>
            <div className="milestone-num">PM Invited</div>
            <h4>Narendra Modi</h4>
            <p>Personally invited for PM Modi's National Creator Recognition.</p>
            {/* SVG Background Icon */}
            <svg className="milestone-bg-icon pm-bg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>

          {/* Card 6: 25+ Team Members */}
          <div className="milestone-card glass">
            <div className="milestone-icon">👥</div>
            <div className="milestone-num">
              <CountUp end={25} suffix="+" />
            </div>
            <h4>Team Members</h4>
            <p>Expert designers, editing curators, and support staff.</p>
            {/* SVG Background Icon */}
            <svg className="milestone-bg-icon team-bg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </div>

          {/* Card 7: City Campuses */}
          <div className="milestone-card glass milestone-wide">
            <div className="milestone-icon">🏢</div>
            <div className="milestone-num">
              <CountUp end={2} />
            </div>
            <h4>City Campuses</h4>
            <p>State-of-the-art physical workspaces for classroom education.</p>
            {/* SVG Background Icon */}
            <svg className="milestone-bg-icon campus-bg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMilestones;
