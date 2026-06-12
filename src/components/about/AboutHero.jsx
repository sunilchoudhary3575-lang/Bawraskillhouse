import React from 'react';
import Icons from '../Icons';

export const AboutHero = ({ navigateTo }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="container text-center">
          <div className="academy-badge">BAWRA SKILL HOUSE</div>
          <h2 className="about-hero-title">
            Redefining Creative Education for the <span className="gold-text">Next Generation</span>
          </h2>
          <p className="about-hero-subtitle">
            <b>Unhone college choda</b>  — duniya ne socha galti ki. Aaj <span className="youtube-bold"><b>5 lakh</b> <Icons.Youtube className="youtube-small-logo" /></span> log unhe follow karte hain. Meet <b> Rawal Singh — Founder</b>, Bawra Skillhouse & Bawra Digital Private Limited.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutHero;
