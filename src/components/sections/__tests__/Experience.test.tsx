import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Experience from '../Experience';
import * as dataLoader from '../../../utils/dataLoader';
import type { Experience as ExperienceType } from '../../../types';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock intersection observer hook
vi.mock('../../../hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: () => ({
    ref: { current: null },
    isIntersecting: true,
  }),
}));

const mockExperiences: ExperienceType[] = [
  {
    id: 'senior-dev',
    company: 'Tech Corp',
    role: 'Senior Developer',
    startDate: '2022-01-01',
    location: 'New York, NY',
    description: 'Lead development of enterprise applications',
    achievements: [
      'Led team of 5 developers',
      'Improved performance by 40%',
    ],
    technologies: ['React', 'Node.js', 'TypeScript'],
    current: true,
  },
  {
    id: 'mid-dev',
    company: 'StartupCo',
    role: 'Full Stack Developer',
    startDate: '2020-06-01',
    endDate: '2021-12-31',
    location: 'San Francisco, CA',
    description: 'Developed web applications for startup',
    achievements: [
      'Built 3 major features',
      'Reduced bugs by 30%',
    ],
    technologies: ['Vue.js', 'Python', 'PostgreSQL'],
    current: false,
  },
];

describe('Experience Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<Experience />);
    
    expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    expect(screen.getByText('Loading experience data...')).toBeInTheDocument();
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders error state when data loading fails', async () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockRejectedValue(
      new Error('Failed to load')
    );

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load experience data')).toBeInTheDocument();
    });
  });

  it('renders experience data correctly', async () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockResolvedValue(mockExperiences);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    });

    // Check experience details
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('StartupCo')).toBeInTheDocument();
  });

  it('displays current position indicator', async () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockResolvedValue(mockExperiences);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Current')).toBeInTheDocument();
    });
  });

  it('formats dates correctly', async () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockResolvedValue(mockExperiences);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText(/Jan 2022 - Present/)).toBeInTheDocument();
      expect(screen.getByText(/Jun 2020 - Dec 2021/)).toBeInTheDocument();
    });
  });

  it('expands and collapses experience cards', async () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockResolvedValue(mockExperiences);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    });

    // Initially collapsed
    expect(screen.queryByText('Key Achievements')).not.toBeInTheDocument();
    expect(screen.queryByText('Led team of 5 developers')).not.toBeInTheDocument();

    // Click to expand
    const showMoreButton = screen.getAllByText('Show More')[0];
    fireEvent.click(showMoreButton);

    // Should show expanded content
    expect(screen.getByText('Key Achievements')).toBeInTheDocument();
    expect(screen.getByText('Led team of 5 developers')).toBeInTheDocument();
    expect(screen.getAllByText('Technologies Used')).toHaveLength(2); // One in expanded content, one in summary

    // Click to collapse
    const showLessButton = screen.getByText('Show Less');
    fireEvent.click(showLessButton);

    // Should hide expanded content
    await waitFor(() => {
      expect(screen.queryByText('Key Achievements')).not.toBeInTheDocument();
    });
  });

  it('displays achievements when expanded', async () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockResolvedValue(mockExperiences);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    });

    // Expand first card
    const showMoreButton = screen.getAllByText('Show More')[0];
    fireEvent.click(showMoreButton);

    // Check achievements
    expect(screen.getByText('Led team of 5 developers')).toBeInTheDocument();
    expect(screen.getByText('Improved performance by 40%')).toBeInTheDocument();
  });

  it('displays technologies when expanded', async () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockResolvedValue(mockExperiences);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    });

    // Expand first card
    const showMoreButton = screen.getAllByText('Show More')[0];
    fireEvent.click(showMoreButton);

    // Check technologies
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('displays career summary statistics', async () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockResolvedValue(mockExperiences);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Career Summary')).toBeInTheDocument();
    });

    expect(screen.getByText('2')).toBeInTheDocument(); // Positions held
    expect(screen.getByText('Positions Held')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
    expect(screen.getByText('Technologies Used')).toBeInTheDocument();
  });

  it('handles empty experience data gracefully', async () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockResolvedValue([]);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    });

    expect(screen.getByText('No experience data found.')).toBeInTheDocument();
  });

  it('handles missing company logo gracefully', async () => {
    const experienceWithLogo = [{
      ...mockExperiences[0],
      companyLogo: '/invalid-logo.png'
    }];
    
    vi.spyOn(dataLoader, 'loadExperienceData').mockResolvedValue(experienceWithLogo);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    });

    // Logo should be present but may fail to load
    const logo = screen.getByAltText('Tech Corp logo');
    expect(logo).toBeInTheDocument();
  });

  it('calculates duration correctly', async () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockResolvedValue(mockExperiences);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    });

    // Should show duration for experiences
    // Note: Exact duration depends on current date, so we check for pattern
    expect(screen.getAllByText(/\d+ year/)).toHaveLength(2); // Two experiences with year durations
  });

  it('applies correct responsive classes', async () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockResolvedValue(mockExperiences);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    });

    // Check for responsive grid classes
    const summaryGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
    expect(summaryGrid).toBeInTheDocument();
  });

  it('renders timeline layout correctly', async () => {
    vi.spyOn(dataLoader, 'loadExperienceData').mockResolvedValue(mockExperiences);

    render(<Experience />);

    await waitFor(() => {
      expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    });

    // Check for timeline elements
    const timelineContainer = document.querySelector('.relative');
    expect(timelineContainer).toBeInTheDocument();
  });
});