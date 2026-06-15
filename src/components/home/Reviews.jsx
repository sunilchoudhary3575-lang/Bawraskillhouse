import React from 'react';

export const Reviews = ({ reviews, navigateTo }) => {
  return (
    <section className="reviews-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">SUCCESS ALUMNI</span>
          <h2 className="section-title">Student Reviews</h2>
        </div>

        <div className="reviews-grid-home">
          {reviews.map((rev, idx) => (
            <div key={idx} className="review-card glass">
              <div className="review-stars">{"★".repeat(rev.stars)}</div>
              <p className="review-text">"{rev.text}"</p>
              <div className="review-author">
                <h4>{rev.name}</h4>
                <p>{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <button onClick={() => navigateTo('portfolio')} className="btn btn-outline">View All Reviews</button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
