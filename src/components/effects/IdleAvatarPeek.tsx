'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIdleDetection } from '@/hooks';

interface IdleAvatarPeekProps {
  idleTimeout?: number; // Waktu dalam ms sebelum muncul (default: 30000 = 30 detik)
  side?: 'left' | 'right';
  message?: string;
}

const IDLE_MESSAGES = [
  "Halo! Masih di sini? 👋",
  "Butuh bantuan? 🤔",
  "Jangan lupa scroll ke bawah ya~",
  "Ada project menarik di bawah!",
  "Klik ayam untuk surprise! 🐔",
  "Sudah cek semua section?",
  "Terima kasih sudah mampir! 💖",
  "Ayo eksplor lebih jauh!",
];

/**
 * Komponen avatar yang mengintip dari samping layar
 * ketika user idle (tidak ada aktivitas)
 */
export function IdleAvatarPeek({
  idleTimeout = 30000,
  side = 'right',
  message,
}: IdleAvatarPeekProps) {
  const { isIdle, resetActivity } = useIdleDetection(idleTimeout);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showAvatar, setShowAvatar] = useState(false);
  const dismissedRef = useRef(false);

  // Update message saat menjadi idle
  useEffect(() => {
    if (isIdle && !dismissedRef.current) {
      const randomMessage = message || IDLE_MESSAGES[Math.floor(Math.random() * IDLE_MESSAGES.length)];
      setCurrentMessage(randomMessage);
      setShowAvatar(true);
    } else if (!isIdle) {
      setShowAvatar(false);
      dismissedRef.current = false;
    }
  }, [isIdle, message]);

  const handleDismiss = useCallback(() => {
    setShowAvatar(false);
    dismissedRef.current = true;
    resetActivity();
  }, [resetActivity]);

  // Position berdasarkan side
  const positionClass = side === 'right' ? 'right-0' : 'left-0';
  const translateFrom = side === 'right' ? 100 : -100;

  return (
    <AnimatePresence>
      {showAvatar && (
        <motion.div
          className={`fixed bottom-32 ${positionClass} z-50`}
          initial={{ x: translateFrom, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: translateFrom, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex items-end gap-3">
            {/* Speech Bubble */}
            {side === 'left' && (
              <AvatarFace onClick={handleDismiss} side={side} />
            )}

            <motion.div
              className="relative max-w-[200px] px-4 py-3 bg-white rounded-soft-md shadow-soft-md border border-primary/10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-neutral-light font-medium">
                {currentMessage}
              </p>

              {/* Speech bubble tail */}
              <div
                className={`absolute bottom-4 ${side === 'right' ? 'right-[-8px]' : 'left-[-8px]'}
                            w-0 h-0 border-t-[8px] border-b-[8px] border-transparent
                            ${side === 'right'
                              ? 'border-l-[8px] border-l-white'
                              : 'border-r-[8px] border-r-white'}`}
              />

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary/10
                           text-primary-dark text-xs flex items-center justify-center
                           hover:bg-primary/20 transition-colors"
                aria-label="Tutup"
              >
                ×
              </button>
            </motion.div>

            {side === 'right' && (
              <AvatarFace onClick={handleDismiss} side={side} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AvatarFace({ onClick, side }: { onClick: () => void; side: 'left' | 'right' }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-16 h-16 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Klik untuk menutup"
    >
      {/* Avatar SVG - Cute Kawaii Style */}
      <svg viewBox="0 0 64 64" className="w-full h-full">
        {/* Face */}
        <circle cx="32" cy="32" r="28" fill="#FF99C8" />
        <circle cx="32" cy="32" r="28" fill="url(#faceGradient)" />

        {/* Gradient definition */}
        <defs>
          <radialGradient id="faceGradient" cx="30%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#FCB1D1" />
            <stop offset="100%" stopColor="#FF99C8" />
          </radialGradient>
        </defs>

        {/* Hair */}
        <path
          d="M10 35 Q8 20 20 12 Q32 4 44 12 Q56 20 54 35"
          fill="#3D3040"
        />
        <path
          d="M12 32 Q10 18 22 10 Q32 2 42 10 Q52 18 50 32"
          fill="#3D3040"
        />

        {/* Eyes */}
        <ellipse cx="22" cy="32" rx="4" ry="5" fill="white" />
        <ellipse cx="42" cy="32" rx="4" ry="5" fill="white" />
        <circle cx="23" cy="33" r="2.5" fill="#3D3040" />
        <circle cx="43" cy="33" r="2.5" fill="#3D3040" />
        <circle cx="24" cy="32" r="1" fill="white" />
        <circle cx="44" cy="32" r="1" fill="white" />

        {/* Blush */}
        <ellipse cx="14" cy="38" rx="5" ry="3" fill="#CFBAF0" opacity="0.6" />
        <ellipse cx="50" cy="38" rx="5" ry="3" fill="#CFBAF0" opacity="0.6" />

        {/* Smile */}
        <path
          d="M26 42 Q32 48 38 42"
          stroke="#3D3040"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Waving hand */}
        <motion.g
          animate={{
            rotate: [0, 15, -10, 15, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          style={{ originX: '45px', originY: '55px' }}
        >
          <circle cx="58" cy="48" r="6" fill="#FCB1D1" />
          <circle cx="60" cy="44" r="2" fill="#FCB1D1" />
          <circle cx="62" cy="46" r="2" fill="#FCB1D1" />
        </motion.g>
      </svg>

      {/* Peek effect - half hidden */}
      <div
        className={`absolute inset-0 ${side === 'right' ? 'left-1/2' : 'right-1/2'} bg-soft-light`}
        style={{ width: '32px' }}
      />
    </motion.button>
  );
}
