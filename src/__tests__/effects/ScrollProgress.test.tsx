import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollProgress } from '@/components/effects/ScrollProgress';

describe('ScrollProgress', () => {
  it('renders scroll progress element', () => {
    render(<ScrollProgress />);
    expect(screen.getByTestId('scroll-progress')).toBeInTheDocument();
  });
});
