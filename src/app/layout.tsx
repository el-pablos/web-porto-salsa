import type { Metadata } from 'next';
import './globals.css';
import { ClickSpark } from '@/components/effects/ClickSpark';
import { PixelBackground } from '@/components/effects/PixelBackground';

export const metadata: Metadata = {
  title: 'Adinda Salsa Aryadi Putri | Portfolio',
  description: 'Portfolio - Data Analyst & QA Enthusiast. Mengubah data mentah menjadi insight bermakna.',
  keywords: ['portfolio', 'data analyst', 'QA', 'Adinda Salsa', 'UNAS'],
  authors: [{ name: 'Adinda Salsa Aryadi Putri' }],
  openGraph: {
    title: 'Adinda Salsa Aryadi Putri | Portfolio',
    description: 'Data Analyst & QA Enthusiast',
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
        <ClickSpark />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
