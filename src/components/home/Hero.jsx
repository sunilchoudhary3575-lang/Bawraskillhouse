import React, { useState, useRef, useEffect } from 'react';
import Icons from '../Icons';
import { useMedia } from '../../context/MediaContext';

export const Hero = ({ triggerModal, showPreloader }) => {
  const { media } = useMedia();
  const iframeRef = useRef(null);
  const sectionRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCcOn, setIsCcOn] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          if (!entry.isIntersecting) {
            // Pause video when scrolled out of view
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ event: 'command', func: 'pauseVideo' }),
              '*'
            );
          }
        }
      },
      {
        threshold: 0.1 // Trigger when at least 10% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleMute = () => {
    if (iframeRef.current) {
      const command = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command }),
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

  const toggleCc = () => {
    if (iframeRef.current) {
      const command = isCcOn ? 'unloadModule' : 'loadModule';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: ['captions'] }),
        '*'
      );
      setIsCcOn(!isCcOn);
    }
  };

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="container hero-grid">
        <div className="hero-text-top">
          <div className="academy-badge">
            Jodhpur, Rajasthan · Offline · Practical · Career-Ready
          </div>
          <h1 className="hero-headline">
            RAJASTHAN'S #1<br />
            <span className="gold-text">SKILL HOUSE</span>
          </h1>
          <p className="hero-subheadline">
            Welcome to Bawra Skill House.
            We provide practical, industry-focused training.
            Learn from expert mentors with hands-on experience.
            Build skills, grow confidently, and achieve success.
          </p>

          {/* Infinite News Ticker */}
          <div className="hero-ticker-container vertical">
            <div className="hero-ticker-vertical-wrapper">
              <div className="hero-ticker-vertical-line">
                <span className="separator">✦</span> <span className="highlight">Sirf Degree Nahi — Skill Chahiye.</span>
              </div>
              <div className="hero-ticker-vertical-line">
                <span className="separator">✦</span> <span className="highlight">Rajasthan ka Pehla Institute Jahan Aap Sikhte Nahi — Banate Ho.</span>
              </div>

              {/* Duplicate for seamless vertical loop */}
              <div className="hero-ticker-vertical-line">
                <span className="separator">✦</span> <span className="highlight">Sirf Degree Nahi — Skill Chahiye.</span>
              </div>
              <div className="hero-ticker-vertical-line">
                <span className="separator">✦</span> <span className="highlight">Rajasthan ka Pehla Institute Jahan Aap Sikhte Nahi — Banate Ho.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-media-wrapper">
          <div className="hero-frame" style={{ position: 'relative' }}>
            {!showPreloader ? (
              <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/VvEc6b_nwgY?autoplay=0&mute=0&loop=1&playlist=VvEc6b_nwgY&controls=1&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1"
                title="Bawra Skill House Intro Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: 'none', display: 'block' }}
              ></iframe>
            ) : (
              <div style={{ width: '100%', height: '100%', background: '#000' }}></div>
            )}
            <button 
              onClick={toggleMute} 
              className="hero-mute-btn"
              aria-label={isMuted ? "Unmute Video" : "Mute Video"}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
            <button 
              onClick={toggleCc} 
              className="hero-cc-btn"
              style={{
                color: isCcOn ? 'var(--gold-primary)' : '#fff',
                borderColor: isCcOn ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.2)',
                boxShadow: isCcOn ? '0 0 15px rgba(255, 154, 0, 0.35)' : 'none'
              }}
              aria-label={isCcOn ? "Turn Off Captions" : "Turn On Captions"}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="hero-bottom-content">
          <div className="hero-actions">
            <button onClick={() => triggerModal('General Consultation')} className="btn btn-primary">Enroll Now</button>
            <button onClick={() => triggerModal('Brochure Request')} className="btn btn-outline">
              Watch Inside Classes <Icons.ArrowRight />
            </button>
          </div>

          {/* Floating Tools Badges */}
          <div className="software-integration">
            <span className="software-label">Tools We Teach:</span>
            <div className="software-icons-list">
              <div className="software-item-badge"><Icons.Photoshop /></div>
              <div className="software-item-badge"><Icons.Illustrator /></div>
              <div className="software-item-badge"><Icons.Premiere /></div>
              <div className="software-item-badge"><Icons.AfterEffects /></div>
              <div className="software-item-badge"><Icons.Davinci /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
