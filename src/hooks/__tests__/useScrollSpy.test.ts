import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useScrollSpy, useScrollToSection } from '../useScrollSpy';

describe('useScrollSpy', () => {
  beforeEach(() => {
    // Mock document.getElementById
    document.getElementById = vi.fn((id) => {
      const mockElement = {
        offsetTop: id === 'section1' ? 0 : id === 'section2' ? 500 : 1000,
      };
      return mockElement as any;
    });

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });

    // Mock addEventListener and removeEventListener
    window.addEventListener = vi.fn();
    window.removeEventListener = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the active section based on scroll position', () => {
    const sectionIds = ['section1', 'section2', 'section3'];
    const { result } = renderHook(() => useScrollSpy(sectionIds));

    expect(result.current).toBe('section1');
  });

  it('should add and remove scroll event listener', () => {
    const sectionIds = ['section1', 'section2'];
    const { unmount } = renderHook(() => useScrollSpy(sectionIds));

    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });

  it('should update active section when scroll position changes', () => {
    const sectionIds = ['section1', 'section2', 'section3'];
    const { result } = renderHook(() => useScrollSpy(sectionIds));

    // Initially should be section1
    expect(result.current).toBe('section1');

    // Simulate scroll to section2
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 450,
    });

    // Trigger the scroll handler
    const scrollHandler = (window.addEventListener as any).mock.calls[0][1];
    act(() => {
      scrollHandler();
    });

    expect(result.current).toBe('section2');
  });
});

describe('useScrollToSection', () => {
  beforeEach(() => {
    // Mock document.getElementById
    document.getElementById = vi.fn((id) => ({
      offsetTop: id === 'test-section' ? 500 : 0,
    }));

    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should scroll to the specified section', () => {
    const { result } = renderHook(() => useScrollToSection());
    const scrollToSection = result.current;

    act(() => {
      scrollToSection('test-section');
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 420, // 500 - 80 (default offset)
      behavior: 'smooth'
    });
  });

  it('should use custom offset when provided', () => {
    const { result } = renderHook(() => useScrollToSection());
    const scrollToSection = result.current;

    act(() => {
      scrollToSection('test-section', 100);
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 400, // 500 - 100 (custom offset)
      behavior: 'smooth'
    });
  });

  it('should handle non-existent sections gracefully', () => {
    document.getElementById = vi.fn(() => null);
    
    const { result } = renderHook(() => useScrollToSection());
    const scrollToSection = result.current;

    act(() => {
      scrollToSection('non-existent-section');
    });

    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});