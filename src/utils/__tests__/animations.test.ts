import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { describe } from 'vitest';
import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  slideInFromBottom,
  bounceIn,
  hoverScale,
  hoverLift,
  pageTransition,
  createTypingAnimation,
  pulseAnimation,
  spinAnimation,
  cardHover,
  buttonTap,
  progressBar,
  revealSection,
  // New animations
  scrollFadeIn,
  scrollFadeInLeft,
  scrollFadeInRight,
  scrollScale,
  staggeredList,
  staggeredItem,
  navbarAnimation,
  mobileMenuAnimation,
  pageLoadingAnimation,
  loadingSpinnerAnimation,
  revealUp,
  revealDown,
  revealLeft,
  revealRight
} from '../animations';

describe('Animation Utilities', () => {
  describe('Basic fade animations', () => {
    it('should have correct fadeInUp animation properties', () => {
      expect(fadeInUp.hidden).toEqual({
        opacity: 0,
        y: 30,
      });
      expect(fadeInUp.visible).toMatchObject({
        opacity: 1,
        y: 0,
      });
    });

    it('should have correct fadeInDown animation properties', () => {
      expect(fadeInDown.hidden).toEqual({
        opacity: 0,
        y: -30,
      });
      expect(fadeInDown.visible).toMatchObject({
        opacity: 1,
        y: 0,
      });
    });

    it('should have correct fadeInLeft animation properties', () => {
      expect(fadeInLeft.hidden).toEqual({
        opacity: 0,
        x: -30,
      });
      expect(fadeInLeft.visible).toMatchObject({
        opacity: 1,
        x: 0,
      });
    });

    it('should have correct fadeInRight animation properties', () => {
      expect(fadeInRight.hidden).toEqual({
        opacity: 0,
        x: 30,
      });
      expect(fadeInRight.visible).toMatchObject({
        opacity: 1,
        x: 0,
      });
    });
  });

  describe('Scale and special animations', () => {
    it('should have correct scaleIn animation properties', () => {
      expect(scaleIn.hidden).toEqual({
        opacity: 0,
        scale: 0.8,
      });
      expect(scaleIn.visible).toMatchObject({
        opacity: 1,
        scale: 1,
      });
    });

    it('should have correct bounceIn animation properties', () => {
      expect(bounceIn.hidden).toEqual({
        opacity: 0,
        scale: 0.3,
      });
      expect(bounceIn.visible).toMatchObject({
        opacity: 1,
        scale: 1,
      });
    });

    it('should have correct slideInFromBottom animation properties', () => {
      expect(slideInFromBottom.hidden).toEqual({
        opacity: 0,
        y: 50,
      });
      expect(slideInFromBottom.visible).toMatchObject({
        opacity: 1,
        y: 0,
      });
    });
  });

  describe('Container animations', () => {
    it('should have correct staggerContainer properties', () => {
      expect(staggerContainer.hidden).toEqual({});
      expect(staggerContainer.visible).toMatchObject({
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      });
    });

    it('should have correct revealSection properties', () => {
      expect(revealSection.hidden).toEqual({
        opacity: 0,
        y: 50,
      });
      expect(revealSection.visible).toMatchObject({
        opacity: 1,
        y: 0,
      });
    });
  });

  describe('Hover animations', () => {
    it('should have correct hoverScale properties', () => {
      expect(hoverScale).toMatchObject({
        scale: 1.05,
        transition: {
          duration: 0.2,
          ease: 'easeInOut',
        },
      });
    });

    it('should have correct hoverLift properties', () => {
      expect(hoverLift).toMatchObject({
        y: -5,
        transition: {
          duration: 0.2,
          ease: 'easeInOut',
        },
      });
    });

    it('should have correct cardHover properties', () => {
      expect(cardHover.rest).toMatchObject({
        scale: 1,
        y: 0,
      });
      expect(cardHover.hover).toMatchObject({
        scale: 1.02,
        y: -5,
      });
    });
  });

  describe('Interactive animations', () => {
    it('should have correct buttonTap properties', () => {
      expect(buttonTap).toMatchObject({
        scale: 0.95,
        transition: {
          duration: 0.1,
        },
      });
    });

    it('should have correct pageTransition properties', () => {
      expect(pageTransition).toMatchObject({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 },
      });
    });
  });

  describe('Utility functions', () => {
    it('should create typing animation with correct properties', () => {
      const text = 'Hello World';
      const speed = 100;
      const animation = createTypingAnimation(text, speed);

      expect(animation.hidden).toEqual({ width: 0 });
      expect(animation.visible).toMatchObject({
        width: 'auto',
        transition: {
          duration: (text.length * speed) / 1000,
          ease: 'linear',
        },
      });
    });

    it('should create typing animation with default speed', () => {
      const text = 'Test';
      const animation = createTypingAnimation(text);

      expect(animation.visible.transition.duration).toBe(0.4); // 4 characters * 100ms / 1000
    });
  });

  describe('Loading animations', () => {
    it('should have correct pulseAnimation properties', () => {
      expect(pulseAnimation.animate).toMatchObject({
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      });
    });

    it('should have correct spinAnimation properties', () => {
      expect(spinAnimation.animate).toMatchObject({
        rotate: 360,
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        },
      });
    });
  });

  describe('Progress animations', () => {
    it('should create progress bar animation with percentage', () => {
      const percentage = 75;
      const animation = progressBar.visible(percentage);

      expect(animation).toMatchObject({
        width: '75%',
        transition: {
          duration: 1.5,
          ease: 'easeOut',
          delay: 0.5,
        },
      });
    });

    it('should have correct progressBar hidden state', () => {
      expect(progressBar.hidden).toEqual({ width: 0 });
    });
  });
});

