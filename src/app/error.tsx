'use client';

import Link from 'next/link';
import { FuzzyText } from '@/components/effects/FuzzyText';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pastel-100 px-4">
      <div className="text-center">
        <FuzzyText text="500" className="text-8xl md:text-9xl font-black mb-4 text-primary" />
        <FuzzyText text="Terjadi Kesalahan" className="text-xl md:text-2xl text-pastel-800/60 mb-8" />
        <p className="text-pastel-800/50 mb-8 max-w-md mx-auto">
          Maaf, terjadi kesalahan pada server. Silakan coba lagi.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-primary rounded-smooth text-white font-semibold
                       hover:bg-secondary transition-all duration-300"
          >
            Coba Lagi
          </button>
          <Link
            href="/"
            className="px-8 py-3 border border-primary/30 rounded-smooth text-primary font-semibold
                       hover:bg-primary/10 transition-all duration-300"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
