import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hero } from '@/components/Hero';

describe('Hero', () => {
  it('renders greeting text', () => {
    render(<Hero />);
    expect(screen.getByText('Hai, perkenalkan saya')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<Hero />);
    expect(screen.getByText('Data Analyst & Researcher')).toBeInTheDocument();
  });

  it('renders shuffle text component', () => {
    render(<Hero />);
    expect(screen.getByTestId('shuffle-text')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Lihat Proyek Saya')).toBeInTheDocument();
    expect(screen.getByText('Hubungi Saya')).toBeInTheDocument();
  });

  it('renders hero section element', () => {
    render(<Hero />);
    expect(screen.getByText('Hai, perkenalkan saya').closest('section')).toHaveAttribute('id', 'beranda');
  });
});
