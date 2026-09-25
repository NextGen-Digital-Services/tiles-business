import React from 'react';
import './SectionHeading.css';

export const SectionHeading = ({
  eyebrow,
  title,
  italicTitleText,
  subtitle,
  centered = false,
  darkBg = false
}) => {
  return (
    <div className={`section-heading ${centered ? 'text-center' : ''} ${darkBg ? 'dark-text' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="heading-title">
        {title}{' '}
        {italicTitleText && <span className="serif-italic">{italicTitleText}</span>}
      </h2>
      {subtitle && <p className="heading-subtitle">{subtitle}</p>}
    </div>
  );
};
