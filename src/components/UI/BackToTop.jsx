import React, { useState, useEffect, useRef } from 'react';

export default function BackToTop() {
  const [isActive, setIsActive] = useState(false);
  const pathRef = useRef(null);

  useEffect(() => {
    const pathLength = 307.919; // 2 * Math.PI * 49
    let ticking = false;
    let currentActive = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scroll = window.scrollY || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - window.innerHeight;
          const progress = pathLength - (scroll * pathLength) / (height || 1);
          const clamped = Math.max(0, Math.min(pathLength, progress));

          if (pathRef.current) {
            pathRef.current.style.strokeDashoffset = `${clamped}`;
          }

          const shouldActive = scroll > 50;
          if (shouldActive !== currentActive) {
            currentActive = shouldActive;
            setIsActive(shouldActive);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`progress-wrap ${isActive ? 'active-progress' : ''}`}
      id="scrollUp"
      onClick={scrollToTop}
      role="button"
      tabIndex={0}
      aria-label="Back to top"
    >
      <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path
          ref={pathRef}
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          style={{
            strokeDasharray: '307.919, 307.919',
            strokeDashoffset: '307.919',
          }}
        />
      </svg>
    </div>
  );
}
