'use client';

import { TypeAnimation } from 'react-type-animation';

interface TypewriterSubtitleProps {
  className?: string;
}

export function TypewriterSubtitle({ className }: TypewriterSubtitleProps) {
  return (
    <span data-testid="typewriter-subtitle">
      <TypeAnimation
        sequence={[
          'Data Analyst', 2000,
          'Data Storyteller', 2000,
          'Insight Hunter', 2000,
          'Dashboard Builder', 2000,
        ]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        speed={50}
        className={className}
      />
    </span>
  );
}
