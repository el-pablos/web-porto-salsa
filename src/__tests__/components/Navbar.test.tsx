import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navbar } from '@/components/Navbar';

describe('Navbar', () => {
  it('renders navigation brand', () => {
    render(<Navbar />);
    expect(screen.getByText('S')).toBeInTheDocument();
  });

  it('renders all nav links', () => {
    render(<Navbar />);
    expect(screen.getByText('Beranda')).toBeInTheDocument();
    expect(screen.getByText('Tentang')).toBeInTheDocument();
    expect(screen.getByText('Skill')).toBeInTheDocument();
    expect(screen.getByText('Proyek')).toBeInTheDocument();
    expect(screen.getByText('Pengalaman')).toBeInTheDocument();
  });

  it('has correct href attributes', () => {
    render(<Navbar />);
    const berandaLink = screen.getAllByText('Beranda')[0];
    expect(berandaLink.closest('a')).toHaveAttribute('href', '#beranda');
  });

  it('renders mobile menu button', () => {
    render(<Navbar />);
    const button = document.querySelector('button.md\\:hidden');
    expect(button).toBeInTheDocument();
  });
});
