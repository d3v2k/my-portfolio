import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Navigation from '../Navigation';

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
    const mockOnItemClick = vi.fn();
    render(<Navigation onItemClick={mockOnItemClick} />);
    
    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);
    
    expect(mockOnItemClick).toHaveBeenCalled();
  });

  it('scrolls to section when navigation item is clicked', () => {
    const mockScrollIntoView = vi.fn();
    document.getElementById = vi.fn((id) => {
      if (id === 'about') {
        return {
          offsetTop: 500,
          scrollIntoView: mockScrollIntoView
        } as any;
      }
      return null;
    });

    render(<Navigation />);
    
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('highlights active section based on scroll position', () => {
    render(<Navigation />);
    
    // Simulate scroll to about section
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 450,
    });
    
    fireEvent.scroll(window);
    
    const aboutButton = screen.getByText('About');
    expect(aboutButton).toHaveClass('text-primary', 'bg-primary/10');
  });
});