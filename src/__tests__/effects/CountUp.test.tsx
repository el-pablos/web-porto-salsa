import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CountUp } from '@/components/effects/CountUp';

describe('CountUp', () => {
  it('renders count up element', () => {
    render(<CountUp end={100} />);
    expect(screen.getByTestId('count-up')).toBeInTheDocument();
  });

  it('starts from 0 by default', () => {
    render(<CountUp end={50} />);
    const el = screen.getByTestId('count-up');
    expect(el.textContent).toBe('0');
  });
});
