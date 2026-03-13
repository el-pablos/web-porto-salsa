import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FuzzyText } from '@/components/effects/FuzzyText';

describe('FuzzyText', () => {
  it('renders fuzzy text element', () => {
    render(<FuzzyText text="404" />);
    expect(screen.getByTestId('fuzzy-text')).toBeInTheDocument();
  });

  it('applies className', () => {
    render(<FuzzyText text="Error" className="big-text" />);
    expect(screen.getByTestId('fuzzy-text')).toHaveClass('big-text');
  });
});
