import type { Metadata } from 'next';
import './globals.css';
import { PixelBackground } from '@/components/effects/PixelBackground';

export const metadata: Metadata = {
  title: 'Adinda Salsa Aryadi Putri | Portfolio',
  description: 'Portfolio - Data Analyst & Researcher. Mengubah data mentah menjadi insight bermakna.',
  keywords: ['portfolio', 'data analyst', 'researcher', 'Adinda Salsa', 'UNAS'],
  authors: [{ name: 'Adinda Salsa Aryadi Putri' }],
  openGraph: {
    title: 'Adinda Salsa Aryadi Putri | Portfolio',
    description: 'Data Analyst & Researcher',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="relative min-h-screen antialiased">
        <PixelBackground />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
