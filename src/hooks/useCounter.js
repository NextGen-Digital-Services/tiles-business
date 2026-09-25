import { useState, useEffect } from 'react';

export const useCounter = (targetValue, duration = 2000, isVisible = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    // Extract numeric part if string contains numbers (e.g. "15+", "50,000 sqft")
    const numericStr = String(targetValue).replace(/[^0-9]/g, '');
    const targetNum = parseInt(numericStr, 10);

    if (isNaN(targetNum) || targetNum === 0) {
      setCount(targetValue);
      return;
    }

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.floor(easedProgress * targetNum);
      
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(targetNum);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue, duration, isVisible]);

  return count;
};
