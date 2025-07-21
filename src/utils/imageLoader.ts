/**
 * Utility for optimized image loading
 */

// Check if WebP is supported
export const isWebPSupported = (): boolean => {
  return document.documentElement.classList.contains('webp');
};

// Get appropriate image format based on browser support
export const getOptimizedImagePath = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If WebP is supported and the image is not already WebP, use WebP version
  if (isWebPSupported() && !imagePath.endsWith('.webp')) {
    // Check if we have a WebP version available
    const webpPath = imagePath.replace(/\.(jpe?g|png)$/i, '.webp');
    return webpPath;
  }
  
  return imagePath;
};

// Generate srcSet for responsive images
export const generateSrcSet = (
  imagePath: string, 
  sizes: number[] = [400, 800, 1200]
): string => {
  if (!imagePath) return '';
  
  const basePath = imagePath.replace(/\.(jpe?g|png|webp)$/i, '');
  const extension = isWebPSupported() ? 'webp' : imagePath.split('.').pop();
  
  return sizes
    .map(size => `${basePath}-${size}.${extension} ${size}w`)
    .join(', ');
};

// Get image dimensions from filename (if follows pattern image-800x600.jpg)
export const getImageDimensions = (
  imagePath: string
): { width: number; height: number } | null => {
  const match = imagePath.match(/-(\d+)x(\d+)\./);
  if (match && match.length === 3) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10)
    };
  }
  return null;
};

// Preload critical images
export const preloadCriticalImages = (imagePaths: string[]): void => {
  imagePaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getOptimizedImagePath(path);
    document.head.appendChild(link);
  });
};