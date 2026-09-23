import { useEffect } from 'react';

/**
 * Ultra-lightweight, 60-144 FPS scroll animation hook.
 * Uses native IntersectionObserver to animate content elements (.wow)
 * without touching parent section layouts, completely eliminating scroll stalls or stutter.
 */
let globalWowObserver = null;

function getWowObserver() {
  if (globalWowObserver) return globalWowObserver;
  if (typeof window === 'undefined') return null;

  globalWowObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-wow-delay');
          if (delay) {
            const delayVal = delay.endsWith('ms') || delay.endsWith('s') ? delay : `${delay}s`;
            el.style.transitionDelay = delayVal;
            el.style.animationDelay = delayVal;
          }

          requestAnimationFrame(() => {
            el.classList.add('animated');
          });
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.02,
      rootMargin: '0px 0px 100px 0px',
    }
  );

  return globalWowObserver;
}

export function observeWowElements() {
  if (typeof window === 'undefined') return;

  const observer = getWowObserver();
  if (!observer) return;

  const wowElements = document.querySelectorAll('.wow:not(.animated)');
  wowElements.forEach((el) => {
    observer.observe(el);
  });

  return observer;
}

export function useScrollAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = observeWowElements();

    // Also observe new elements added dynamically (e.g., page navigation)
    const mutationObserver = new MutationObserver(() => {
      observeWowElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Smooth Anchor Navigation for header menu links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.length > 1 && href.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 85;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
}
