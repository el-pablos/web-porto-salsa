import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BouncyEntrance } from '@/components/effects/BouncyEntrance';

describe('BouncyEntrance', () => {
  it('renders children content', () => {
    render(<BouncyEntrance><p>Hello bouncy</p></BouncyEntrance>);
    expect(screen.getByText('Hello bouncy')).toBeInTheDocument();
  });

  it('renders bouncy-entrance wrapper', () => {
    render(<BouncyEntrance><span>Content</span></BouncyEntrance>);
    expect(screen.getByTestId('bouncy-entrance')).toBeInTheDocument();
  });
});
