import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(
      (props: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => (
        <div {...props} ref={ref} />
      )
    ),
  },
}));

import { BouncyIcon } from '@/components/effects/BouncyIcon';

describe('BouncyIcon', () => {
  it('renders children', () => {
    render(
      <BouncyIcon>
        <span data-testid="child">Icon</span>
      </BouncyIcon>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(
      <BouncyIcon className="test-class">
        <span>Icon</span>
      </BouncyIcon>
    );
    expect(container.firstChild).toHaveClass('test-class');
  });

  it('renders with different intensities', () => {
    const { rerender } = render(
      <BouncyIcon intensity="subtle">
        <span>Icon</span>
      </BouncyIcon>
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();

    rerender(
      <BouncyIcon intensity="medium">
        <span>Icon</span>
      </BouncyIcon>
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();

    rerender(
      <BouncyIcon intensity="bouncy">
        <span>Icon</span>
      </BouncyIcon>
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });
});
