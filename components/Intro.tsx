'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 1.2 } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#75C8F5] via-[#A9DFF7] to-[#E7F8FF] px-6 text-center"
    >
      {/* Gentle floating background cloud silhouette */}
      <motion.div
        animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute opacity-40 pointer-events-none"
      >
        <svg width="340" height="170" viewBox="0 0 340 170" fill="white">
          <circle cx="90" cy="110" r="60" />
          <circle cx="170" cy="80" r="75" />
          <circle cx="250" cy="110" r="60" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-10 max-w-xl mx-auto flex flex-col items-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          className="text-3xl mb-4"
        >
          ✨
        </motion.span>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-handwriting text-white font-normal tracking-wide glow-text leading-relaxed lowercase select-none">
          thank youu for ur sweet word for me.
        </h1>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '80px', opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="h-0.5 bg-white/80 rounded-full mt-6"
        />
      </motion.div>
    </motion.div>
  );
}
