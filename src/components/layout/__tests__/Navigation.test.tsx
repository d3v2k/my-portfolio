import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Navigation from '../Navigation';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { beforeEach } from 'node:test';
import { describe } from 'node:test';

// Mock the hooks
vi.mock('../../../hooks/useSmoothScroll', () => ({
  useSmoothScroll: () => ({
    scrollToElement: vi.fn(),
    scrollToTop: vi.fn()
  })
}));

vi.mock('../../../hooks/useScrollSpy', () => ({
  useScrollSpy: () => 'home'
}));

// Mock the constants
vi.mock('../../../constants', () => ({
  NAVIGATION_ITEMS: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#projects' },
  ]
}));

describe('Navigation', () => {
  beforeEach(() => {
    // Mock document.getElementById
    document.getElementById = vi.fn((id) => {
      const mockElement = {
        offsetTop: id === 'home' ? 0 : id === 'about' ? 500 : 1000,
        scrollIntoView: vi.fn()
      };
      return mockElement as any;
    });

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  it('renders all navigation items', () => {
    render(<Navigation />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders mobile navigation layout when isMobile is true', () => {
    render(<Navigation isMobile={true} />);
    
    const nav = screen.getByRole('navigation');
    const list = nav.querySelector('ul');
    expect(list).toHaveClass('space-y-2');
  });

  it('renders desktop navigation layout by default', () => {
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    const list = nav.querySelector('ul');
    expect(list).toHaveClass('flex', 'space-x-2');
  });

  it('calls onItemClick when navigation item is clicked', () => {
    // Mock the useSmoothScroll hook
    const mockScrollToElement = vi.fn();
    const mockOnItemClick = vi.fn();
    
    vi.mocked(require('../../../hooks/useSmoothScroll').useSmoothScroll).mockImplementation(() => ({
      scrollToElement: mockScrollToElement,
      scrollToTop: vi.fn()
    }));
    
    render(<Navigation onItemClick={mockOnItemClick} />);
    
    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);
    
    expect(mockOnItemClick).toHaveBeenCalled();
    expect(mockScrollToElement).toHaveBeenCalled();
  });

  it('scrolls to section when navigation item is clicked', () => {
    // Mock the useSmoothScroll hook
    const mockScrollToElement = vi.fn();
    
    vi.mocked(require('../../../hooks/useSmoothScroll').useSmoothScroll).mockImplementation(() => ({
      scrollToElement: mockScrollToElement,
      scrollToTop: vi.fn()
    }));
    
    render(<Navigation />);
    
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);
    
    expect(mockScrollToElement).toHaveBeenCalledWith('about', { 
      offset: 80,
      duration: 800
    });
  });

  it('highlights active section based on scroll position', () => {
    // Mock the useScrollSpy hook to return 'about' as active section
    vi.mocked(require('../../../hooks/useScrollSpy').useScrollSpy).mockReturnValue('about');
    
    render(<Navigation />);
    
    const aboutButton = screen.getByText('About').closest('button');
    expect(aboutButton).toHaveClass('text-primary', 'bg-primary/10');
  });
});