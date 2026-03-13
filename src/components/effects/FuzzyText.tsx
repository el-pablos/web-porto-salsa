'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface FuzzyTextProps {
  text: string;
  className?: string;
}

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function FuzzyText({ text, className = '' }: FuzzyTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const glitch = useCallback(() => {
    setDisplayText(
      text
        .split('')
        .map((char) => {
          if (char === ' ') return ' ';
          if (Math.random() > 0.7) {
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
          return char;
        })
        .join('')
    );
  }, [text]);

  useEffect(() => {
    intervalRef.current = setInterval(glitch, 80);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [glitch]);

  return (
    <span className={`font-mono ${className}`} data-testid="fuzzy-text">
      {displayText}
    </span>
  );
}
