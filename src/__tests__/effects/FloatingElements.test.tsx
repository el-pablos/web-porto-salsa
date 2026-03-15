import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FloatingElements } from '@/components/effects/FloatingElements';

describe('FloatingElements', () => {
  it('renders floating container', () => {
    render(<FloatingElements />);
    expect(screen.getByTestId('floating-elements')).toBeInTheDocument();
  });

  it('renders floating shape items', () => {
    const { container } = render(<FloatingElements />);
    const items = container.querySelectorAll('[data-testid="floating-elements"] > div');
    expect(items.length).toBe(12);
  });
});
