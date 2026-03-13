import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { About } from '@/components/About';

describe('About', () => {
  it('renders section title', () => {
    render(<About />);
    expect(screen.getByText('Tentang')).toBeInTheDocument();
    expect(screen.getByText('Saya')).toBeInTheDocument();
  });

  it('renders name in text', () => {
    render(<About />);
    expect(screen.getByText('Adinda Salsa Aryadi Putri')).toBeInTheDocument();
  });

  it('renders highlight cards', () => {
    render(<About />);
    expect(screen.getByText('Data Analysis')).toBeInTheDocument();
    expect(screen.getByText('Database & Query')).toBeInTheDocument();
    expect(screen.getByText('Visualization')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
  });

  it('renders KND mention', () => {
    render(<About />);
    expect(screen.getByText(/Komisi Nasional Disabilitas/)).toBeInTheDocument();
  });
});
