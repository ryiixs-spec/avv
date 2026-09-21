'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MountainsProps {
  scrollYProgress?: number;
}

export default function Mountains({ scrollYProgress = 0 }: MountainsProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none z-10 overflow-hidden h-[420px] sm:h-[520px] md:h-[620px]">
      {/* 1. Far Mountains Layer */}
      <motion.div
        style={{ y: scrollYProgress * 50 }}
        className="absolute inset-x-0 bottom-0 w-full h-[320px] sm:h-[400px] md:h-[480px] opacity-45"
      >
        <svg
          viewBox="0 0 1440 400"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="far-mountain-grad" x1="720" y1="0" x2="720" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9FC3CE" />
              <stop offset="0.6" stopColor="#B5D6DF" />
              <stop offset="1" stopColor="#D2E8EF" />
            </linearGradient>
          </defs>
          <path
            d="M0 400L0 220C120 190 230 110 380 140C520 170 610 80 760 130C900 170 1020 70 1160 110C1280 150 1380 190 1440 210L1440 400Z"
            fill="url(#far-mountain-grad)"
          />
        </svg>
      </motion.div>

      {/* Far Fog / Mist Band */}
      <div className="absolute inset-x-0 bottom-36 sm:bottom-48 h-24 bg-gradient-to-t from-white/40 via-white/15 to-transparent pointer-events-none" />

      {/* 2. Middle Mountains Layer */}
      <motion.div
        style={{ y: scrollYProgress * 30 }}
        className="absolute inset-x-0 bottom-0 w-full h-[240px] sm:h-[320px] md:h-[390px] opacity-80"
      >
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="mid-mountain-grad" x1="720" y1="0" x2="720" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6F9FA8" />
              <stop offset="0.5" stopColor="#87B4BD" />
              <stop offset="1" stopColor="#AFD3DA" />
            </linearGradient>
          </defs>
          <path
            d="M0 320L0 180C140 120 260 210 420 130C580 60 710 170 870 110C1010 60 1180 160 1320 120C1380 100 1410 140 1440 160L1440 320Z"
            fill="url(#mid-mountain-grad)"
          />
        </svg>
      </motion.div>

      {/* Middle Mist Band */}
      <div className="absolute inset-x-0 bottom-16 sm:bottom-28 h-20 bg-gradient-to-t from-white/50 via-white/20 to-transparent pointer-events-none" />

      {/* 3. Front Mountains Layer with Pine silhouettes & Soft highlights */}
      <motion.div
        style={{ y: scrollYProgress * 15 }}
        className="absolute inset-x-0 bottom-0 w-full h-[180px] sm:h-[240px] md:h-[290px]"
      >
        <svg
          viewBox="0 0 1440 250"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="front-mountain-grad" x1="720" y1="0" x2="720" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4E7C69" />
              <stop offset="0.4" stopColor="#5D8B78" />
              <stop offset="1" stopColor="#7DAA97" />
            </linearGradient>
            <linearGradient id="front-mountain-left" x1="200" y1="0" x2="200" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="#436F5D" />
              <stop offset="1" stopColor="#639380" />
            </linearGradient>
          </defs>
          
          {/* Back ridge */}
          <path
            d="M0 250L0 140C90 120 180 90 290 130C410 170 540 85 680 135C820 180 960 90 1100 125C1240 160 1360 110 1440 140L1440 250Z"
            fill="url(#front-mountain-grad)"
          />
          
          {/* Rolling front peaks with soft slope lighting */}
          <path
            d="M0 250L0 170C150 130 280 200 450 145C620 90 770 190 940 140C1110 95 1290 180 1440 150L1440 250Z"
            fill="url(#front-mountain-left)"
            opacity="0.85"
          />

          {/* Stylized Anime Pine Silhouettes on foreground ridges */}
          <g fill="#375D4E" opacity="0.6">
            <polygon points="120,165 116,177 124,177" />
            <polygon points="125,160 120,174 130,174" />
            <polygon points="135,168 131,180 139,180" />

            <polygon points="430,140 425,155 435,155" />
            <polygon points="440,135 434,152 446,152" />
            <polygon points="450,142 445,157 455,157" />

            <polygon points="910,135 905,150 915,150" />
            <polygon points="920,130 914,147 926,147" />

            <polygon points="1260,150 1255,165 1265,165" />
            <polygon points="1270,144 1264,162 1276,162" />
          </g>
        </svg>
      </motion.div>

      {/* Ground cloud fluff layer at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none" />
    </div>
  );
}
