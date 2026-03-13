import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';

const PixelBackground = dynamic(
  () => import('@/components/effects/PixelBackground').then(mod => ({ default: mod.PixelBackground })),
  { ssr: false }
);

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

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

export const viewport: Viewport = {
  themeColor: '#FFF0F5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="relative min-h-screen antialiased">
        <PixelBackground />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
