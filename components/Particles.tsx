'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  symbol: '✦' | '✧' | '·' | '⋆';
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
}

const STATIC_PARTICLES: Particle[] = [
  { id: 1, symbol: '✦', left: '10%', top: '15%', size: 18, duration: 4.5, delay: 0.2 },
  { id: 2, symbol: '·', left: '22%', top: '28%', size: 24, duration: 5.2, delay: 1.1 },
  { id: 3, symbol: '✧', left: '35%', top: '12%', size: 16, duration: 3.8, delay: 0.7 },
  { id: 4, symbol: '⋆', left: '48%', top: '22%', size: 14, duration: 6.0, delay: 2.3 },
  { id: 5, symbol: '✦', left: '62%', top: '16%', size: 20, duration: 4.2, delay: 1.5 },
  { id: 6, symbol: '·', left: '75%', top: '26%', size: 22, duration: 5.5, delay: 0.9 },
  { id: 7, symbol: '✧', left: '88%', top: '18%', size: 17, duration: 4.8, delay: 2.8 },
  { id: 8, symbol: '⋆', left: '15%', top: '45%', size: 15, duration: 5.0, delay: 1.3 },
  { id: 9, symbol: '✦', left: '82%', top: '48%', size: 19, duration: 4.4, delay: 0.5 },
  { id: 10, symbol: '✧', left: '28%', top: '65%', size: 16, duration: 5.8, delay: 2.1 },
  { id: 11, symbol: '·', left: '72%', top: '68%', size: 26, duration: 4.0, delay: 1.8 },
  { id: 12, symbol: '⋆', left: '50%', top: '78%', size: 15, duration: 6.2, delay: 0.4 },
  { id: 13, symbol: '✦', left: '18%', top: '85%', size: 18, duration: 5.1, delay: 2.5 },
  { id: 14, symbol: '✧', left: '85%', top: '88%', size: 17, duration: 4.6, delay: 1.0 },
];

export default function Particles() {
  const [wishPopup, setWishPopup] = useState<{
    id: number;
    x: number;
    y: number;
  } | null>(null);

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setWishPopup({
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top - 15,
    });

    setTimeout(() => {
      setWishPopup(null);
    }, 2500);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden select-none">
      {STATIC_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute cursor-pointer pointer-events-auto text-white/70 hover:text-white hover:scale-150 transition-colors duration-200 select-none"
          style={{
            left: p.left,
            top: p.top,
            fontSize: `${p.size}px`,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.35, 0.95, 0.35],
            scale: [0.9, 1.15, 0.9],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          onClick={handleStarClick}
          title="Click the star ✨"
        >
          {p.symbol}
        </motion.div>
      ))}

      {/* Wish Toast Popup */}
      <AnimatePresence>
        {wishPopup && (
          <motion.div
            key={wishPopup.id}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              position: 'fixed',
              left: `${wishPopup.x}px`,
              top: `${wishPopup.y}px`,
              transform: 'translate(-50%, -100%)',
              zIndex: 999,
            }}
            className="pointer-events-none"
          >
            <div className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 text-xs font-handwriting text-sky-900 font-bold shadow-lg flex items-center gap-1 whitespace-nowrap glow-text">
              <span>another little wish for you. ✨</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
