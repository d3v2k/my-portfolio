import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useSmoothScroll } from '../useSmoothScroll';

describe('useSmoothScroll', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
    
    // Mock requestAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      setTimeout(() => cb(performance.now()), 0);
      return 0;
    });
    
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      top: 500,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    }));
    
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
    
    // Mock document.getElementById
    document.getElementById = vi.fn((id) => {
      if (id === 'test-section') {
        return document.createElement('div');
      }
      return null;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should provide scrollToElement function', () => {
    const { result } = renderHook(() => useSmoothScroll());
    
    expect(result.current.scrollToElement).toBeDefined();
    expect(typeof result.current.scrollToElement).toBe('function');
  });

  it('should provide scrollToTop function', () => {
    const { result } = renderHook(() => useSmoothScroll());
    
    expect(result.current.scrollToTop).toBeDefined();
    expect(typeof result.current.scrollToTop).toBe('function');
  });

  it('should scroll to element when scrollToElement is called with valid ID', () => {
    const { result } = renderHook(() => useSmoothScroll());
    
    act(() => {
      result.current.scrollToElement('test-section');
    });
    
    // Verify requestAnimationFrame was called
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  it('should not scroll when target element is not found', () => {
    document.getElementById = vi.fn(() => null);
    
    const { result } = renderHook(() => useSmoothScroll());
    
    act(() => {
      result.current.scrollToElement('non-existent-section');
    });
    
    // Verify scrollTo was not called
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('should scroll to top when scrollToTop is called', () => {
    // Set initial scroll position
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 500,
    });
    
    const { result } = renderHook(() => useSmoothScroll());
    
    act(() => {
      result.current.scrollToTop();
    });
    
    // Verify requestAnimationFrame was called
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  it('should use custom options when provided', () => {
    const { result } = renderHook(() => 
      useSmoothScroll({ offset: 100, duration: 500 })
    );
    
    act(() => {
      result.current.scrollToElement('test-section');
    });
    
    // Verify requestAnimationFrame was called
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });
});