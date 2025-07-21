import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useScrollAnimation, useStaggeredScrollAnimation } from '../useScrollAnimation';

// Mock the useIntersectionObserver hook
vi.mock('../useIntersectionObserver', () => ({
  useIntersectionObserver: vi.fn(({ triggerOnce = true }) => {
    return {
      ref: { current: document.createElement('div') },
      isIntersecting: false
    };
  })
}));

describe('useScrollAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    
    // Reset the mock implementation for each test
    const { useIntersectionObserver } = require('../useIntersectionObserver');
    useIntersectionObserver.mockImplementation(({ triggerOnce = true }) => {
      return {
        ref: { current: document.createElement('div') },
        isIntersecting: false
      };
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should return ref and shouldAnimate state', () => {
    const { result } = renderHook(() => useScrollAnimation());
    
    expect(result.current.ref).toBeDefined();
    expect(result.current.shouldAnimate).toBe(false);
  });

  it('should set shouldAnimate to true when element intersects', () => {
    // Mock the intersection observer to return isIntersecting: true
    const { useIntersectionObserver } = require('../useIntersectionObserver');
    useIntersectionObserver.mockImplementation(() => ({
      ref: { current: document.createElement('div') },
      isIntersecting: true
    }));
    
    const { result } = renderHook(() => useScrollAnimation());
    
    expect(result.current.shouldAnimate).toBe(true);
  });

  it('should respect delay option', () => {
    // Mock the intersection observer to return isIntersecting: true
    const { useIntersectionObserver } = require('../useIntersectionObserver');
    useIntersectionObserver.mockImplementation(() => ({
      ref: { current: document.createElement('div') },
      isIntersecting: true
    }));
    
    const { result } = renderHook(() => useScrollAnimation({ delay: 500 }));
    
    // Initially, shouldAnimate should be false
    expect(result.current.shouldAnimate).toBe(false);
    
    // After the delay, shouldAnimate should be true
    act(() => {
      vi.advanceTimersByTime(500);
    });
    
    expect(result.current.shouldAnimate).toBe(true);
  });
});

describe('useStaggeredScrollAnimation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    
    // Reset the mock implementation for each test
    const { useIntersectionObserver } = require('../useIntersectionObserver');
    useIntersectionObserver.mockImplementation(() => ({
      ref: { current: document.createElement('div') },
      isIntersecting: false
    }));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should return ref and animatingElements array', () => {
    const { result } = renderHook(() => useStaggeredScrollAnimation(3));
    
    expect(result.current.ref).toBeDefined();
    expect(result.current.animatingElements).toEqual([false, false, false]);
  });

  it('should animate elements in sequence when intersecting', () => {
    // Mock the intersection observer to return isIntersecting: true
    const { useIntersectionObserver } = require('../useIntersectionObserver');
    useIntersectionObserver.mockImplementation(() => ({
      ref: { current: document.createElement('div') },
      isIntersecting: true
    }));
    
    const { result } = renderHook(() => 
      useStaggeredScrollAnimation(3, { delay: 0, staggerDelay: 100 })
    );
    
    // Initially, no elements should be animating
    expect(result.current.animatingElements).toEqual([false, false, false]);
    
    // After the first stagger delay, the first element should animate
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(result.current.animatingElements).toEqual([true, false, false]);
    
    // After the second stagger delay, the second element should animate
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.animatingElements).toEqual([true, true, false]);
    
    // After the third stagger delay, the third element should animate
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.animatingElements).toEqual([true, true, true]);
  });

  it('should respect initial delay before starting staggered animations', () => {
    // Mock the intersection observer to return isIntersecting: true
    const { useIntersectionObserver } = require('../useIntersectionObserver');
    useIntersectionObserver.mockImplementation(() => ({
      ref: { current: document.createElement('div') },
      isIntersecting: true
    }));
    
    const { result } = renderHook(() => 
      useStaggeredScrollAnimation(2, { delay: 200, staggerDelay: 100 })
    );
    
    // Initially, no elements should be animating
    expect(result.current.animatingElements).toEqual([false, false]);
    
    // Before the initial delay, no elements should be animating
    act(() => {
      vi.advanceTimersByTime(199);
    });
    expect(result.current.animatingElements).toEqual([false, false]);
    
    // After the initial delay, the first element should animate
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.animatingElements).toEqual([true, false]);
    
    // After the stagger delay, the second element should animate
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.animatingElements).toEqual([true, true]);
  });
});