# Deployment Guide

This guide covers different deployment options for the April Galea Portfolio website.

## 🚀 Quick Deploy Options

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/portfolio)

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Vercel will automatically detect it's a Vite project

2. **Configure Settings** (Auto-detected)
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your site will be available at `https://your-project.vercel.app`

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/portfolio)

1. **Connect Repository**
   - Connect your GitHub repository to Netlify

2. **Build Settings**
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Node Version: `18` (in Environment Variables)

3. **Deploy**
   - Netlify will build and deploy automatically
   - Your site will be available at `https://your-project.netlify.app`

## 🔧 Manual Deployment

### Build the Project

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The built files will be in the 'dist' directory
```

### Static Hosting Providers

#### GitHub Pages

1. **Build the project** locally
2. **Push the `dist` folder** to a `gh-pages` branch
3. **Enable GitHub Pages** in repository settings
4. **Set source** to `gh-pages` branch

```bash
# Build and deploy to GitHub Pages
npm run build
npx gh-pages -d dist
```

#### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

#### AWS S3 + CloudFront

1. **Create S3 bucket** for static website hosting
2. **Upload `dist` folder** contents to S3
3. **Configure CloudFront** distribution
4. **Set up custom domain** (optional)

## 🌐 Custom Domain Setup

### Vercel Custom Domain

1. **Go to Project Settings** in Vercel dashboard
2. **Navigate to Domains** section
3. **Add your custom domain**
4. **Configure DNS** records as instructed
5. **SSL certificate** will be automatically provisioned

### Netlify Custom Domain

1. **Go to Site Settings** in Netlify dashboard
2. **Navigate to Domain Management**
3. **Add custom domain**
4. **Update DNS** records as instructed
5. **Force HTTPS** in domain settings

## 🔒 Environment Variables

### Production Environment Variables

Create environment variables for production:

```bash
# Vercel
vercel env add VITE_API_URL production

# Netlify
netlify env:set VITE_API_URL "https://api.example.com"
```

### Environment File (.env.production)

```env
# API Configuration
VITE_API_URL=https://api.yourdomain.com

# Analytics
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID

# Contact Form
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id

# Social Media
VITE_GITHUB_URL=https://github.com/your-username
VITE_LINKEDIN_URL=https://linkedin.com/in/your-profile
```

## 📊 Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build
npm run analyze

# Run Lighthouse audit
npm run build
npm run preview
# In a separate terminal
npm run test:performance

# Check for unused dependencies
npx depcheck
```

### Performance Features Implemented

- [x] **Lazy Loading**
  - React.lazy and Suspense for component code splitting
  - Loading attribute for images
  - Intersection Observer for on-demand loading

- [x] **Image Optimization**
  - WebP format with browser detection
  - Responsive images with srcset and sizes attributes
  - Optimized image component with fallbacks
  - Placeholder loading states

- [x] **Code Splitting**
  - Route-based code splitting
  - Component-level code splitting
  - Vendor bundle separation
  - Dynamic imports for heavy components

- [x] **Caching Strategy**
  - Service worker implementation
  - Static asset caching
  - Offline capability
  - Cache invalidation strategy

- [x] **Build Optimization**
  - Tree shaking for unused code
  - Minification and compression
  - Bundle size analysis
  - Critical CSS extraction

### Performance Checklist

- [x] **Images optimized** (WebP format, responsive sizing)
- [x] **Code splitting** implemented with React.lazy
- [x] **Lazy loading** for components and images
- [x] **Service worker** for caching and offline capability
- [ ] **Gzip/Brotli compression** enabled (configured at hosting level)
- [ ] **CDN** configured for assets (configured at hosting level)

## 🔍 Monitoring and Analytics

### Google Analytics Setup

1. **Create GA4 property**
2. **Add tracking ID** to environment variables
3. **Implement tracking** in components
4. **Verify data collection**

### Performance Monitoring

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Web Vitals monitoring
npm install web-vitals
```

## 🚨 Troubleshooting

### Common Build Issues

#### Node.js Version
```bash
# Use Node.js 18+
node --version
nvm use 18  # if using nvm
```

#### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Fix type errors before building
npm run lint:fix
```

### Deployment Issues

#### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs for specific errors
- Ensure environment variables are set

#### Runtime Errors
- Check browser console for JavaScript errors
- Verify API endpoints are accessible
- Test responsive design on different devices
- Validate HTML and accessibility

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing (`npm run test:run`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code formatted (`npm run format`)
- [ ] TypeScript compilation successful

### Content Review
- [ ] Personal information updated
- [ ] Project descriptions accurate
- [ ] Contact information correct
- [ ] Resume/CV link working
- [ ] Social media links valid

### Performance
- [ ] Images optimized and compressed
- [ ] Bundle size reasonable (< 1MB)
- [ ] Lighthouse score > 90
- [ ] Mobile responsiveness tested
- [ ] Cross-browser compatibility verified

### SEO and Accessibility
- [ ] Meta tags configured
- [ ] Open Graph tags set
- [ ] Alt text for images
- [ ] Proper heading hierarchy
- [ ] Keyboard navigation working
- [ ] Screen reader compatibility

## 🔄 Continuous Deployment

### GitHub Actions (Included)

The project includes a CI/CD pipeline that:
- Runs tests on every push
- Builds the project
- Deploys to production on main branch

### Automatic Deployments

Both Vercel and Netlify support automatic deployments:
- **Push to main branch** → Production deployment
- **Push to develop branch** → Preview deployment
- **Pull requests** → Preview deployments

---

## 📞 Support

If you encounter issues during deployment:

1. **Check the build logs** for specific error messages
2. **Review this guide** for common solutions
3. **Consult platform documentation** (Vercel, Netlify, etc.)
4. **Create an issue** in the repository for help

Happy deploying! 🚀