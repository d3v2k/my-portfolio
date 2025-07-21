import { useState, useEffect } from 'react';
import { getOptimizedImagePath, generateSrcSet } from '../../utils/imageLoader';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  sizes = '100vw',
  width,
  height,
  priority = false,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Get optimized image path
  const optimizedSrc = getOptimizedImagePath(src);
  
  // Generate srcSet for responsive images
  const srcSet = generateSrcSet(src);
  
  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Handle image error
  const handleError = () => {
    setError(true);
    if (onError) onError();
  };
  
  // Preload image if priority is true
  useEffect(() => {
    if (priority && optimizedSrc) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = optimizedSrc;
      document.head.appendChild(preloadLink);
      
      return () => {
        document.head.removeChild(preloadLink);
      };
    }
    return () => {}; // Return empty cleanup function for non-priority images
  }, [optimizedSrc, priority]);
  
  // If error, show placeholder
  if (error) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <div className="text-gray-400 text-center">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-xs">{alt}</div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {/* Show skeleton while loading */}
      {!isLoaded && (
        <div className={`bg-gray-100 animate-pulse ${className}`} style={{ width, height }} />
      )}
      
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={`${className} ${!isLoaded ? 'invisible absolute' : ''}`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        width={width}
        height={height}
      />
    </>
  );
}