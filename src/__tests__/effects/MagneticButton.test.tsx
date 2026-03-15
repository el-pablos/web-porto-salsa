import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MagneticButton } from '@/components/effects/MagneticButton';

// jsdom tidak memiliki window.matchMedia, perlu di-mock
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query === '(pointer: fine)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
});

describe('MagneticButton', () => {
  it('renders children correctly', () => {
    render(
      <MagneticButton>
        <button>Klik Saya</button>
      </MagneticButton>
    );
    expect(screen.getByText('Klik Saya')).toBeInTheDocument();
  });

  it('renders magnetic-button wrapper on desktop pointer', () => {
    render(
      <MagneticButton>
        <button>Test Button</button>
      </MagneticButton>
    );
    expect(screen.getByTestId('magnetic-button')).toBeInTheDocument();
  });
});
