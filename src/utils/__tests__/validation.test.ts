import {
  isProject,
  isExperience,
  isSkill,
  validateEmail,
  validateContactForm,
  sortProjectsByDate,
  groupSkillsByCategory,
  getFeaturedProjects
} from '../validation';
import type { Project, Experience, Skill, ContactForm } from '../../types';

describe('Type Guards', () => {
  describe('isProject', () => {
    it('should return true for valid project object', () => {
      const validProject = {
        id: '1',
        title: 'Test Project',
        description: 'Test description',
        longDescription: 'Long test description',
        technologies: ['React', 'TypeScript'],
        images: ['image1.jpg'],
        featured: true,
        category: 'web' as const,
        startDate: '2024-01-01'
      };

      expect(isProject(validProject)).toBe(true);
    });

    it('should return false for invalid project object', () => {
      const invalidProject = {
        id: '1',
        title: 'Test Project',
        // missing required fields
      };

      expect(isProject(invalidProject)).toBe(false);
    });
  });

  describe('isExperience', () => {
    it('should return true for valid experience object', () => {
      const validExperience = {
        id: '1',
        company: 'Test Company',
        role: 'Developer',
        startDate: '2024-01-01',
        location: 'Remote',
        description: 'Test description',
        achievements: ['Achievement 1'],
        technologies: ['React'],
        current: true
      };

      expect(isExperience(validExperience)).toBe(true);
    });
  });

  describe('isSkill', () => {
    it('should return true for valid skill object', () => {
      const validSkill = {
        name: 'React',
        category: 'frontend' as const
      };

      expect(isSkill(validSkill)).toBe(true);
    });
  });
});

describe('Validation Functions', () => {
  describe('validateEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('validateContactForm', () => {
    it('should return no errors for valid form', () => {
      const validForm: ContactForm = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message with enough content.'
      };

      const errors = validateContactForm(validForm);
      expect(errors).toHaveLength(0);
    });

    it('should return errors for invalid form', () => {
      const invalidForm: ContactForm = {
        name: '',
        email: 'invalid-email',
        subject: 'Hi',
        message: 'Short'
      };

      const errors = validateContactForm(invalidForm);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.field === 'name')).toBe(true);
      expect(errors.some(e => e.field === 'email')).toBe(true);
      expect(errors.some(e => e.field === 'subject')).toBe(true);
      expect(errors.some(e => e.field === 'message')).toBe(true);
    });
  });
});

describe('Utility Functions', () => {
  describe('sortProjectsByDate', () => {
    it('should sort projects by start date in descending order', () => {
      const projects: Project[] = [
        {
          id: '1',
          title: 'Project 1',
          description: 'Desc 1',
          longDescription: 'Long desc 1',
          technologies: [],
          images: [],
          featured: false,
          category: 'web',
          startDate: '2023-01-01'
        },
        {
          id: '2',
          title: 'Project 2',
          description: 'Desc 2',
          longDescription: 'Long desc 2',
          technologies: [],
          images: [],
          featured: false,
          category: 'web',
          startDate: '2024-01-01'
        }
      ];

      const sorted = sortProjectsByDate(projects);
      expect(sorted[0].id).toBe('2');
      expect(sorted[1].id).toBe('1');
    });
  });

  describe('groupSkillsByCategory', () => {
    it('should group skills by category', () => {
      const skills: Skill[] = [
        { name: 'React', category: 'frontend' },
        { name: 'Node.js', category: 'backend' },
        { name: 'Vue.js', category: 'frontend' }
      ];

      const grouped = groupSkillsByCategory(skills);
      expect(grouped.frontend).toHaveLength(2);
      expect(grouped.backend).toHaveLength(1);
    });
  });

  describe('getFeaturedProjects', () => {
    it('should return only featured projects', () => {
      const projects: Project[] = [
        {
          id: '1',
          title: 'Project 1',
          description: 'Desc 1',
          longDescription: 'Long desc 1',
          technologies: [],
          images: [],
          featured: true,
          category: 'web',
          startDate: '2023-01-01'
        },
        {
          id: '2',
          title: 'Project 2',
          description: 'Desc 2',
          longDescription: 'Long desc 2',
          technologies: [],
          images: [],
          featured: false,
          category: 'web',
          startDate: '2024-01-01'
        }
      ];

      const featured = getFeaturedProjects(projects);
      expect(featured).toHaveLength(1);
      expect(featured[0].id).toBe('1');
    });
  });
});