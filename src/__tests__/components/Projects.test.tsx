import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Projects } from '@/components/Projects';

describe('Projects', () => {
  it('renders section title', () => {
    render(<Projects />);
    expect(screen.getByText('Proyek')).toBeInTheDocument();
    expect(screen.getByText('Unggulan')).toBeInTheDocument();
  });

  it('renders project cards', () => {
    render(<Projects />);
    expect(screen.getByText('Pentest-for-QA Toolkit')).toBeInTheDocument();
    expect(screen.getByText('Analisis Data Disabilitas Nasional')).toBeInTheDocument();
    expect(screen.getByText('Penelitian Sosial Kuantitatif UNAS')).toBeInTheDocument();
  });

  it('renders technology tags', () => {
    render(<Projects />);
    expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
  });

  it('renders project highlights', () => {
    render(<Projects />);
    expect(screen.getByText('70+ custom scripts')).toBeInTheDocument();
  });
});
