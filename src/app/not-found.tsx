'use client';

import Link from 'next/link';
import { FuzzyText } from '@/components/effects/FuzzyText';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-soft-light px-4">
      <div className="text-center">
        <FuzzyText text="404" className="text-7xl sm:text-8xl md:text-9xl font-black mb-4 text-primary" />
        <FuzzyText text="Halaman Tidak Ditemukan" className="text-lg sm:text-xl md:text-2xl text-neutral-light mb-8" />
        <p className="text-neutral-soft mb-8 max-w-md mx-auto text-sm md:text-base">
          Ups! Halaman yang kamu cari sepertinya sudah pindah atau tidak pernah ada.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-primary rounded-soft-md text-white font-semibold
                     hover:bg-primary-dark hover:shadow-soft-md
                     transition-all duration-300"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
