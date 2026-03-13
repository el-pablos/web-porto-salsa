'use client';

import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import portfolioData from '@/data/portfolio.json';

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-primary/5 bg-white/30 backdrop-blur-sm mt-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        <div className="flex items-center gap-6">
          <a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-neutral/5 flex items-center justify-center text-neutral-light hover:bg-primary hover:text-white transition-all duration-300 shadow-soft"
          >
            <FaGithub size={24} />
          </a>
          <a
            href={portfolioData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-neutral/5 flex items-center justify-center text-neutral-light hover:bg-[#0077b5] hover:text-white transition-all duration-300 shadow-soft"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        <div className="text-center space-y-2">
          <p className="text-neutral-light font-bold flex items-center justify-center gap-2">
            Made with <FaHeart className="text-primary animate-pulse" /> by {portfolioData.name}
          </p>
          <p className="text-neutral-soft text-sm">
            &copy; {new Date().getFullYear()} &bull; All Rights Reserved
          </p>
        </div>

        <div className="pt-8 border-t border-primary/5 w-full text-center">
          <p className="text-[10px] text-neutral-soft uppercase tracking-widest font-black">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
