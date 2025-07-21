import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import ScrollToTop from '../ScrollToTop';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { afterEach } from 'node:test';
import { beforeEach } from 'node:test';
import { describe } from 'node:test';

// Mock the useSmoothScroll hook
vi.mock('../../../hooks/useSmoothScroll', () => ({
  useSmoothScroll: () => ({
    scrollToTop: vi.fn()
  })
}));

describe('ScrollToTop', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });

    // Mock addEventListener and removeEventListener
    window.addEventListener = vi.fn((event, handler) => {
      if (event === 'scroll') {
        // Store the handler for later use
        (window as any).scrollHandler = handler;
      }
    });
    window.removeEventListener = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete (window as any).scrollHandler;
  });

  it('should not render when scroll position is below threshold', () => {
    render(<ScrollToTop showBelow={300} />);
    
    // Button should not be in the document
    const button = screen.queryByRole('button', { name: /scroll to top/i });
    expect(button).not.toBeInTheDocument();
  });

  it('should render when scroll position is above threshold', () => {
    // Set scroll position above threshold
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 400,
    });
    
    render(<ScrollToTop showBelow={300} />);
    
    // Trigger the scroll handler
    act(() => {
      if ((window as any).scrollHandler) {
        (window as any).scrollHandler();
      }
    });
    
    // Button should be in the document
    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toBeInTheDocument();
  });

  it('should call scrollToTop when clicked', () => {
    // Set scroll position above threshold
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 400,
    });
    
    const mockScrollToTop = vi.fn();
    vi.mocked(require('../../../hooks/useSmoothScroll').useSmoothScroll).mockImplementation(() => ({
      scrollToTop: mockScrollToTop
    }));
    
    render(<ScrollToTop showBelow={300} />);
    
    // Trigger the scroll handler
    act(() => {
      if ((window as any).scrollHandler) {
        (window as any).scrollHandler();
      }
    });
    
    // Click the button
    const button = screen.getByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);
    
    // Verify scrollToTop was called
    expect(mockScrollToTop).toHaveBeenCalledWith({ duration: 600 });
  });

  it('should add and remove scroll event listener', () => {
    const { unmount } = render(<ScrollToTop />);
    
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

  it('should use default showBelow value when not provided', () => {
    // Set scroll position above default threshold
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 350,
    });
    
    render(<ScrollToTop />);
    
    // Trigger the scroll handler
    act(() => {
      if ((window as any).scrollHandler) {
        (window as any).scrollHandler();
      }
    });
    
    // Button should be in the document
    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toBeInTheDocument();
  });
});