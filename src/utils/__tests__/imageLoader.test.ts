import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { 
  isWebPSupported, 
  getOptimizedImagePath, 
  generateSrcSet, 
  getImageDimensions 
} from '../imageLoader';

describe('imageLoader utility', () => {
  beforeEach(() => {
    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: {
          contains: vi.fn()
        }
      },
      writable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('isWebPSupported', () => {
    it('should return true when webp class is present', () => {
      (document.documentElement.classList.contains as any).mockReturnValue(true);
      expect(isWebPSupported()).toBe(true);
    });

    it('should return false when webp class is not present', () => {
      (document.documentElement.classList.contains as any).mockReturnValue(false);
      expect(isWebPSupported()).toBe(false);
    });
  });

  describe('getOptimizedImagePath', () => {
    it('should return empty string for empty input', () => {
      expect(getOptimizedImagePath('')).toBe('');
    });

    it('should return webp version when webp is supported', () => {
      (document.documentElement.classList.contains as any).mockReturnValue(true);
      expect(getOptimizedImagePath('image.jpg')).toBe('image.webp');
      expect(getOptimizedImagePath('image.png')).toBe('image.webp');
    });

    it('should return original path when webp is not supported', () => {
      (document.documentElement.classList.contains as any).mockReturnValue(false);
      expect(getOptimizedImagePath('image.jpg')).toBe('image.jpg');
    });

    it('should return original path when already webp', () => {
      (document.documentElement.classList.contains as any).mockReturnValue(true);
      expect(getOptimizedImagePath('image.webp')).toBe('image.webp');
    });
  });

  describe('generateSrcSet', () => {
    it('should return empty string for empty input', () => {
      expect(generateSrcSet('')).toBe('');
    });

    it('should generate srcset with webp when supported', () => {
      (document.documentElement.classList.contains as any).mockReturnValue(true);
      const result = generateSrcSet('image.jpg');
      expect(result).toBe('image-400.webp 400w, image-800.webp 800w, image-1200.webp 1200w');
    });

    it('should generate srcset with original extension when webp not supported', () => {
      (document.documentElement.classList.contains as any).mockReturnValue(false);
      const result = generateSrcSet('image.jpg');
      expect(result).toBe('image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w');
    });

    it('should use custom sizes when provided', () => {
      (document.documentElement.classList.contains as any).mockReturnValue(true);
      const result = generateSrcSet('image.jpg', [300, 600]);
      expect(result).toBe('image-300.webp 300w, image-600.webp 600w');
    });
  });

  describe('getImageDimensions', () => {
    it('should return null for images without dimension pattern', () => {
      expect(getImageDimensions('image.jpg')).toBeNull();
    });

    it('should extract dimensions from filename with pattern', () => {
      expect(getImageDimensions('image-800x600.jpg')).toEqual({
        width: 800,
        height: 600
      });
    });
  });
});