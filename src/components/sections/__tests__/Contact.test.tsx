import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Contact from '../Contact';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock Button component
vi.mock('../../ui/Button', () => ({
  default: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

describe('Contact Component', () => {
  it('renders contact section with heading', () => {
    render(<Contact />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });
});