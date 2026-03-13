'use client';

import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import portfolioData from '@/data/portfolio.json';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 sm:px-6 border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm flex items-center gap-1">
          &copy; {currentYear} {portfolioData.name}. Dibuat dengan
          <FaHeart className="text-secondary text-xs" />
        </p>

        <div className="flex items-center gap-4">
          <a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={portfolioData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        <p className="text-gray-600 text-xs">
          Built by <a href="https://github.com/el-pablos" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary transition-colors">el-pablos</a>
        </p>
      </div>
    </footer>
  );
}
