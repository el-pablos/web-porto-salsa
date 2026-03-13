import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hero } from '@/components/Hero';

describe('Hero', () => {
  it('renders badge text', () => {
    render(<Hero />);
    expect(screen.getByText('Data Analyst & Researcher')).toBeInTheDocument();
  });

  it('renders name with shuffle text', () => {
    render(<Hero />);
    expect(screen.getByTestId('shuffle-text')).toBeInTheDocument();
  });

  it('renders heading text', () => {
    render(<Hero />);
    expect(screen.getByText(/Halo, Saya/)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Lihat Portofolio')).toBeInTheDocument();
    expect(screen.getByText('Mari Berdiskusi')).toBeInTheDocument();
  });

  it('renders hero section element', () => {
    render(<Hero />);
    expect(screen.getByText('Data Analyst & Researcher').closest('section')).toHaveAttribute('id', 'beranda');
  });
});
