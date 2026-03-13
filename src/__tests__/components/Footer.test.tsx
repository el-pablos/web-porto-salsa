import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '@/components/Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/Adinda Salsa Aryadi Putri/)).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Footer />);
    const githubLink = document.querySelector('a[href*="github.com/adndaaryadi"]');
    const linkedinLink = document.querySelector('a[href*="linkedin.com"]');
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
  });

  it('renders copyright year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});
