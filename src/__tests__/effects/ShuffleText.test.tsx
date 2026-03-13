import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ShuffleText } from '@/components/effects/ShuffleText';

describe('ShuffleText', () => {
  it('renders with correct text', () => {
    render(<ShuffleText text="Hello" />);
    expect(screen.getByTestId('shuffle-text')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ShuffleText text="Test" className="custom-class" />);
    expect(screen.getByTestId('shuffle-text')).toHaveClass('custom-class');
  });
});
