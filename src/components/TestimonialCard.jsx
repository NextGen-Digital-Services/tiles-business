import React from 'react';
import { Star, Quote } from 'lucide-react';
import './TestimonialCard.css';

export const TestimonialCard = ({ testimonial }) => {
  const { name, role, quote, rating = 5, projectType, date } = testimonial;

  return (
    <div className="testimonial-card">
      <div className="card-top">
        <div className="rating-stars">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={15} fill="#B08D57" color="#B08D57" />
          ))}
        </div>
        {projectType && <span className="project-badge">{projectType}</span>}
      </div>

      <Quote size={28} className="quote-mark" />
      <p className="testimonial-quote">"{quote}"</p>

      <div className="testimonial-author">
        <div className="author-details">
          <h4 className="author-name">{name}</h4>
          <p className="author-role">{role}</p>
        </div>
        {date && <span className="testimonial-date">{date}</span>}
      </div>
    </div>
  );
};
