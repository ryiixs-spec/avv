'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronUp, Sparkles } from 'lucide-react';

export default function FinalMessage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto px-6 py-20 pb-28 text-center z-20 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center space-y-6"
      >
        {/* Cloud icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-4xl"
        >
          ☁️
        </motion.div>

        {/* and once again... */}
        <p className="font-sans text-white/90 text-sm md:text-base tracking-widest uppercase font-light drop-shadow-sm">
          and once again...
        </p>

        {/* thank you */}
        <h2 className="font-handwriting text-4xl sm:text-5xl md:text-6xl text-white font-normal glow-text tracking-wide">
          thank you.
        </h2>

        {/* Shining Star symbol */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="my-2 flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 bg-amber-300/40 rounded-full blur-lg animate-pulse" />
            <Star className="w-8 h-8 text-amber-200 fill-amber-100/90 drop-shadow-[0_0_15px_rgba(255,230,150,0.9)]" />
          </div>
        </motion.div>

        {/* Keep writing, dreaming, going */}
        <div className="space-y-2 py-2 text-white/95 font-serif italic text-lg sm:text-xl tracking-wide leading-relaxed">
          <p>keep writing.</p>
          <p>keep dreaming.</p>
          <p>keep going.</p>
        </div>

        {/* Signature */}
        <div className="pt-4 flex flex-col items-center">
          <div className="w-12 h-0.5 bg-white/40 rounded-full mb-3" />
          <p className="font-handwriting text-2xl sm:text-3xl text-white font-semibold glow-text">
            — Rayy’s
          </p>
        </div>

        {/* Back to top floating pill */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 px-6 py-2.5 rounded-full glass-pill text-xs md:text-sm text-sky-950 font-medium shadow-lg border border-white/80 hover:bg-white/90 transition-all flex items-center gap-2"
          aria-label="Scroll back to top"
        >
          <ChevronUp className="w-4 h-4" />
          <span>Kembali ke Atas</span>
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
        </motion.button>
      </motion.div>
    </div>
  );
}
