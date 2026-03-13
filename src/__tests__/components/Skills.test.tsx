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
    expect(screen.getByText('QA & Testing')).toBeInTheDocument();
    expect(screen.getByText('Soft Skills')).toBeInTheDocument();
  });

  it('renders skill names from data', () => {
    render(<Skills />);
    expect(screen.getByText('Python (Pandas, NumPy)')).toBeInTheDocument();
    expect(screen.getByText('Power BI')).toBeInTheDocument();
    expect(screen.getByText('Manual Testing')).toBeInTheDocument();
    expect(screen.getByText('Excel Advanced')).toBeInTheDocument();
  });

  it('renders skill level percentages', () => {
    render(<Skills />);
    expect(screen.getAllByText('90%').length).toBe(2);
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('70%')).toBeInTheDocument();
  });
});
