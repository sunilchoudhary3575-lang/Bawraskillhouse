import React, { useState, useEffect } from 'react';
import { useMedia } from '../../context/MediaContext';

export const Welcome = ({ navigateTo }) => {
  const { media } = useMedia();
  const slideshowImages = [media.welcome1, media.welcome2, media.welcome3, media.welcome4, media.welcome5];
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  return (
    <section className="welcome-section">
      <div className="container welcome-grid">
        <div
          className="welcome-image-frame"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {slideshowImages.map((imgSrc, idx) => (
            <img
              key={idx}
              src={imgSrc}
              alt={`Bawra Classroom Scene ${idx + 1}`}
              className={`welcome-image welcome-slide ${idx === currentSlide ? 'active' : ''}`}
            />
          ))}

          {/* Navigation Arrows */}
          <button className="slideshow-arrow prev" onClick={handlePrev} aria-label="Previous Slide">
            ‹
          </button>
          <button className="slideshow-arrow next" onClick={handleNext} aria-label="Next Slide">
            ›
          </button>

          {/* Dot Indicators */}
          <div className="slideshow-dots">
            {slideshowImages.map((_, idx) => (
              <span
                key={idx}
                className={`slideshow-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              ></span>
            ))}
          </div>
        </div>
        <div className="welcome-text">
          <span className="section-subtitle">WELCOME TO ACADEMY</span>
          <h2>Welcome to Bawra Skill House</h2>
          <p>
            Ek aisa jagah jahan passion ko profession mein badla jaata hai. Bawra Skillhouse mein sirf theory nahi hoti — yahan real projects hote hain, real mentors hote hain, aur real results milte hain. Offline classes. Hands-on training. Jodhpur, Rajasthan.
          </p>
          <ul className="welcome-points">
            <li><span className="bullet-dot"></span> Expert Trainers</li>
            <li><span className="bullet-dot"></span> Real Projects</li>
            <li><span className="bullet-dot"></span> 100% Practical Training</li>
            <li><span className="bullet-dot"></span> Placement Assistance</li>
          </ul>
          <button onClick={() => navigateTo('about')} className="btn btn-primary">About Us</button>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
