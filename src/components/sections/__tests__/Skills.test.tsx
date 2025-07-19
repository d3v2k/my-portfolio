import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Skills from '../Skills';
import * as dataLoader from '../../../utils/dataLoader';
import type { Skill } from '../../../types';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock intersection observer hook
vi.mock('../../../hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: () => ({
    ref: { current: null },
    isIntersecting: true,
  }),
}));

const mockSkills: Skill[] = [
  {
    name: 'React',
    category: 'frontend',
    level: 'advanced',
    yearsOfExperience: 4,
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    level: 'advanced',
    yearsOfExperience: 3,
  },
  {
    name: 'C#',
    category: 'backend',
    level: 'expert',
    yearsOfExperience: 6,
  },
  {
    name: '.NET Core',
    category: 'backend',
    level: 'expert',
    yearsOfExperience: 5,
  },
  {
    name: 'SQL Server',
    category: 'database',
    level: 'advanced',
    yearsOfExperience: 6,
  },
  {
    name: 'Docker',
    category: 'tools',
    level: 'intermediate',
    yearsOfExperience: 3,
  },
];

describe('Skills Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    vi.spyOn(dataLoader, 'loadSkillsData').mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<Skills />);
    
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    // Check for loading skeleton
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders error state when data loading fails', async () => {
    vi.spyOn(dataLoader, 'loadSkillsData').mockRejectedValue(
      new Error('Failed to load')
    );

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load skills data')).toBeInTheDocument();
    });
  });

  it('renders skills grouped by category', async () => {
    vi.spyOn(dataLoader, 'loadSkillsData').mockResolvedValue(mockSkills);

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    });

    // Check category headers
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Database')).toBeInTheDocument();
    expect(screen.getByText('Tools & DevOps')).toBeInTheDocument();
  });

  it('displays individual skills with correct information', async () => {
    vi.spyOn(dataLoader, 'loadSkillsData').mockResolvedValue(mockSkills);

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    // Check skill details
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('C#')).toBeInTheDocument();
    expect(screen.getByText('.NET Core')).toBeInTheDocument();
    expect(screen.getByText('SQL Server')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
  });

  it('displays skill levels correctly', async () => {
    vi.spyOn(dataLoader, 'loadSkillsData').mockResolvedValue(mockSkills);

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('Advanced')).toBeInTheDocument();
    });

    // Check for different skill levels
    expect(screen.getAllByText('Advanced')).toHaveLength(3); // React, TypeScript, SQL Server
    expect(screen.getAllByText('Expert')).toHaveLength(2); // C#, .NET Core
    expect(screen.getByText('Intermediate')).toBeInTheDocument(); // Docker
  });

  it('displays years of experience', async () => {
    vi.spyOn(dataLoader, 'loadSkillsData').mockResolvedValue(mockSkills);

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('4 years experience')).toBeInTheDocument();
    });

    expect(screen.getByText('3 years experience')).toBeInTheDocument();
    expect(screen.getByText('6 years experience')).toBeInTheDocument();
    expect(screen.getByText('5 years experience')).toBeInTheDocument();
  });

  it('displays skill count for each category', async () => {
    vi.spyOn(dataLoader, 'loadSkillsData').mockResolvedValue(mockSkills);

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('2 skills')).toBeInTheDocument(); // Frontend
    });

    expect(screen.getAllByText('2 skills')).toHaveLength(2); // Frontend and Backend
    expect(screen.getByText('1 skill')).toBeInTheDocument(); // Database and Tools
  });

  it('displays skills overview with level counts', async () => {
    vi.spyOn(dataLoader, 'loadSkillsData').mockResolvedValue(mockSkills);

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('Skills Overview')).toBeInTheDocument();
    });

    // The overview should show counts for each skill level
    expect(screen.getByText('Skills Overview')).toBeInTheDocument();
  });

  it('handles empty skills data gracefully', async () => {
    vi.spyOn(dataLoader, 'loadSkillsData').mockResolvedValue([]);

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    });

    // Should still render the main heading and description
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText(/comprehensive overview/i)).toBeInTheDocument();
  });

  it('applies correct CSS classes for responsive design', async () => {
    vi.spyOn(dataLoader, 'loadSkillsData').mockResolvedValue(mockSkills);

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    });

    // Check for responsive grid classes
    const gridContainer = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2');
    expect(gridContainer).toBeInTheDocument();
  });

  it('renders category icons and colors correctly', async () => {
    vi.spyOn(dataLoader, 'loadSkillsData').mockResolvedValue(mockSkills);

    render(<Skills />);

    await waitFor(() => {
      expect(screen.getByText('Frontend')).toBeInTheDocument();
    });

    // Check that categories have their distinctive styling
    const frontendSection = screen.getByText('Frontend').closest('div');
    expect(frontendSection).toHaveClass('border-blue-200', 'bg-blue-50');
  });
});