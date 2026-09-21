'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Clouds from './Clouds';
import Mountains from './Mountains';
import Birds from './Birds';
import Particles from './Particles';
import Letter from './Letter';
import FinalMessage from './FinalMessage';

export default function SkyScene() {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  // Interpolate Sky Background Colors across scroll
  // Top: #75C8F5 -> Mid-top: #A9DFF7 -> Mid: #C4DDF0 -> Sunset: #F4C3A2 & #E8A6A6 -> Dusk: #7886A8
  const skyTopColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    ['#75C8F5', '#87CEEB', '#C4DDF0', '#F6B48F', '#687799']
  );

  const skyMidColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    ['#A9DFF7', '#BDEBFF', '#E4D6D6', '#E8A6A6', '#876D89']
  );

  const skyBottomColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    ['#E7F8FF', '#F0F9FF', '#FFEAD9', '#FFD8C7', '#A08092']
  );

  // Sun position & warmth shift as user scrolls to sunset
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.95, 0.8, 0.4]);
  const sunScale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1.25, 1.4]);

  return (
    <motion.div
      style={{
        background: `linear-gradient(to bottom, var(--sky-top, #75C8F5) 0%, var(--sky-mid, #A9DFF7) 50%, var(--sky-bot, #E7F8FF) 100%)`,
      }}
      className="relative min-h-[220vh] w-full transition-colors duration-700"
    >
      {/* Dynamic CSS Custom Variables bound to scroll */}
      <motion.div
        style={
          {
            '--sky-top': skyTopColor,
            '--sky-mid': skyMidColor,
            '--sky-bot': skyBottomColor,
          } as unknown as React.CSSProperties
        }
        className="fixed inset-0 pointer-events-none z-0"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, var(--sky-top) 0%, var(--sky-mid) 50%, var(--sky-bot) 100%)`,
          }}
        />
      </motion.div>

      {/* 2. Soft Glowing Dreamy Sun */}
      <motion.div
        style={{
          y: sunY,
          opacity: sunOpacity,
          scale: sunScale,
        }}
        className="fixed top-14 sm:top-20 right-[12%] sm:right-[18%] pointer-events-none z-2"
      >
        <div className="relative flex items-center justify-center">
          {/* Outer Sun Glow Ring */}
          <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-amber-200/40 via-yellow-100/30 to-pink-200/20 filter blur-3xl animate-pulse-glow" />
          
          {/* Middle Sun Radiance */}
          <div className="absolute w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#FFF9E6] via-[#FFEBB3] to-[#FFD8A8] filter blur-xl opacity-90" />
          
          {/* Core Sun Disc */}
          <div className="absolute w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-white shadow-2xl filter blur-[2px] opacity-95" />
        </div>
      </motion.div>

      {/* 3. Floating Sparkle Particles */}
      <Particles />

      {/* 4. Gliding Birds in the Sky */}
      <Birds />

      {/* 5. Animated Drifting Anime Clouds */}
      <Clouds />

      {/* 6. Mountains Backdrop Layer (Fixed at bottom with parallax) */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none z-5">
        <Mountains scrollYProgress={scrollProgress} />
      </div>

      {/* 7. Foreground Content (Header, Letter, and Final Section) */}
      <div className="relative z-20 flex flex-col items-center pt-20 sm:pt-28 pb-12 w-full">
        {/* Subtle Page Intro Title Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs md:text-sm font-medium text-sky-900 border border-white/80 shadow-sm"
        >
          <span>☁️</span>
          <span>A letter above the clouds</span>
          <span>✨</span>
        </motion.div>

        {/* The Letter Card */}
        <Letter />

        {/* Sunset Transition Final Message */}
        <div className="w-full mt-12 sm:mt-20">
          <FinalMessage />
        </div>
      </div>
    </motion.div>
  );
}