describe('Scroll-triggered animations', () => {
  it('should have correct scrollFadeIn animation properties', () => {
    expect(scrollFadeIn.hidden).toEqual({
      opacity: 0,
      y: 30,
    });
    expect(scrollFadeIn.visible).toMatchObject({
      opacity: 1,
      y: 0,
    });
  });

  it('should have correct scrollFadeInLeft animation properties', () => {
    expect(scrollFadeInLeft.hidden).toEqual({
      opacity: 0,
      x: -50,
    });
    expect(scrollFadeInLeft.visible).toMatchObject({
      opacity: 1,
      x: 0,
    });
  });

  it('should have correct scrollFadeInRight animation properties', () => {
    expect(scrollFadeInRight.hidden).toEqual({
      opacity: 0,
      x: 50,
    });
    expect(scrollFadeInRight.visible).toMatchObject({
      opacity: 1,
      x: 0,
    });
  });

  it('should have correct scrollScale animation properties', () => {
    expect(scrollScale.hidden).toEqual({
      opacity: 0,
      scale: 0.8,
    });
    expect(scrollScale.visible).toMatchObject({
      opacity: 1,
      scale: 1,
    });
  });
});

describe('Staggered animations', () => {
  it('should have correct staggeredList animation properties', () => {
    expect(staggeredList.hidden).toEqual({});
    expect(staggeredList.visible).toMatchObject({
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    });
  });

  it('should have correct staggeredItem animation properties', () => {
    expect(staggeredItem.hidden).toEqual({
      opacity: 0,
      y: 20,
    });
    expect(staggeredItem.visible).toMatchObject({
      opacity: 1,
      y: 0,
    });
  });
});

describe('Navigation animations', () => {
  it('should have correct navbarAnimation properties', () => {
    expect(navbarAnimation.hidden).toEqual({
      y: -100,
      opacity: 0,
    });
    expect(navbarAnimation.visible).toMatchObject({
      y: 0,
      opacity: 1,
    });
  });

  it('should have correct mobileMenuAnimation properties', () => {
    expect(mobileMenuAnimation.hidden).toEqual({
      height: 0,
      opacity: 0,
    });
    expect(mobileMenuAnimation.visible).toMatchObject({
      height: 'auto',
      opacity: 1,
    });
  });
});

describe('Page loading animations', () => {
  it('should have correct pageLoadingAnimation properties', () => {
    expect(pageLoadingAnimation.hidden).toEqual({
      opacity: 0,
    });
    expect(pageLoadingAnimation.visible).toMatchObject({
      opacity: 1,
    });
  });

  it('should have correct loadingSpinnerAnimation properties', () => {
    expect(loadingSpinnerAnimation.animate).toMatchObject({
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    });
  });
});

describe('Section reveal animations', () => {
  it('should have correct revealUp animation properties', () => {
    expect(revealUp.hidden).toEqual({
      opacity: 0,
      y: 50,
    });
    expect(revealUp.visible).toMatchObject({
      opacity: 1,
      y: 0,
    });
  });

  it('should have correct revealDown animation properties', () => {
    expect(revealDown.hidden).toEqual({
      opacity: 0,
      y: -50,
    });
    expect(revealDown.visible).toMatchObject({
      opacity: 1,
      y: 0,
    });
  });

  it('should have correct revealLeft animation properties', () => {
    expect(revealLeft.hidden).toEqual({
      opacity: 0,
      x: -50,
    });
    expect(revealLeft.visible).toMatchObject({
      opacity: 1,
      x: 0,
    });
  });

  it('should have correct revealRight animation properties', () => {
    expect(revealRight.hidden).toEqual({
      opacity: 0,
      x: 50,
    });
    expect(revealRight.visible).toMatchObject({
      opacity: 1,
      x: 0,
    });
  });
});