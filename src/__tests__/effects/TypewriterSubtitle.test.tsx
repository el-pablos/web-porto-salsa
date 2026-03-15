import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TypewriterSubtitle } from '@/components/effects/TypewriterSubtitle';

jest.mock('react-type-animation', () => ({
  TypeAnimation: (props: { sequence?: unknown[]; className?: string }) => (
    <span data-testid="type-animation" className={props.className}>{String(props.sequence?.[0] ?? '')}</span>
  ),
}));

describe('TypewriterSubtitle', () => {
  it('renders typewriter-subtitle wrapper', () => {
    render(<TypewriterSubtitle />);
    expect(screen.getByTestId('typewriter-subtitle')).toBeInTheDocument();
  });

  it('renders type animation text content', () => {
    render(<TypewriterSubtitle />);
    expect(screen.getByTestId('type-animation')).toBeInTheDocument();
    expect(screen.getByTestId('type-animation')).toHaveTextContent('Data Analyst');
  });

  it('passes className to TypeAnimation', () => {
    render(<TypewriterSubtitle className="text-primary font-semibold" />);
    expect(screen.getByTestId('type-animation')).toHaveClass('text-primary', 'font-semibold');
  });
});
