import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TiltCard } from '@/components/effects/TiltCard';

jest.mock('vanilla-tilt', () => ({
  default: { init: jest.fn() },
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});

describe('TiltCard', () => {
  it('renders children correctly', () => {
    render(<TiltCard><p>Konten test</p></TiltCard>);
    expect(screen.getByText('Konten test')).toBeInTheDocument();
  });

  it('renders tilt-card wrapper', () => {
    render(<TiltCard><span>Isi card</span></TiltCard>);
    expect(screen.getByTestId('tilt-card')).toBeInTheDocument();
  });
});
