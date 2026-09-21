'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Envelope from '@/components/Envelope';
import Intro from '@/components/Intro';
import SkyScene from '@/components/SkyScene';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  const [phase, setPhase] = useState<'envelope' | 'intro' | 'main'>('envelope');
  const [musicStarted, setMusicStarted] = useState(false);

  const handleEnvelopeOpen = () => {
    setMusicStarted(true);
    setPhase('intro');
  };

  const handleIntroComplete = () => {
    setPhase('main');
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#87CEEB]">
      {/* Background Music Player (Persistent across entire experience) */}
      <MusicPlayer autoPlayTriggered={musicStarted} />

      <AnimatePresence mode="wait">
        {phase === 'envelope' && (
          <motion.div
            key="envelope-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-gradient-to-b from-[#75C8F5] via-[#A9DFF7] to-[#E7F8FF] overflow-hidden"
          >
            <Envelope onOpen={handleEnvelopeOpen} />
          </motion.div>
        )}

        {phase === 'intro' && (
          <Intro key="intro-screen" onComplete={handleIntroComplete} />
        )}

        {phase === 'main' && (
          <motion.div
            key="main-scene"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full"
          >
            <SkyScene />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
