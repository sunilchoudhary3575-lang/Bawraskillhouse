import React, { useState, useRef, useEffect } from 'react';
import Icons from '../Icons';

export const Hero = ({ triggerModal, showPreloader }) => {
  const iframeRef = useRef(null);
  const sectionRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

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
            setIsPlaying(false);
          } else {
            // Resume play when visible
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({ event: 'command', func: 'playVideo' }),
              '*'
            );
            setIsPlaying(true);
          }
        }
      },
      {
        threshold: 0.15
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
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command }),
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

  return (
    <section ref={sectionRef} className="hero-cinematic-section">
      {/* Full-bleed Video Background */}
      <div className="hero-video-banner-wrap">
        {!showPreloader ? (
          <iframe
            ref={iframeRef}
            className="hero-cinematic-iframe"
            src="https://www.youtube-nocookie.com/embed/OI2UoFly6DQ?autoplay=1&mute=1&loop=1&playlist=OI2UoFly6DQ&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&fs=0"
            title="Bawra Skill House Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="hero-video-preloader-bg"></div>
        )}

        {/* Top gradient overlay for seamless floating navbar readability */}
        <div className="hero-video-top-gradient-overlay"></div>

        {/* Bottom gradient overlay to make buttons super readable */}
        <div className="hero-video-gradient-overlay"></div>

        {/* Floating Action Buttons directly overlaid on the video */}
        <div className="hero-cinematic-actions">
          <button onClick={() => triggerModal('General Consultation')} className="btn btn-primary hero-btn-glow">
            Enroll Now
          </button>
          <button onClick={() => triggerModal('Brochure Request')} className="btn btn-outline hero-btn-light">
            Watch Inside Classes <Icons.ArrowRight />
          </button>
        </div>

        {/* Media Controls (Sound Toggle) */}
        <div className="hero-video-controls">
          <button 
            type="button"
            onClick={toggleMute} 
            className="hero-control-pill"
            aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
            title={isMuted ? "Turn Sound On" : "Mute Sound"}
          >
            {isMuted ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
                <span>Sound Off</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
                <span>Sound On</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
