'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Birds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-15 select-none">
      {/* 1. Upper Sky Flock (Left to Right) */}
      <motion.div
        className="absolute top-[8%] left-0 opacity-45 flex items-center gap-3"
        initial={{ x: '-150px', y: 0 }}
        animate={{
          x: '115vw',
          y: [-12, 16, -14, 12, -6],
        }}
        transition={{
          x: { duration: 30, repeat: Infinity, ease: 'linear', delay: 1 },
          y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {/* Leader Bird */}
        <svg width="28" height="18" viewBox="0 0 32 20" fill="none">
          <path
            d="M2 14 C8 6, 14 6, 16 12 C18 6, 24 6, 30 14"
            stroke="#2F5568"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Companion 1 */}
        <svg width="22" height="14" viewBox="0 0 32 20" fill="none" className="-mt-3">
          <path
            d="M2 14 C8 6, 14 6, 16 12 C18 6, 24 6, 30 14"
            stroke="#2F5568"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>

        {/* Companion 2 */}
        <svg width="18" height="12" viewBox="0 0 32 20" fill="none" className="mt-4">
          <path
            d="M2 14 C8 6, 14 6, 16 12 C18 6, 24 6, 30 14"
            stroke="#2F5568"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* 2. Upper-Mid Flock (Right to Left - Gliding back across) */}
      <motion.div
        className="absolute top-[24%] right-0 opacity-35 flex items-center gap-3.5"
        initial={{ x: '150px', y: 0 }}
        animate={{
          x: '-120vw',
          y: [8, -18, 12, -8, 6],
        }}
        transition={{
          x: { duration: 36, repeat: Infinity, ease: 'linear', delay: 12 },
          y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg width="24" height="15" viewBox="0 0 32 20" fill="none">
          <path
            d="M30 14 C24 6, 18 6, 16 12 C14 6, 8 6, 2 14"
            stroke="#3B6375"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
        </svg>
        <svg width="18" height="12" viewBox="0 0 32 20" fill="none" className="-mt-2">
          <path
            d="M30 14 C24 6, 18 6, 16 12 C14 6, 8 6, 2 14"
            stroke="#3B6375"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* 3. Mid Page / Beside Letter (Left to Right) */}
      <motion.div
        className="absolute top-[45%] left-0 opacity-40 flex items-center gap-3"
        initial={{ x: '-150px', y: 0 }}
        animate={{
          x: '115vw',
          y: [0, -20, 15, -10, 0],
        }}
        transition={{
          x: { duration: 34, repeat: Infinity, ease: 'linear', delay: 18 },
          y: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg width="26" height="16" viewBox="0 0 32 20" fill="none">
          <path
            d="M2 14 C8 6, 14 6, 16 12 C18 6, 24 6, 30 14"
            stroke="#457082"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
        <svg width="20" height="13" viewBox="0 0 32 20" fill="none" className="mt-3">
          <path
            d="M2 14 C8 6, 14 6, 16 12 C18 6, 24 6, 30 14"
            stroke="#457082"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* 4. Lower Sunset Horizon Flock (Right to Left) */}
      <motion.div
        className="absolute top-[70%] right-0 opacity-40 flex items-center gap-4"
        initial={{ x: '150px', y: 0 }}
        animate={{
          x: '-120vw',
          y: [-10, 14, -8, 12, -6],
        }}
        transition={{
          x: { duration: 38, repeat: Infinity, ease: 'linear', delay: 6 },
          y: { duration: 8.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg width="28" height="17" viewBox="0 0 32 20" fill="none">
          <path
            d="M30 14 C24 6, 18 6, 16 12 C14 6, 8 6, 2 14"
            stroke="#634F69"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
        <svg width="22" height="14" viewBox="0 0 32 20" fill="none" className="-mt-3">
          <path
            d="M30 14 C24 6, 18 6, 16 12 C14 6, 8 6, 2 14"
            stroke="#634F69"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
        <svg width="17" height="11" viewBox="0 0 32 20" fill="none" className="mt-3">
          <path
            d="M30 14 C24 6, 18 6, 16 12 C14 6, 8 6, 2 14"
            stroke="#634F69"
            strokeWidth="2.0"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* 5. Sunset & Final Message Stage Birds (Left to Right) */}
      <motion.div
        className="absolute top-[86%] left-0 opacity-45 flex items-center gap-3"
        initial={{ x: '-150px', y: 0 }}
        animate={{
          x: '115vw',
          y: [6, -14, 10, -6, 4],
        }}
        transition={{
          x: { duration: 32, repeat: Infinity, ease: 'linear', delay: 24 },
          y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <svg width="24" height="15" viewBox="0 0 32 20" fill="none">
          <path
            d="M2 14 C8 6, 14 6, 16 12 C18 6, 24 6, 30 14"
            stroke="#5A475F"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
        </svg>
        <svg width="19" height="12" viewBox="0 0 32 20" fill="none" className="-mt-2">
          <path
            d="M2 14 C8 6, 14 6, 16 12 C18 6, 24 6, 30 14"
            stroke="#5A475F"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
