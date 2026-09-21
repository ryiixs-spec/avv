'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CLOUD_MESSAGES = [
  'keep going ☁️',
  'you got this. ✨',
  "don't forget to smile. 🌸",
  'keep writing. ✍️',
  'one step at a time. 🌤️',
  'you can do it. 💫',
  'ur words have magic. 📖',
  'breathe & enjoy the clouds. 🍃',
  'you are doing amazing. 💛',
];

interface CloudItem {
  id: string;
  top: string;
  layer: 'bg' | 'mid' | 'fg';
  duration: number;
  delay: number;
  scale: number;
  opacity: number;
}

export default function Clouds() {
  const [activeMessage, setActiveMessage] = useState<{
    id: number;
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const driftingClouds: CloudItem[] = [
    // Top Section Clouds
    { id: 'drift-1', top: '4%', layer: 'bg', duration: 75, delay: 0, scale: 0.75, opacity: 0.35 },
    { id: 'drift-2', top: '9%', layer: 'mid', duration: 52, delay: 6, scale: 1.1, opacity: 0.7 },
    { id: 'drift-3', top: '15%', layer: 'fg', duration: 40, delay: 2, scale: 1.4, opacity: 0.85 },
    { id: 'drift-4', top: '22%', layer: 'bg', duration: 68, delay: 18, scale: 0.85, opacity: 0.4 },

    // Middle / Letter Section Clouds
    { id: 'drift-5', top: '32%', layer: 'mid', duration: 46, delay: 12, scale: 1.25, opacity: 0.75 },
    { id: 'drift-6', top: '42%', layer: 'bg', duration: 72, delay: 25, scale: 0.9, opacity: 0.4 },
    { id: 'drift-7', top: '50%', layer: 'fg', duration: 38, delay: 8, scale: 1.5, opacity: 0.9 },
    { id: 'drift-8', top: '58%', layer: 'mid', duration: 54, delay: 30, scale: 1.15, opacity: 0.7 },

    // Lower / Sunset / Ending Section Clouds
    { id: 'drift-9', top: '68%', layer: 'bg', duration: 65, delay: 14, scale: 0.95, opacity: 0.45 },
    { id: 'drift-10', top: '76%', layer: 'mid', duration: 48, delay: 4, scale: 1.3, opacity: 0.8 },
    { id: 'drift-11', top: '85%', layer: 'fg', duration: 42, delay: 22, scale: 1.55, opacity: 0.92 },
    { id: 'drift-12', top: '92%', layer: 'mid', duration: 58, delay: 10, scale: 1.2, opacity: 0.7 },
  ];

  const handleCloudClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const randomMsg = CLOUD_MESSAGES[Math.floor(Math.random() * CLOUD_MESSAGES.length)];
    setActiveMessage({
      id: Date.now(),
      text: randomMsg,
      x: rect.left + rect.width / 2,
      y: rect.top - 20,
    });

    setTimeout(() => {
      setActiveMessage(null);
    }, 2800);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* 1. Side Fixed Flanking Clouds (Framing left & right during scroll) */}
      
      {/* Top Left Puffed Cloud */}
      <motion.div
        animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        onClick={handleCloudClick}
        className="absolute top-[8%] -left-12 sm:-left-8 cursor-pointer pointer-events-auto select-none opacity-75 hover:opacity-100 transition-opacity"
        title="Click the cloud!"
      >
        <svg width="280" height="150" viewBox="0 0 280 150" fill="none">
          <circle cx="90" cy="90" r="55" fill="white" opacity="0.9" />
          <circle cx="160" cy="70" r="65" fill="white" />
          <circle cx="220" cy="95" r="45" fill="white" opacity="0.85" />
          <ellipse cx="150" cy="115" rx="100" ry="28" fill="white" />
        </svg>
      </motion.div>

      {/* Top Right Puffed Cloud */}
      <motion.div
        animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        onClick={handleCloudClick}
        className="absolute top-[18%] -right-16 sm:-right-10 cursor-pointer pointer-events-auto select-none opacity-70 hover:opacity-100 transition-opacity"
        title="Click the cloud!"
      >
        <svg width="300" height="160" viewBox="0 0 300 160" fill="none">
          <circle cx="80" cy="100" r="50" fill="white" opacity="0.8" />
          <circle cx="150" cy="75" r="70" fill="white" />
          <circle cx="225" cy="95" r="55" fill="white" opacity="0.9" />
          <ellipse cx="160" cy="120" rx="110" ry="30" fill="white" />
        </svg>
      </motion.div>

      {/* Mid Left Flanking Cloud (Beside Letter) */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        onClick={handleCloudClick}
        className="absolute top-[38%] -left-16 sm:-left-10 cursor-pointer pointer-events-auto select-none opacity-80 hover:opacity-100 transition-opacity"
        title="Click the cloud!"
      >
        <svg width="320" height="170" viewBox="0 0 320 170" fill="none">
          <circle cx="100" cy="100" r="60" fill="white" />
          <circle cx="170" cy="75" r="75" fill="white" />
          <circle cx="240" cy="105" r="50" fill="white" opacity="0.85" />
          <ellipse cx="170" cy="130" rx="120" ry="32" fill="white" />
        </svg>
      </motion.div>

      {/* Mid Right Flanking Cloud (Beside Letter) */}
      <motion.div
        animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        onClick={handleCloudClick}
        className="absolute top-[48%] -right-16 sm:-right-8 cursor-pointer pointer-events-auto select-none opacity-75 hover:opacity-100 transition-opacity"
        title="Click the cloud!"
      >
        <svg width="290" height="155" viewBox="0 0 290 155" fill="none">
          <circle cx="85" cy="95" r="55" fill="white" opacity="0.85" />
          <circle cx="155" cy="70" r="68" fill="white" />
          <circle cx="225" cy="95" r="50" fill="white" opacity="0.9" />
          <ellipse cx="155" cy="120" rx="105" ry="28" fill="white" />
        </svg>
      </motion.div>

      {/* Lower Left Cloud (Sunset stage) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        onClick={handleCloudClick}
        className="absolute top-[68%] -left-12 sm:-left-6 cursor-pointer pointer-events-auto select-none opacity-85 hover:opacity-100 transition-opacity"
        title="Click the cloud!"
      >
        <svg width="310" height="160" viewBox="0 0 310 160" fill="none">
          <circle cx="95" cy="95" r="58" fill="white" />
          <circle cx="165" cy="70" r="70" fill="white" />
          <circle cx="235" cy="100" r="52" fill="white" opacity="0.9" />
          <ellipse cx="165" cy="125" rx="115" ry="30" fill="white" />
        </svg>
      </motion.div>

      {/* Lower Right Cloud (Sunset stage) */}
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        onClick={handleCloudClick}
        className="absolute top-[82%] -right-12 sm:-right-6 cursor-pointer pointer-events-auto select-none opacity-90 hover:opacity-100 transition-opacity"
        title="Click the cloud!"
      >
        <svg width="340" height="175" viewBox="0 0 340 175" fill="none">
          <circle cx="105" cy="105" r="65" fill="white" />
          <circle cx="180" cy="80" r="75" fill="white" />
          <circle cx="255" cy="110" r="55" fill="white" opacity="0.9" />
          <ellipse cx="180" cy="135" rx="130" ry="32" fill="white" />
        </svg>
      </motion.div>

      {/* 2. Horizontally Drifting Vector Clouds */}
      {driftingClouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute left-0 cursor-pointer pointer-events-auto select-none group anime-cloud"
          style={{
            top: cloud.top,
            opacity: cloud.opacity,
            zIndex: cloud.layer === 'fg' ? 18 : cloud.layer === 'mid' ? 12 : 5,
          }}
          initial={{ x: '-120%' }}
          animate={{ x: '120vw' }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: cloud.delay,
          }}
          onClick={handleCloudClick}
          title="Click to discover a sweet message!"
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{ transform: `scale(${cloud.scale})` }}
            className="filter drop-shadow-lg"
          >
            <svg
              width="260"
              height="140"
              viewBox="0 0 260 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-sm"
            >
              <g filter="url(#cloud-glow)">
                <path
                  d="M50 110 C25 110 10 95 10 75 C10 55 30 45 50 48 C60 25 90 15 120 22 C145 10 185 15 200 42 C225 40 250 58 250 82 C250 102 230 115 205 112 Z"
                  fill="url(#cloud-gradient)"
                />
                <circle cx="85" cy="55" r="38" fill="url(#cloud-highlight)" opacity="0.9" />
                <circle cx="140" cy="45" r="48" fill="url(#cloud-highlight)" opacity="0.95" />
                <circle cx="195" cy="65" r="36" fill="url(#cloud-highlight)" opacity="0.85" />
                <ellipse cx="130" cy="92" rx="90" ry="24" fill="white" opacity="0.95" />
              </g>

              <defs>
                <linearGradient id="cloud-gradient" x1="130" y1="15" x2="130" y2="115" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFFFF" />
                  <stop offset="0.7" stopColor="#F6FBFF" />
                  <stop offset="1" stopColor="#E0F2FE" />
                </linearGradient>
                <linearGradient id="cloud-highlight" x1="100" y1="20" x2="100" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#F0F9FF" />
                </linearGradient>
                <filter id="cloud-glow" x="0" y="0" width="260" height="140" filterUnits="userSpaceOnUse">
                  <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#75C8F5" floodOpacity="0.15" />
                </filter>
              </defs>
            </svg>
          </motion.div>
        </motion.div>
      ))}

      {/* Floating Popup Message on Cloud Click */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            key={activeMessage.id}
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            style={{
              position: 'fixed',
              left: `${activeMessage.x}px`,
              top: `${activeMessage.y}px`,
              transform: 'translate(-50%, -100%)',
              zIndex: 999,
            }}
            className="pointer-events-none"
          >
            <div className="px-4 py-2 rounded-full glass-letter border border-white text-xs md:text-sm font-handwriting text-sky-950 font-bold shadow-xl flex items-center gap-1.5 whitespace-nowrap glow-envelope">
              <span>{activeMessage.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
