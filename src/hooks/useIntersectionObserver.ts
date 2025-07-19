import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        setIsIntersecting(isCurrentlyIntersecting);

        if (isCurrentlyIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [threshold, rootMargin, hasIntersected]);

  // Return the current intersection state or the "has intersected" state based on triggerOnce
  const shouldAnimate = triggerOnce ? hasIntersected : isIntersecting;

  return { ref: targetRef, isIntersecting: shouldAnimate };
}

export function useMultipleIntersectionObserver(
  elementsCount: number,
  options: UseIntersectionObserverOptions = {}
) {
  const [intersections, setIntersections] = useState<boolean[]>(
    new Array(elementsCount).fill(false)
  );
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIntersections(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px'
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [elementsCount, options.threshold, options.rootMargin]);

  const setRef = (index: number) => (element: HTMLElement | null) => {
    refs.current[index] = element;
  };

  return { intersections, setRef };
}