import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WaveText } from '@/components/effects/WaveText';

describe('WaveText', () => {
  it('renders wave-text container', () => {
    render(<WaveText text="Hello" />);
    expect(screen.getByTestId('wave-text')).toBeInTheDocument();
  });

  it('renders correct number of character spans', () => {
    render(<WaveText text="Hi" />);
    const container = screen.getByTestId('wave-text');
    const charSpans = container.querySelectorAll('span[aria-hidden="true"]');
    expect(charSpans).toHaveLength(2);
  });

  it('has correct aria-label', () => {
    render(<WaveText text="Saya" />);
    expect(screen.getByRole('text', { name: 'Saya' })).toBeInTheDocument();
  });
});
