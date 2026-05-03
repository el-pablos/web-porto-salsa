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
    <div className="min-h-screen flex flex-col items-center justify-center bg-soft-light px-4">
      <div className="text-center">
        <FuzzyText text="500" className="text-7xl sm:text-8xl md:text-9xl font-black mb-4 text-primary" />
        <FuzzyText text="Terjadi Kesalahan" className="text-lg sm:text-xl md:text-2xl text-neutral-light mb-8" />
        <p className="text-neutral-soft mb-8 max-w-md mx-auto text-sm md:text-base">
          Maaf, terjadi kesalahan pada server. Silakan coba lagi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-primary rounded-soft-md text-white font-semibold
                       hover:bg-primary-dark transition-all duration-300"
          >
            Coba Lagi
          </button>
          <Link
            href="/"
            className="px-8 py-3 border border-primary/30 rounded-soft-md text-primary font-semibold
                       hover:bg-primary/10 transition-all duration-300"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
