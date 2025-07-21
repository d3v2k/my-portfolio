import { vi } from 'vitest';

// Mock implementation of useIntersectionObserver
export const useIntersectionObserver = vi.fn(() => {
  return {
    ref: { current: document.createElement('div') },
    isIntersecting: false
  };
});