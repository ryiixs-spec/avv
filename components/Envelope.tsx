'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import CuteBunny from '@/components/CuteBunnies';

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [state, setState] = useState<'closed' | 'opening' | 'opened'>('closed');

  const handleOpen = () => {
    if (state !== 'closed') return;
    setState('opening');

    // Trigger sweet sparkle burst
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#BDEBFF', '#FFFFFF', '#F6B48F', '#E8A6A6', '#FFF3C4'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setState('opened');
      setTimeout(() => {
        onOpen();
      }, 700);
    }, 900);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 z-20">
      {/* Cute Bunnies — Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
        className="absolute bottom-8 left-4 sm:left-10 md:left-16 z-30 flex gap-3"
      >
        <CuteBunny position="envelope-left" />
        <CuteBunny position="envelope-left" />
      </motion.div>

      {/* Cute Bunnies — Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        className="absolute bottom-8 right-4 sm:right-10 md:right-16 z-30 flex gap-3"
      >
        <CuteBunny position="envelope-right" />
        <CuteBunny position="envelope-right" />
      </motion.div>
      {/* Background soft decorative clouds around the envelope */}
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-10 md:left-20 opacity-60 pointer-events-none select-none"
      >
        <svg width="180" height="90" viewBox="0 0 180 90" fill="white">
          <circle cx="50" cy="55" r="35" />
          <circle cx="95" cy="40" r="40" />
          <circle cx="140" cy="55" r="30" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0], x: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 -right-8 md:right-24 opacity-60 pointer-events-none select-none"
      >
        <svg width="200" height="100" viewBox="0 0 200 100" fill="white">
          <circle cx="60" cy="60" r="38" />
          <circle cx="110" cy="45" r="44" />
          <circle cx="155" cy="62" r="32" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 opacity-50 pointer-events-none select-none"
      >
        <svg width="240" height="90" viewBox="0 0 240 90" fill="white">
          <circle cx="65" cy="55" r="35" />
          <circle cx="120" cy="40" r="45" />
          <circle cx="175" cy="55" r="35" />
        </svg>
      </motion.div>

      {/* Main Interactive Envelope Container */}
      <motion.div
        className="relative cursor-pointer group select-none envelope-container"
        onClick={handleOpen}
        whileHover={{ scale: state === 'closed' ? 1.04 : 1, y: state === 'closed' ? -6 : 0 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Glow ambient behind envelope */}
        <div className="absolute inset-0 bg-white/50 rounded-2xl filter blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 scale-110 pointer-events-none" />

        <div className="relative w-72 h-48 sm:w-84 sm:h-56 md:w-96 md:h-60 bg-gradient-to-b from-[#FFFDF9] to-[#F5EFEB] rounded-2xl shadow-2xl border border-white/90 overflow-hidden flex items-center justify-center glow-envelope group-hover:glow-envelope-hover transition-all duration-500">
          
          {/* Inner Letter Paper Peeking Out */}
          <motion.div
            initial={false}
            animate={
              state === 'opening' || state === 'opened'
                ? { y: -70, opacity: 1, scale: 1.02 }
                : { y: 0, opacity: 0.85 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-4 w-[85%] h-36 sm:h-44 bg-gradient-to-b from-white to-[#FDFBF7] rounded-xl shadow-md border border-[#EBE3D5] p-4 flex flex-col items-center justify-start text-center z-10"
          >
            <div className="w-12 h-0.5 bg-sky-200 rounded-full mb-3" />
            <p className="font-serif italic text-sky-800 text-sm md:text-base tracking-wide">
              a special letter for you...
            </p>
            <div className="mt-3 flex gap-1.5 opacity-30">
              <div className="w-24 h-1 bg-gray-400 rounded-full" />
              <div className="w-10 h-1 bg-gray-400 rounded-full" />
            </div>
            <div className="mt-1.5 w-32 h-1 bg-gray-300 rounded-full opacity-25" />
          </motion.div>

          {/* Envelope Bottom Pocket Flaps (SVG Geometry) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Left triangle fold */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#FAF5EE] to-[#EFE7DC] opacity-95"
              style={{ clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)' }}
            />
            {/* Right triangle fold */}
            <div
              className="absolute inset-0 bg-gradient-to-bl from-[#FAF5EE] to-[#EAE2D7] opacity-95"
              style={{ clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)' }}
            />
            {/* Bottom triangle fold */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#E9E0D4] to-[#F7F2EA] opacity-98"
              style={{ clipPath: 'polygon(0% 100%, 50% 45%, 100% 100%)' }}
            />
          </div>

          {/* Envelope Top Flap (Animated 3D open) */}
          <motion.div
            initial={false}
            animate={
              state === 'opening' || state === 'opened'
                ? { rotateX: 180, zIndex: 0 }
                : { rotateX: 0, zIndex: 30 }
            }
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#FBF7F0] to-[#EFE7DB] shadow-md border-t border-white/80"
            style={{
              clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
              transformOrigin: 'top center',
            }}
          />

          {/* Center Wax Seal / Shining Star Stamp */}
          <AnimatePresence>
            {state === 'closed' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
                className="absolute z-40 flex items-center justify-center"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-200 shadow-lg flex items-center justify-center border-2 border-white/90 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-white fill-white/95 drop-shadow-sm animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtle Stamped Border */}
          <div className="absolute inset-2 border border-dashed border-sky-300/40 rounded-xl pointer-events-none z-30" />
        </div>

        {/* Tap to open prompt */}
        <motion.div
          animate={{ y: [0, 4, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-6 flex flex-col items-center gap-1.5"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-pill text-xs md:text-sm font-medium text-sky-900 tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-spin" style={{ animationDuration: '8s' }} />
            tap to open
            <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-spin" style={{ animationDuration: '8s' }} />
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
