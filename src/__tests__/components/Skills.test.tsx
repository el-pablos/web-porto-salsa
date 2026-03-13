import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Skills } from '@/components/Skills';

describe('Skills', () => {
  it('renders section title', () => {
    render(<Skills />);
    expect(screen.getByText('Keahlian')).toBeInTheDocument();
  });

  it('renders skill categories', () => {
    render(<Skills />);
    expect(screen.getByText('Data Analysis')).toBeInTheDocument();
    expect(screen.getByText('Visualization')).toBeInTheDocument();
    expect(screen.getByText('Database & Query')).toBeInTheDocument();
    expect(screen.getByText('Soft Skills')).toBeInTheDocument();
  });

  it('renders skill names as tags', () => {
    render(<Skills />);
    expect(screen.getByText('Python (Pandas, NumPy)')).toBeInTheDocument();
    expect(screen.getByText('Power BI')).toBeInTheDocument();
    expect(screen.getByText('SQL & PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Excel Advanced')).toBeInTheDocument();
    expect(screen.getByText('Google Sheets Advanced')).toBeInTheDocument();
  });

  it('does not render percentage values', () => {
    render(<Skills />);
    expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument();
  });
});
