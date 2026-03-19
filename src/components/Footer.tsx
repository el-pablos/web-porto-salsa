"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import { IconType } from "react-icons";
import portfolioData from "@/data/portfolio.json";
import { StaggerReveal } from "./effects/StaggerReveal";
import { MagneticButton } from "./effects/MagneticButton";
import { BouncyIcon } from "./effects/BouncyIcon";
import { RandomQuoteDisplay } from "./effects/RandomQuoteDisplay";
import { useConfettiEgg } from "./effects/useConfettiEgg";

interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
  hoverColor: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: portfolioData.contact.github,
    icon: FaGithub,
    hoverColor: "hover:bg-[#333] hover:text-white",
  },
  {
    name: "LinkedIn",
    url: portfolioData.contact.linkedin,
    icon: FaLinkedin,
    hoverColor: "hover:bg-[#0077b5] hover:text-white",
  },
  // Tambah social links lain di sini jika diperlukan
  // {
  //   name: 'Twitter',
  //   url: 'https://twitter.com/username',
  //   icon: FaTwitter,
  //   hoverColor: 'hover:bg-[#1da1f2] hover:text-white',
  // },
  // {
  //   name: 'Instagram',
  //   url: 'https://instagram.com/username',
  //   icon: FaInstagram,
  //   hoverColor: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#dc2743] hover:text-white',
  // },
];

export function Footer() {
  const { handleClick, clickCount } = useConfettiEgg(5);
  const [showHint, setShowHint] = useState(false);

  const handleNameClick = () => {
    handleClick();
    // Tampilkan hint setelah klik ke-2 sampai ke-4
    if (clickCount >= 1 && clickCount < 4) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 1500);
    }
  };

  return (
    <footer className="py-12 px-6 border-t border-primary/5 bg-white/30 backdrop-blur-sm mt-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        <StaggerReveal className="flex items-center gap-6">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <BouncyIcon key={social.name} delay={index * 0.2} intensity="subtle">
                <MagneticButton strength={0.4}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`w-12 h-12 rounded-full bg-neutral/5 flex items-center justify-center text-neutral-light transition-all duration-300 shadow-soft ${social.hoverColor}`}
                  >
                    <Icon size={24} />
                  </a>
                </MagneticButton>
              </BouncyIcon>
            );
          })}
        </StaggerReveal>

        {/* Random Quote Section */}
        <RandomQuoteDisplay autoRotate rotateInterval={30000} className="max-w-sm" />

        <div className="text-center space-y-2">
          <p className="text-neutral-light font-bold flex items-center justify-center gap-2">
            Made with <FaHeart className="text-primary animate-pulse" /> by{" "}
            <button
              onClick={handleNameClick}
              className="relative cursor-pointer hover:text-primary transition-colors duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
              aria-label={`Click ${5 - clickCount} more times for a surprise`}
            >
              {portfolioData.name}
              {showHint && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-primary/70 whitespace-nowrap animate-bounce">
                  {4 - clickCount} more...
                </span>
              )}
            </button>
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
