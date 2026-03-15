import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ParallaxLayer } from '@/components/effects/ParallaxLayer';

describe('ParallaxLayer', () => {
  it('renders children correctly', () => {
    render(
      <ParallaxLayer>
        <span data-testid="child-content">Hello Parallax</span>
      </ParallaxLayer>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Hello Parallax')).toBeInTheDocument();
  });

  it('renders parallax-layer wrapper', () => {
    render(
      <ParallaxLayer>
        <div>Content</div>
      </ParallaxLayer>
    );

    expect(screen.getByTestId('parallax-layer')).toBeInTheDocument();
  });

  it('renders with custom speed prop', () => {
    render(
      <ParallaxLayer speed={0.3}>
        <p>Slow layer</p>
      </ParallaxLayer>
    );

    expect(screen.getByTestId('parallax-layer')).toBeInTheDocument();
    expect(screen.getByText('Slow layer')).toBeInTheDocument();
  });

  it('renders with custom className prop', () => {
    render(
      <ParallaxLayer className="absolute inset-0">
        <p>Positioned layer</p>
      </ParallaxLayer>
    );

    const layer = screen.getByTestId('parallax-layer');
    expect(layer).toBeInTheDocument();
    expect(layer).toHaveClass('absolute', 'inset-0');
  });

  it('renders multiple children', () => {
    render(
      <ParallaxLayer>
        <span data-testid="child-1">First</span>
        <span data-testid="child-2">Second</span>
      </ParallaxLayer>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });
});
