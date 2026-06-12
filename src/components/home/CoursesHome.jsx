import React from 'react';
import { useMedia } from '../../context/MediaContext';
import graphicDesignFlyer from '../../assets/graphic_design_flyer.jpg';
import videoEditingFlyer from '../../assets/video_editing_flyer.jpg';
import cinematographyFlyer from '../../assets/cinematography_flyer.jpg';
import socialMediaMarketingFlyer from '../../assets/social_media_marketing_flyer.jpg';
import performanceMarketingFlyer from '../../assets/performance_marketing_flyer.jpg';

export const CoursesHome = ({ navigateTo, triggerModal }) => {
  const { media } = useMedia();

  return (
    <section className="our-courses-home">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">OUR PROGRAMS</span>
          <h2 className="section-title">Our Courses</h2>
          <p className="section-desc">Choose your path and start your creative journey</p>
        </div>

        <div className="courses-home-grid">

          {/* 1. Graphic Design */}
          <div className="course-card-home graphic-design-bg flyer-card">
            <div className="flyer-image-wrapper" onClick={() => navigateTo('courses', 'graphic-design')} style={{ cursor: 'pointer' }}>
              <img src={graphicDesignFlyer} alt="Graphic Designing Course Poster" className="flyer-img" />
            </div>
            <button onClick={() => navigateTo('courses', 'graphic-design')} className="btn btn-secondary btn-full">View Details</button>
          </div>

          {/* 2. Video Editing */}
          <div className="course-card-home video-editing-bg flyer-card">
            <div className="flyer-image-wrapper" onClick={() => navigateTo('courses', 'video-editing')} style={{ cursor: 'pointer' }}>
              <img src={videoEditingFlyer} alt="Video Editing Course Poster" className="flyer-img" />
            </div>
            <button onClick={() => navigateTo('courses', 'video-editing')} className="btn btn-secondary btn-full">View Details</button>
          </div>

          {/* 3. Cinematography */}
          <div className="course-card-home cinematography-bg flyer-card">
            <div className="flyer-image-wrapper" onClick={() => navigateTo('courses', 'cinematography')} style={{ cursor: 'pointer' }}>
              <img src={cinematographyFlyer} alt="Cinematography Course Poster" className="flyer-img" />
            </div>
            <button onClick={() => navigateTo('courses', 'cinematography')} className="btn btn-secondary btn-full">View Details</button>
          </div>

          {/* 4. Social Media Marketing */}
          <div className="course-card-home social-media-bg flyer-card">
            <div className="flyer-image-wrapper" onClick={() => navigateTo('courses', 'social-media-marketing')} style={{ cursor: 'pointer' }}>
              <img src={socialMediaMarketingFlyer} alt="Social Media Marketing Course Poster" className="flyer-img" />
            </div>
            <button onClick={() => navigateTo('courses', 'social-media-marketing')} className="btn btn-secondary btn-full">View Details</button>
          </div>

          {/* 5. Performance Marketing */}
          <div className="course-card-home performance-bg flyer-card">
            <div className="flyer-image-wrapper" onClick={() => navigateTo('courses', 'performance-marketing')} style={{ cursor: 'pointer' }}>
              <img src={performanceMarketingFlyer} alt="Performance Marketing Course Poster" className="flyer-img" />
            </div>
            <button onClick={() => navigateTo('courses', 'performance-marketing')} className="btn btn-secondary btn-full">View Details</button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoursesHome;
