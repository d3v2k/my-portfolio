import { useCallback } from 'react';

interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
}

// Easing functions
const easeInOutCubic = (t: number): number => 
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const easeOutQuart = (t: number): number => 
  1 - Math.pow(1 - t, 4);

/**
 * Hook for smooth scrolling with customizable easing and duration
 */
export function useSmoothScroll(defaultOptions?: SmoothScrollOptions) {
  const scrollToElement = useCallback((
    target: string | HTMLElement,
    options?: SmoothScrollOptions
  ) => {
    // Merge default options with provided options
    const {
      offset = 80,
      duration = 800,
      easing = easeInOutCubic
    } = { ...defaultOptions, ...options };

    // Get the target element
    const targetElement = typeof target === 'string' 
      ? document.getElementById(target)
      : target;

    if (!targetElement) return;

    // Check if getBoundingClientRect is available (might not be in test environment)
    let targetPosition;
    let startPosition = window.scrollY;
    try {
      targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    } catch (error) {
      // Fallback for test environment
      startPosition = window.scrollY || 0;
      targetPosition = (targetElement.offsetTop || 0) - offset;
    }
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    // Animate scroll
    function animateScroll(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easing(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  }, [defaultOptions]);

  const scrollToTop = useCallback((options?: SmoothScrollOptions) => {
    const {
      duration = 800,
      easing = easeOutQuart
    } = { ...defaultOptions, ...options };

    const startPosition = window.scrollY;
    let startTime: number | null = null;

    // Animate scroll to top
    function animateScrollToTop(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easing(progress);

      window.scrollTo(0, startPosition * (1 - easedProgress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScrollToTop);
      }
    }

    requestAnimationFrame(animateScrollToTop);
  }, [defaultOptions]);

  return { scrollToElement, scrollToTop };
}