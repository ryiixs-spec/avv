'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BUNNY_QUOTES = [
  'hop! ᐢ. ̫ .ᐢ ✨',
  'kamu hebat! 🥕',
  '*wiggle ears* 🌸',
  'jangan lupa istirahat ya! ☁️',
  'semangat terus! ₍ᐢ.ˬ.ᐢ₎',
  'sending warm hugs! 🤍',
];

interface CuteBunnyProps {
  position?: 'envelope-left' | 'envelope-right' | 'cloud-rider';
}

export default function CuteBunny({ position = 'envelope-left' }: CuteBunnyProps) {
  const [isHopping, setIsHopping] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>(null);

  const handleBunnyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHopping(true);
    const randomQuote = BUNNY_QUOTES[Math.floor(Math.random() * BUNNY_QUOTES.length)];
    setBubbleText(randomQuote);

    setTimeout(() => {
      setIsHopping(false);
    }, 600);

    setTimeout(() => {
      setBubbleText(null);
    }, 2800);
  };

  return (
    <div className="relative inline-flex flex-col items-center select-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {bubbleText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="absolute -top-12 z-50 pointer-events-none whitespace-nowrap"
          >
            <div className="px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-pink-200/80 text-xs font-handwriting text-sky-950 font-bold shadow-lg flex items-center gap-1 glow-text">
              <span>{bubbleText}</span>
            </div>
            {/* Bubble little arrow */}
            <div className="w-2 h-2 bg-white/95 border-r border-b border-pink-200/80 rotate-45 mx-auto -mt-1 shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Cute Cartoon Bunny SVG */}
      <motion.div
        onClick={handleBunnyClick}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        animate={
          isHopping
            ? { y: [-24, 0], rotate: [0, -6, 6, 0] }
            : { y: [0, -6, 0] }
        }
        transition={
          isHopping
            ? { duration: 0.5, ease: 'easeOut' }
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }
        className="cursor-pointer filter drop-shadow-md group relative"
        title="Klik kelinci lucu! ᐢ. ̫ .ᐢ"
      >
        <svg
          width="76"
          height="86"
          viewBox="0 0 100 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bunny Left Ear */}
          <motion.g
            animate={{ rotate: [-4, 6, -4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '35px 45px' }}
          >
            <ellipse cx="33" cy="24" rx="10" ry="24" fill="#FFFFFF" stroke="#F0E8E6" strokeWidth="2" />
            <ellipse cx="33" cy="24" rx="5.5" ry="17" fill="#FFCCD5" opacity="0.85" />
          </motion.g>

          {/* Bunny Right Ear */}
          <motion.g
            animate={{ rotate: [4, -6, 4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            style={{ transformOrigin: '65px 45px' }}
          >
            <ellipse cx="67" cy="24" rx="10" ry="24" fill="#FFFFFF" stroke="#F0E8E6" strokeWidth="2" />
            <ellipse cx="67" cy="24" rx="5.5" ry="17" fill="#FFCCD5" opacity="0.85" />
          </motion.g>

          {/* Bunny Body */}
          <ellipse cx="50" cy="78" rx="32" ry="26" fill="#FFFFFF" stroke="#F0E8E6" strokeWidth="2" />
          
          {/* Bunny Head */}
          <circle cx="50" cy="56" r="28" fill="#FFFFFF" stroke="#F0E8E6" strokeWidth="2" />

          {/* Blush Cheeks */}
          <circle cx="34" cy="62" r="5" fill="#FFB7B2" opacity="0.75" />
          <circle cx="66" cy="62" r="5" fill="#FFB7B2" opacity="0.75" />

          {/* Eyes (Blinking animation) */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.93, 0.96, 1] }}
            style={{ transformOrigin: '50px 52px' }}
          >
            <circle cx="39" cy="52" r="3.2" fill="#2E2E2E" />
            <circle cx="40" cy="51" r="1.1" fill="#FFFFFF" />
            <circle cx="61" cy="52" r="3.2" fill="#2E2E2E" />
            <circle cx="62" cy="51" r="1.1" fill="#FFFFFF" />
          </motion.g>

          {/* Nose & Mouth :3 */}
          <ellipse cx="50" cy="58" rx="2.5" ry="1.8" fill="#FFAAA6" />
          <path
            d="M46 62 Q50 65 50 61 Q50 65 54 62"
            stroke="#4A4A4A"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Front Paws */}
          <ellipse cx="40" cy="80" rx="6" ry="5" fill="#FFFFFF" stroke="#EBE0DE" strokeWidth="1.5" />
          <ellipse cx="60" cy="80" rx="6" ry="5" fill="#FFFFFF" stroke="#EBE0DE" strokeWidth="1.5" />

          {/* Fluffy Tail */}
          <circle cx="80" cy="82" r="7" fill="#FFFFFF" stroke="#EBE0DE" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
