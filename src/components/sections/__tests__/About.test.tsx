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
    name: 'John Developer',
    title: 'Senior Full Stack .NET Developer',
    email: 'john.developer@email.com',
    location: 'Remote, USA',
    summary: 'Passionate full stack .NET developer with 6+ years of experience building scalable web applications and APIs.',
    resumeUrl: '/documents/John_Developer_Resume.pdf'
  },
  getDataStats: () => ({
    totalProjects: 5,
    featuredProjects: 3,
    totalExperience: 4,
    currentRole: 'Senior Full Stack Developer',
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
    expect(screen.getByText('Passionate full stack .NET developer with 6+ years of experience building scalable web applications and APIs.')).toBeInTheDocument();
  });

  it('displays professional highlights', () => {
    render(<About />);
    
    expect(screen.getByText('What I Bring to the Table')).toBeInTheDocument();
    expect(screen.getByText(/Expert in \.NET Core\/8, C#, and modern web technologies/)).toBeInTheDocument();
    expect(screen.getByText(/Proficient in Angular, React, TypeScript, and responsive design/)).toBeInTheDocument();
  });

  it('shows achievement statistics', () => {
    render(<About />);
    
    expect(screen.getByText('6+')).toBeInTheDocument();
    expect(screen.getByText('Years of Experience')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('Technologies Mastered')).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<About />);
    
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    expect(screen.getByText('john.developer@email.com')).toBeInTheDocument();
    expect(screen.getByText('Remote, USA')).toBeInTheDocument();
    expect(screen.getByText('Available for new opportunities')).toBeInTheDocument();
  });

  it('renders resume download link when available', () => {
    render(<About />);
    
    const resumeLink = screen.getByText('Download Resume').closest('a');
    expect(resumeLink).toHaveAttribute('href', '/documents/John_Developer_Resume.pdf');
    expect(resumeLink).toHaveAttribute('download');
  });

  it('displays professional avatar with initials', () => {
    render(<About />);
    
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByText('John Developer')).toBeInTheDocument();
    expect(screen.getByText('Senior Full Stack .NET Developer')).toBeInTheDocument();
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
    
    const emailLink = screen.getByText('john.developer@email.com');
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:john.developer@email.com');
  });

  it('displays current role information', () => {
    render(<About />);
    
    expect(screen.getByText('Senior Full')).toBeInTheDocument();
    expect(screen.getByText('Leading development teams')).toBeInTheDocument();
  });
});