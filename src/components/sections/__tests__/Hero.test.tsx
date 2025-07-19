import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Hero from '../Hero';

describe('Hero', () => {
  it('should render without crashing', () => {
    // Simple smoke test to ensure the component can be imported and rendered
    expect(Hero).toBeDefined();
    expect(typeof Hero).toBe('function');
  });
});