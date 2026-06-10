import React from 'react';

export const CareerOpportunities = ({ navigateTo }) => {
  return (
    <>
      <section className="breadcrumb-banner">
        <div className="container text-center">
          <h1>Career Opportunities</h1>
          <p className="breadcrumb-path"><span onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>Home</span> &gt; Career</p>
        </div>
      </section>

      <section className="career-opportunities-section">
        <div className="container welcome-grid">
          
          <div className="welcome-text">
            <span className="section-subtitle">FUTURE TRAJECTORIES</span>
            <h2>After completing the course, you can work as:</h2>
            
            <div className="career-list-vertical">
              
              <div className="career-list-item glass">
                <span className="career-bullet-dot">✔</span>
                <div>
                  <h4>Graphic Designer</h4>
                  <p>Work in branding studios, design offices, or run your freelance design startup.</p>
                </div>
              </div>

              <div className="career-list-item glass">
                <span className="career-bullet-dot">✔</span>
                <div>
                  <h4>Video Editor</h4>
                  <p>Edit high-pacing Youtube edits, commercial reels, films, and ad copy.</p>
                </div>
              </div>

              <div className="career-list-item glass">
                <span className="career-bullet-dot">✔</span>
                <div>
                  <h4>Social Media Creative Designer</h4>
                  <p>Design visual posts, highlight layouts, banners, and digital ads for brands.</p>
                </div>
              </div>

              <div className="career-list-item glass">
                <span className="career-bullet-dot">✔</span>
                <div>
                  <h4>Motion Graphics Artist</h4>
                  <p>Produce title sequences, animated explainers, and interactive web elements.</p>
                </div>
              </div>

              <div className="career-list-item glass">
                <span className="career-bullet-dot">✔</span>
                <div>
                  <h4>Freelance Creator</h4>
                  <p>Pitch to international clients, secure retainers, and earn in foreign currency.</p>
                </div>
              </div>

              <div className="career-list-item glass">
                <span className="career-bullet-dot">✔</span>
                <div>
                  <h4>Content Editor</h4>
                  <p>Generate highly engaging visual assets for brand socials and digital campaigns.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="career-salary-box-col">
            <div className="salary-outcome-card glass">
              <div className="card-header-inner border-bottom pb-2">
                <h3 className="gold-text">Average Salary & Earnings</h3>
                <p>Average packages of visual designers and video editors:</p>
              </div>
              
              <div className="salary-roles-listings">
                <div className="salary-role-item">
                  <p className="role-title-salary">Graphic Designer</p>
                  <p className="role-salary-range">₹2.5L - ₹6L / Year</p>
                </div>
                <div className="salary-role-item border-top pt-3">
                  <p className="role-title-salary">Video Editor</p>
                  <p className="role-salary-range">₹3L - ₹7L / Year</p>
                </div>
                <div className="salary-role-item border-top pt-3">
                  <p className="role-title-salary">Freelancer Earnings</p>
                  <p className="role-salary-range gold-text">₹30K - ₹1L+ / Month</p>
                </div>
              </div>
            </div>

            <div className="career-counsel-card dark-gold-gradient text-center mt-4">
              <h3>Want to know more about career?</h3>
              <p>Talk to our creative career advisors and map out your roadmap.</p>
              <button onClick={() => navigateTo('contact')} className="btn btn-gold btn-full">Contact Us</button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default CareerOpportunities;
