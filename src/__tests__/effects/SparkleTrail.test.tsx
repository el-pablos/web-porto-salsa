import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SparkleTrail } from '@/components/effects/SparkleTrail';

// Mock matchMedia to simulate mobile (sparkle trail disabled on mobile)
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: true, // simulate mobile = trail returns null
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('SparkleTrail', () => {
  it('renders null on mobile devices', () => {
    const { container } = render(<SparkleTrail />);
    expect(container.querySelector('canvas')).toBeNull();
  });
});
