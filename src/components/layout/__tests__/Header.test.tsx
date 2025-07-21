import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import Header from '../Header';

// Mock the Navigation component
vi.mock('../Navigation', () => ({
  default: ({ isMobile, onItemClick }: { isMobile?: boolean; onItemClick?: () => void }) => (
    <div data-testid={isMobile ? 'mobile-nav' : 'desktop-nav'}>
      <button onClick={onItemClick}>Mock Nav Item</button>
    </div>
  )
}));

describe('Header', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  it('renders the header with brand name', () => {
    render(<Header />);
    // The header should display the brand name
    const brandLink = screen.getByRole('link');
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '#home');
  });

  it('shows desktop navigation on larger screens', () => {
    render(<Header />);
    expect(screen.getByTestId('desktop-nav')).toBeInTheDocument();
  });

  it('shows mobile menu button', () => {
    render(<Header />);
    expect(screen.getByLabelText('Toggle mobile menu')).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText('Toggle mobile menu');
    fireEvent.click(menuButton);
    
    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
  });

  it('applies scrolled styles when page is scrolled', () => {
    render(<Header />);
    
    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 100,
    });
    
    fireEvent.scroll(window);
    
    // The header should have scrolled styles applied
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white/95');
  });

  it('closes mobile menu when navigation item is clicked', () => {
    // Mock the AnimatePresence component to immediately remove elements
    vi.mock('framer-motion', () => ({
      motion: {
        header: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => 
          <header {...props}>{children}</header>,
        div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => 
          <div {...props}>{children}</div>,
        button: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => 
          <button {...props}>{children}</button>,
      },
      AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    }));

    render(<Header />);
    
    // Open mobile menu
    const menuButton = screen.getByLabelText('Toggle mobile menu');
    fireEvent.click(menuButton);
    
    // Click navigation item in mobile menu
    const mobileNav = screen.getByTestId('mobile-nav');
    const navItem = mobileNav.querySelector('button');
    if (navItem) {
      fireEvent.click(navItem);
    }
    
    // Since we're testing the state change, not the animation,
    // we can check if the state was updated correctly
    expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument();
  });
});