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
          'Sociology Student', 2000,
          'Data Analyst', 2000,
          'Social Researcher', 2000,
          'Creative Designer', 2000,
          'Community Volunteer', 2000,
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
