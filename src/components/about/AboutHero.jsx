import React from 'react';

export const AboutHero = ({ navigateTo }) => {
  return (
    <>
      {/* Breadcrumb banner */}
      <section className="breadcrumb-banner">
        <div className="container text-center">
          <h1>About Us</h1>
          <p className="breadcrumb-path"><span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Home</span> &gt; About Us</p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="container text-center">
          <div className="academy-badge">BAWRA SKILL HOUSE</div>
          <h2 className="about-hero-title">
            Redefining Creative Education for the <span className="gold-text">Next Generation</span>
          </h2>
          <p className="about-hero-subtitle">
            A premium educational ecosystem empowering students, aspiring creators, and digital professionals with the practical skills, resources, and networks needed to build high-income careers in the modern creator economy.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutHero;
