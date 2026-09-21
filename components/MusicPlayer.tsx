'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  autoPlayTriggered: boolean;
}

export default function MusicPlayer({ autoPlayTriggered }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStarted = useRef(false);

  // Seek to 1:22 (82s) on load
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      if (!hasStarted.current) {
        audio.currentTime = 82;
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.volume = volume;

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loop back to 1:22 when it reaches end
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      audio.currentTime = 82;
      audio.play().catch(() => {});
    };

    // Also loop via timeupdate if song goes past end naturally
    const handleTimeUpdate = () => {
      if (audio.duration && audio.currentTime >= audio.duration - 0.3) {
        audio.currentTime = 82;
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
    audio.muted = isMuted;

    if (!hasStarted.current) {
      audio.currentTime = 82;
      hasStarted.current = true;
    }

    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Browser blocked autoplay — user needs to interact first
      });
  }, [volume, isMuted]);

  const pauseAudio = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  // Trigger autoplay when envelope is opened
  useEffect(() => {
    if (autoPlayTriggered && !isPlaying) {
      playAudio();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayTriggered]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (audioRef.current) {
      audioRef.current.muted = next;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val === 0) {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.muted = false;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 select-none">
      {/* HTML5 Audio Element — local file */}
      <audio
        ref={audioRef}
        src="/audio/about-you.mp3"
        preload="auto"
      />

      <motion.div
        layout
        className="glass-pill rounded-full border border-white/80 shadow-xl overflow-hidden flex items-center p-1.5 sm:p-2 gap-2 text-sky-950 glow-envelope"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Play / Pause Button */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm text-sky-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-sky-800" />
          ) : (
            <Play className="w-4 h-4 fill-sky-800 ml-0.5" />
          )}
        </button>

        {/* Track Info & Equalizer */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 cursor-pointer pr-1"
        >
          <Music className="w-3.5 h-3.5 text-sky-700 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide truncate max-w-[100px] sm:max-w-[140px]">
              The 1975 — About You
            </span>
            <span className="text-[9px] text-sky-600/80 -mt-0.5">
              {isPlaying ? 'Playing ♪' : 'Paused'}
            </span>
          </div>

          {/* Animated Equalizer Bars */}
          {isPlaying && !isMuted && (
            <div className="flex items-end gap-0.5 h-3 px-1">
              <motion.div
                animate={{ height: ['4px', '12px', '6px', '14px', '4px'] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-0.5 bg-sky-600 rounded-full"
              />
              <motion.div
                animate={{ height: ['8px', '4px', '14px', '6px', '8px'] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                className="w-0.5 bg-sky-500 rounded-full"
              />
              <motion.div
                animate={{ height: ['12px', '6px', '4px', '12px', '12px'] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="w-0.5 bg-sky-400 rounded-full"
              />
            </div>
          )}
        </div>

        {/* Mute + Volume Slider */}
        <div className="flex items-center border-l border-sky-200/60 pl-2">
          <button
            onClick={toggleMute}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-white/60 flex items-center justify-center text-sky-700 transition-colors focus:outline-none"
            aria-label="Toggle mute"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 64, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="overflow-hidden flex items-center pr-2"
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1.5 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  aria-label="Volume slider"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
