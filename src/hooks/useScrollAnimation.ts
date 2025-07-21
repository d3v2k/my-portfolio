import { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

/**
 * Hook for creating scroll-triggered animations
 * Returns animation controls and ref to be used with Framer Motion
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (isIntersecting && !shouldAnimate) {
      if (delay > 0) {
        // Clear any existing timeout
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }
        
        // Set a new timeout
        timeoutRef.current = window.setTimeout(() => {
          setShouldAnimate(true);
        }, delay);
      } else {
        setShouldAnimate(true);
      }
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isIntersecting, delay, shouldAnimate]);

  return { ref, shouldAnimate };
}

/**
 * Hook for creating staggered animations on multiple elements
 */
export function useStaggeredScrollAnimation(
  elementsCount: number,
  options: ScrollAnimationOptions & { staggerDelay?: number } = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
    staggerDelay = 100
  } = options;

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce
  });

  const [animatingElements, setAnimatingElements] = useState<boolean[]>(
    new Array(elementsCount).fill(false)
  );

  useEffect(() => {
    if (isIntersecting) {
      const timeouts: number[] = [];
      
      // Stagger the animations
      for (let i = 0; i < elementsCount; i++) {
        const timeout = window.setTimeout(() => {
          setAnimatingElements(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, delay + i * staggerDelay);
        
        timeouts.push(timeout);
      }
      
      return () => {
        timeouts.forEach(timeout => window.clearTimeout(timeout));
      };
    }
    return undefined;
  }, [isIntersecting, elementsCount, delay, staggerDelay]);

  return { ref, animatingElements };
}