'use client';

import Link from 'next/link';
import { FuzzyText } from '@/components/effects/FuzzyText';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-400 px-4">
      <div className="text-center">
        <FuzzyText text="404" className="text-8xl md:text-9xl font-black mb-4" />
        <FuzzyText text="Halaman Tidak Ditemukan" className="text-xl md:text-2xl text-gray-400 mb-8" />
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Ups! Halaman yang kamu cari sepertinya sudah pindah atau tidak pernah ada.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-primary rounded-smooth text-white font-semibold
                     hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/25
                     transition-all duration-300"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
