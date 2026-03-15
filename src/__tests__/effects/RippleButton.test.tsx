import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RippleButton } from '@/components/effects/RippleButton';

describe('RippleButton', () => {
  it('renders children content', () => {
    render(
      <RippleButton>
        <button>Klik Saya</button>
      </RippleButton>
    );
    expect(screen.getByRole('button', { name: /klik saya/i })).toBeInTheDocument();
  });

  it('renders ripple-button wrapper', () => {
    render(
      <RippleButton>
        <span>Test Content</span>
      </RippleButton>
    );
    expect(screen.getByTestId('ripple-button')).toBeInTheDocument();
  });
});
