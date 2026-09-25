import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCounter } from '../hooks/useCounter';
import './StatCounter.css';

export const StatCounter = ({ label, value, suffix = '', icon: Icon }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const animatedValue = useCounter(value, 2200, isInView);

  // If value is non-numeric string (e.g. bracket placeholder), render value as-is
  const isNumeric = !isNaN(parseInt(String(value).replace(/[^0-9]/g, ''), 10));

  return (
    <div className="stat-card" ref={ref}>
      {Icon && <Icon size={24} className="stat-icon" />}
      <div className="stat-number-wrap">
        <span className="stat-number">
          {isNumeric ? animatedValue.toLocaleString() : value}
        </span>
        {suffix && <span className="stat-suffix">{suffix}</span>}
      </div>
      <span className="stat-label">{label}</span>
    </div>
  );
};
