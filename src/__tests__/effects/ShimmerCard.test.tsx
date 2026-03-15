import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ShimmerCard } from '@/components/effects/ShimmerCard';

describe('ShimmerCard', () => {
  it('renders children content', () => {
    render(<ShimmerCard><p>Test content</p></ShimmerCard>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders shimmer card wrapper', () => {
    render(<ShimmerCard><p>Child</p></ShimmerCard>);
    expect(screen.getByTestId('shimmer-card')).toBeInTheDocument();
  });
});
