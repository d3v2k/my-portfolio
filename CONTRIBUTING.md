# Contributing to April Galea's Portfolio

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a suggestion for improvement:

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with a clear title and description
3. **Include steps to reproduce** for bugs
4. **Add screenshots** if applicable

### Submitting Changes

1. **Fork the repository**
2. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the coding standards
4. **Test your changes** thoroughly
5. **Commit with conventional messages**
6. **Push to your fork** and create a pull request

## 📋 Development Guidelines

### Code Standards

#### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` types when possible
- Use meaningful variable and function names

#### React Components
- Use functional components with hooks
- Implement proper prop types
- Follow the single responsibility principle
- Use meaningful component and file names

#### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS custom properties for theme values

#### Testing
- Write tests for new components and utilities
- Maintain test coverage above 80%
- Use descriptive test names
- Mock external dependencies properly

### File Organization

```
src/
├── components/
│   ├── layout/          # Layout components
│   ├── sections/        # Page sections
│   └── ui/             # Reusable UI components
├── data/               # JSON data files
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
├── utils/              # Utility functions
└── constants/          # Application constants
```

### Naming Conventions

- **Components**: PascalCase (`MyComponent.tsx`)
- **Files**: kebab-case (`my-utility.ts`)
- **Variables**: camelCase (`myVariable`)
- **Constants**: UPPER_SNAKE_CASE (`MY_CONSTANT`)
- **CSS Classes**: kebab-case (`my-class-name`)

## 🧪 Testing Requirements

### Running Tests

```bash
# Run all tests
npm run test:run

# Run tests in watch mode
npm run test

# Run with coverage
npm run test:coverage
```

### Test Categories

1. **Unit Tests**: Individual functions and components
2. **Integration Tests**: Component interactions
3. **Accessibility Tests**: WCAG compliance
4. **Performance Tests**: Bundle size and loading

### Writing Tests

- Test component rendering and behavior
- Test user interactions and events
- Test error handling and edge cases
- Mock external dependencies
- Use descriptive test descriptions

## 🎨 Design Guidelines

### Visual Design
- Follow the established color scheme
- Maintain consistent spacing (8px grid)
- Use appropriate typography hierarchy
- Ensure proper contrast ratios

### User Experience
- Prioritize accessibility and keyboard navigation
- Implement smooth animations and transitions
- Ensure responsive design across all devices
- Optimize for performance and loading speed

### Animation Guidelines
- Use subtle, purposeful animations
- Respect user preferences for reduced motion
- Maintain 60fps performance
- Keep animation durations reasonable (200-500ms)

## 📝 Commit Message Format

Use conventional commit messages:

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(hero): add animated typing effect
fix(navigation): resolve mobile menu toggle issue
docs(readme): update installation instructions
test(about): add comprehensive component tests
```

## 🔍 Code Review Process

### Before Submitting
- [ ] Code follows project standards
- [ ] Tests pass and coverage is maintained
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Responsive design is tested
- [ ] Accessibility is verified

### Review Criteria
- Code quality and maintainability
- Performance implications
- Security considerations
- User experience impact
- Test coverage and quality

## 🚀 Deployment

### Development Environment
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Production Deployment
- Automatic deployment via Vercel/Netlify
- Manual deployment of `dist/` folder
- Environment variables configuration
- Performance monitoring setup

## 📚 Resources

### Documentation
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)

### Tools
- [Vite](https://vitejs.dev/) - Build tool
- [Vitest](https://vitest.dev/) - Testing framework
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## 🆘 Getting Help

If you need help or have questions:

1. **Check the documentation** and existing issues
2. **Ask in discussions** for general questions
3. **Create an issue** for specific problems
4. **Contact the maintainer** for urgent matters

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to make this portfolio even better! 🎉