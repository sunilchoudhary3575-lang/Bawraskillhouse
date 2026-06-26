import React, { useState, useRef, useEffect } from 'react';

export const TestimonialContent = ({ triggerModal, navigateTo }) => {
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);
  const trackRef = useRef(null);

  const scrollVideo = (direction) => {
    if (trackRef.current) {
      const { scrollLeft } = trackRef.current;
      const scrollAmount = 340; // Card width + gap
      const target = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      trackRef.current.scrollTo({ left: target, behavior: 'smooth' });
    }
  };

  const handlePlayVideo = (index) => {
    setPlayingVideoIndex(index);
  };

  const handlePauseVideo = (index) => {
    setPlayingVideoIndex(null);
  };

  useEffect(() => {
    if (playingVideoIndex === null) return;

    const handleWindowScroll = () => {
      handlePauseVideo(playingVideoIndex);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [playingVideoIndex]);

  // Intersection Observer for scroll reveal animations on Testimonial page
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.02
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const videoStories = [
    { id: 0, title: 'Transformation Story 1', youtubeId: 'zp9I0peykis', duration: '0:50' },
    { id: 1, title: 'Transformation Story 2', youtubeId: '1qg3ch0z0VU', duration: '0:45' },
    { id: 2, title: 'Transformation Story 3', youtubeId: 'yASTsyAB654', duration: '0:58' },
    { id: 3, title: 'Transformation Story 4', youtubeId: 'SAHI74b1M7M', duration: '0:40' },
    { id: 4, title: 'Transformation Story 5', youtubeId: 'NDbRbwHEME8', duration: '0:55' },
    { id: 5, title: 'Transformation Story 6', youtubeId: '3PptQptCYOg', duration: '0:50' },
    { id: 6, title: 'Transformation Story 7', youtubeId: 'mzsOljOyQLI', duration: '0:48' },
    { id: 7, title: 'Transformation Story 8', youtubeId: 'jXtyKGn752w', duration: '0:52' }
  ];
  return (
    <>
      {/* Intro Section: Woh Aaye The Seekhne — Gaye Career Lekar. */}
      <section className="testimonial-intro-section" style={{ paddingTop: '120px' }}>
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

            <div className="transformation-journey-container">
              <div className="journey-step-card step-zero reveal-on-scroll">
                <div className="journey-badge-glow bg-red"></div>
                <div className="journey-step-num">01</div>
                <div className="journey-icon-wrap">
                  <span className="journey-icon">🌱</span>
                </div>
                <h3>Zero Experience</h3>
                <p>Started from scratch. No knowledge of editing, design, or camera rigging — just a passion to learn.</p>
              </div>

              <div className="journey-arrow reveal-on-scroll">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </div>

              <div className="journey-step-card step-learning reveal-on-scroll">
                <div className="journey-badge-glow bg-gold"></div>
                <div className="journey-step-num">02</div>
                <div className="journey-icon-wrap">
                  <span className="journey-icon">⚡</span>
                </div>
                <h3>The Bawra Grind</h3>
                <p>Hands-on work with cameras, drones, advanced software, and daily client projects under expert supervision.</p>
              </div>

              <div className="journey-arrow reveal-on-scroll">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </div>

              <div className="journey-step-card step-ready reveal-on-scroll">
                <div className="journey-badge-glow bg-blue"></div>
                <div className="journey-step-num">03</div>
                <div className="journey-icon-wrap">
                  <span className="journey-icon">🚀</span>
                </div>
                <h3>Career Ready</h3>
                <p>Graduated with a premium professional portfolio, corporate internships, and high-ticket freelancing clients.</p>
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

          {/* Video Carousel Wrapper */}
          <div className="video-carousel-wrapper">
            <button className="slider-arrow arrow-left" onClick={() => scrollVideo('left')} aria-label="Slide Left">‹</button>
            <button className="slider-arrow arrow-right" onClick={() => scrollVideo('right')} aria-label="Slide Right">›</button>

            <div ref={trackRef} className="video-carousel-track">
              {videoStories.map((story, index) => {
                const isPlaying = playingVideoIndex === index;
                return (
                  <div 
                    key={story.id} 
                    className={`video-story-card glass ${isPlaying ? 'video-playing' : ''}`}
                    onClick={() => {
                      if (isPlaying) {
                        handlePauseVideo(index);
                      } else {
                        handlePlayVideo(index);
                      }
                    }}
                  >
                    <div className="video-thumbnail-wrapper">
                      {isPlaying ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${story.youtubeId}?autoplay=1&mute=0&rel=0&controls=0&modestbranding=1&iv_load_policy=3`}
                          title={story.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          onClick={(e) => e.stopPropagation()}
                          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                        ></iframe>
                      ) : (
                        <>
                          <img 
                            src={`https://img.youtube.com/vi/${story.youtubeId}/hqdefault.jpg`} 
                            alt={story.title} 
                            className="video-thumbnail-img"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            loading="lazy"
                          />
                          <div className="play-button-overlay">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon-svg">
                              <polygon points="8,5 19,12 8,19" />
                            </svg>
                          </div>
                          <span className="video-duration">{story.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
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
            <button onClick={() => triggerModal('Enquiry')} className="btn btn-outline-white btn-large">
              Enquiry
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialContent;
