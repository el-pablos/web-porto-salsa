import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StaggerReveal } from '@/components/effects/StaggerReveal';

describe('StaggerReveal', () => {
  it('renders children', () => {
    render(
      <StaggerReveal>
        <span>Skill A</span>
        <span>Skill B</span>
      </StaggerReveal>
    );
    expect(screen.getByText('Skill A')).toBeInTheDocument();
    expect(screen.getByText('Skill B')).toBeInTheDocument();
  });

  it('renders stagger-reveal wrapper', () => {
    render(
      <StaggerReveal>
        <span>Item</span>
      </StaggerReveal>
    );
    expect(screen.getByTestId('stagger-reveal')).toBeInTheDocument();
  });
});
