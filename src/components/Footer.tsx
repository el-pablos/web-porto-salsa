'use client';

import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import portfolioData from '@/data/portfolio.json';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-pastel-300/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-pastel-800/50 text-sm flex items-center gap-1">
          &copy; {currentYear} {portfolioData.name}. Dibuat dengan
          <FaHeart className="text-primary text-xs" />
        </p>

        <div className="flex items-center gap-4">
          <a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pastel-800/50 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={portfolioData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pastel-800/50 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        <p className="text-pastel-800/40 text-xs">
          Built by <a href="https://github.com/el-pablos" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary transition-colors">el-pablos</a>
        </p>
      </div>
    </footer>
  );
}
