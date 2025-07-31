import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import About from '../About';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Download: ({ className, ...props }: any) => <div className={className} data-testid="download" {...props} />,
  Award: ({ className, ...props }: any) => <div className={className} data-testid="award" {...props} />,
  Code: ({ className, ...props }: any) => <div className={className} data-testid="code" {...props} />,
  Users: ({ className, ...props }: any) => <div className={className} data-testid="users" {...props} />,
  Coffee: ({ className, ...props }: any) => <div className={className} data-testid="coffee" {...props} />,
}));

// Mock the data loader
vi.mock('../../../utils/dataLoader', () => ({
  personalInfo: {
    name: 'April Galea',
    title: 'Full Stack .NET Developer',
    email: 'april.galea@live.com.ph',
    location: 'Philippines',
    summary: 'Passionate full stack .NET developer with 12+ years of experience building scalable web applications and APIs.',
    resumeUrl: '/documents/resume.zip'
  },
  getDataStats: () => ({
    totalProjects: 5,
    featuredProjects: 3,
    totalExperience: 4,
    currentRole: '.Net Developer',
    totalSkills: 24,
    skillCategories: 4,
    socialPlatforms: 5
  })
}));

// Mock the intersection observer hook
vi.mock('../../../hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: () => ({
    ref: { current: null },
    isIntersecting: true
  })
}));

// Mock animations
vi.mock('../../../utils/animations', () => ({
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }
}));

describe('About', () => {
  it('renders the about section with personal information', () => {
    render(<About />);
    
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Passionate full stack .NET developer with 12+ years of experience building scalable web applications and APIs.')).toBeInTheDocument();
  });

  it('displays professional highlights', () => {
    render(<About />);
    
    expect(screen.getByText('What I Bring to the Table')).toBeInTheDocument();
    expect(screen.getByText(/Expert in \.NET Core\/8, C#, and modern web technologies/)).toBeInTheDocument();
    expect(screen.getByText(/Proficient in Angular, React, TypeScript, and responsive design/)).toBeInTheDocument();
  });

  it('shows achievement statistics', () => {
    render(<About />);
    
    expect(screen.getByText('12+')).toBeInTheDocument();
    expect(screen.getByText('Years of Experience')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('Technologies Mastered')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<About />);
    
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    expect(screen.getByText('april.galea@live.com.ph')).toBeInTheDocument();
    expect(screen.getByText('Philippines')).toBeInTheDocument();
    expect(screen.getByText('Available for new opportunities')).toBeInTheDocument();
  });

  it('renders resume download link when available', () => {
    render(<About />);
    
    const resumeLink = screen.getByText('Download Resume').closest('a');
    expect(resumeLink).toHaveAttribute('href', '/documents/resume.zip');
    expect(resumeLink).toHaveAttribute('download');
  });

  it('displays professional avatar with initials', () => {
    render(<About />);
    
    expect(screen.getByText('AG')).toBeInTheDocument();
    expect(screen.getByText('April Galea')).toBeInTheDocument();
    expect(screen.getByText('.Net Developer')).toBeInTheDocument();
  });

  it('has proper responsive grid layout', () => {
    const { container } = render(<About />);
    
    const gridContainer = container.querySelector('.grid-cols-1.lg\\:grid-cols-2');
    expect(gridContainer).toBeInTheDocument();
  });

  it('includes achievement icons', () => {
    render(<About />);
    
    expect(screen.getByTestId('code')).toBeInTheDocument();
    expect(screen.getByTestId('award')).toBeInTheDocument();
    expect(screen.getByTestId('users')).toBeInTheDocument();
    expect(screen.getByTestId('coffee')).toBeInTheDocument();
  });

  it('renders email as clickable mailto link', () => {
    render(<About />);
    
    const emailLink = screen.getByText('april.galea@live.com.ph');
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:april.galea@live.com.ph');
  });

  it('displays current role information', () => {
    render(<About />);
    
    expect(screen.getByText('.Net Developer')).toBeInTheDocument();
  });
});