import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hero } from '@/components/Hero';

jest.mock('@/components/effects/LaserFlow', () => ({
  LaserFlow: () => <div data-testid="laser-flow" />,
}));

jest.mock('@/components/effects/FloatingElements', () => ({
  FloatingElements: () => <div data-testid="floating-elements" />,
}));

jest.mock('@/components/effects/ParallaxLayer', () => ({
  ParallaxLayer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="parallax-layer">{children}</div>
  ),
}));

jest.mock('react-type-animation', () => ({
  TypeAnimation: (props: { sequence?: unknown[]; className?: string }) => (
    <span data-testid="type-animation" className={props.className}>
      {String(props.sequence?.[0] ?? '')}
    </span>
  ),
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: query === '(pointer: coarse)',
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

describe('Hero', () => {
  it('renders badge text', () => {
    render(<Hero />);
    expect(screen.getByText('Data Analyst & Researcher')).toBeInTheDocument();
  });

  it('renders name with shuffle text', () => {
    render(<Hero />);
    expect(screen.getByTestId('shuffle-text')).toBeInTheDocument();
  });

  it('renders heading text', () => {
    render(<Hero />);
    expect(screen.getByText(/Halo, Saya/)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Lihat Portofolio')).toBeInTheDocument();
    expect(screen.getByText('Mari Berdiskusi')).toBeInTheDocument();
  });

  it('renders hero section element', () => {
    render(<Hero />);
    expect(
      screen.getByText('Data Analyst & Researcher').closest('section')
    ).toHaveAttribute('id', 'beranda');
  });

  it('renders typewriter subtitle', () => {
    render(<Hero />);
    expect(screen.getByTestId('typewriter-subtitle')).toBeInTheDocument();
  });
});
