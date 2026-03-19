import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import dynamic from 'next/dynamic';

const SparkleTrail = dynamic(
  () => import('@/components/effects/SparkleTrail').then(mod => ({ default: mod.SparkleTrail })),
  { ssr: false }
);

const HeartBurst = dynamic(
  () => import('@/components/effects/HeartBurst').then(mod => ({ default: mod.HeartBurst })),
  { ssr: false }
);

const IdleAvatarPeek = dynamic(
  () => import('@/components/effects/IdleAvatarPeek').then(mod => ({ default: mod.IdleAvatarPeek })),
  { ssr: false }
);

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
    <html lang="id" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-soft-light text-neutral antialiased selection:bg-primary/20 selection:text-primary-dark">
        <ScrollProgress />
        <SparkleTrail />
        <HeartBurst triggerOnClick maxParticles={50} />
        <IdleAvatarPeek idleTimeout={45000} side="right" />
        <main className="relative overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
