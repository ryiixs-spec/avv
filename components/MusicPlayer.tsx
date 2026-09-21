'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  autoPlayTriggered: boolean;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: (event: unknown) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState?: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (vol: number) => void;
  isMuted: () => boolean;
  getPlayerState: () => number;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  getCurrentTime: () => number;
}

export default function MusicPlayer({ autoPlayTriggered }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [isExpanded, setIsExpanded] = useState(false);
  const [ytReady, setYtReady] = useState(false);

  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const hasSeekedToStart = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isSynthActiveRef = useRef(false);

  // Fallback Web Audio Synthesizer
  const startFallbackSynth = useCallback(() => {
    if (isSynthActiveRef.current) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      isSynthActiveRef.current = true;

      const chordNotes = [
        [349.23, 440.0, 523.25, 659.25], // Fmaj7
        [329.63, 392.0, 493.88, 587.33], // Em7
        [293.66, 349.23, 440.0, 523.25], // Dm7
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!isSynthActiveRef.current || !audioCtxRef.current) return;
        const currentCtx = audioCtxRef.current;
        if (currentCtx.state === 'suspended') {
          currentCtx.resume();
        }

        const notes = chordNotes[chordIndex];
        notes.forEach((freq) => {
          const osc = currentCtx.createOscillator();
          const gain = currentCtx.createGain();
          const filter = currentCtx.createBiquadFilter();

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(650, currentCtx.currentTime);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, currentCtx.currentTime);

          const now = currentCtx.currentTime;
          const targetVol = isMuted ? 0 : volume * 0.05;

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(targetVol, now + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(currentCtx.destination);

          osc.start(now);
          osc.stop(now + 5.0);
        });

        chordIndex = (chordIndex + 1) % chordNotes.length;
      };

      playChord();
      synthTimerRef.current = setInterval(playChord, 4200);
    } catch {
      // ignore
    }
  }, [isMuted, volume]);

  const stopFallbackSynth = useCallback(() => {
    isSynthActiveRef.current = false;
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try {
        audioCtxRef.current.close();
      } catch {
        // ignore
      }
      audioCtxRef.current = null;
    }
  }, []);

  // Initialize YouTube IFrame Player
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        new window.YT.Player('yt-bg-player', {
          videoId: 'tGv7CUutzqU',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            start: 82,
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: (e) => {
              ytPlayerRef.current = e.target;
              e.target.setVolume(volume * 100);
              try {
                e.target.seekTo(82, true);
              } catch {
                // ignore
              }
              setYtReady(true);
            },
            onStateChange: (e) => {
              if (window.YT?.PlayerState) {
                if (e.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                } else if (e.data === window.YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                } else if (e.data === window.YT.PlayerState.ENDED) {
                  // Loop back to 1:22 (82s)
                  try {
                    ytPlayerRef.current?.seekTo(82, true);
                    ytPlayerRef.current?.playVideo();
                  } catch {
                    setIsPlaying(false);
                  }
                }
              }
            },
            onError: () => {
              // Fallback to local audio / synth if YouTube embedding is restricted
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  }, [volume]);

  const playAudio = useCallback(() => {
    let playedFromYt = false;
    if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.setVolume(volume * 100);
        if (isMuted) {
          ytPlayerRef.current.mute();
        } else {
          ytPlayerRef.current.unMute();
        }
        if (!hasSeekedToStart.current) {
          ytPlayerRef.current.seekTo(82, true);
          hasSeekedToStart.current = true;
        }
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
        playedFromYt = true;
      } catch {
        // fallback
      }
    }

    if (!playedFromYt) {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            startFallbackSynth();
            setIsPlaying(true);
          });
      } else {
        startFallbackSynth();
        setIsPlaying(true);
      }
    }
  }, [volume, isMuted, startFallbackSynth]);

  const pauseAudio = useCallback(() => {
    if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.pauseVideo();
      } catch {
        // ignore
      }
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopFallbackSynth();
    setIsPlaying(false);
  }, [stopFallbackSynth]);

  // Trigger when user opens the envelope
  useEffect(() => {
    if (autoPlayTriggered && !isPlaying) {
      playAudio();
    }
  }, [autoPlayTriggered, isPlaying, playAudio]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const toggleMute = () => {
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);

    if (ytPlayerRef.current) {
      try {
        if (nextMuteState) {
          ytPlayerRef.current.mute();
        } else {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(volume * 100);
        }
      } catch {
        // ignore
      }
    }

    if (audioRef.current) {
      audioRef.current.muted = nextMuteState;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);

    if (ytPlayerRef.current) {
      try {
        ytPlayerRef.current.setVolume(val * 100);
        if (val === 0) {
          ytPlayerRef.current.mute();
        } else if (isMuted) {
          ytPlayerRef.current.unMute();
        }
      } catch {
        // ignore
      }
    }

    if (audioRef.current) {
      audioRef.current.volume = val;
    }

    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 select-none">
      {/* Hidden YouTube Iframe Player container */}
      <div className="hidden pointer-events-none opacity-0" aria-hidden="true">
        <div id="yt-bg-player" />
      </div>

      {/* Hidden HTML5 Audio element fallback */}
      <audio
        ref={audioRef}
        src="/audio/about-you.mp3"
        loop
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
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-sky-800" />
          ) : (
            <Play className="w-4 h-4 fill-sky-800 ml-0.5" />
          )}
        </button>

        {/* Music Info & Animated Equalizer Waves */}
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
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
          </div>

          {/* Equalizer Waveform Bars */}
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

        {/* Mute / Unmute & Volume slider controls (Expandable) */}
        <div className="flex items-center border-l border-sky-200/60 pl-2">
          <button
            onClick={toggleMute}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-white/60 flex items-center justify-center text-sky-700 transition-colors focus:outline-none"
            aria-label="Toggle background music mute"
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
