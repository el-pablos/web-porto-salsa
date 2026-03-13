import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Contact } from '@/components/Contact';

describe('Contact', () => {
  it('renders section title', () => {
    render(<Contact />);
    expect(screen.getByText('Hubungi')).toBeInTheDocument();
  });

  it('renders contact info labels', () => {
    render(<Contact />);
    expect(screen.getAllByText(/Email/i).length).toBeGreaterThan(0);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Lokasi')).toBeInTheDocument();
  });

  it('renders contact form fields', () => {
    render(<Contact />);
    expect(screen.getByLabelText('Nama')).toBeInTheDocument();
    expect(screen.getByLabelText('Pesan')).toBeInTheDocument();
    expect(screen.getByText('Kirim Pesan')).toBeInTheDocument();
  });

  it('renders form inputs with placeholders', () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText('Nama lengkap kamu')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email@example.com')).toBeInTheDocument();
  });
});
