'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import ParticleAnimation from './particle-animation';

interface AboveTheFoldProps {
  title: string;
  subtitle: string;
  bird?: ReactNode;
  beak?: ReactNode;
  wings?: ReactNode;
}

export default function AboveTheFold({ title, subtitle, bird, beak, wings }: AboveTheFoldProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeOutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sequenceRunningRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const clearAudioTimers = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
      fadeOutTimeoutRef.current = null;
    }
  };

  const fadeTo = (targetVolume: number, durationMs: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const startVolume = audio.volume;
    const steps = 12;
    let step = 0;

    fadeIntervalRef.current = setInterval(() => {
      step += 1;
      const progress = Math.min(step / steps, 1);
      audio.volume = startVolume + (targetVolume - startVolume) * progress;

      if (progress >= 1 && fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }, Math.max(Math.floor(durationMs / steps), 20));
  };

  const playOnceWithFade = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = 0;

    await audio.play();
    fadeTo(1, 280);

    const scheduleFadeOut = () => {
      if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
      const fadeOutLeadMs = 550;
      const playMs = audio.duration * 1000;
      const triggerInMs = Math.max(playMs - fadeOutLeadMs, 150);

      if (fadeOutTimeoutRef.current) clearTimeout(fadeOutTimeoutRef.current);
      fadeOutTimeoutRef.current = setTimeout(() => {
        fadeTo(0, 420);
      }, triggerInMs);
    };

    if (audio.readyState >= 1) {
      scheduleFadeOut();
    } else {
      audio.addEventListener('loadedmetadata', scheduleFadeOut, { once: true });
    }

    await new Promise<void>((resolve) => {
      const onEnded = () => {
        audio.removeEventListener('ended', onEnded);
        resolve();
      };
      audio.addEventListener('ended', onEnded);
    });

    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
      fadeOutTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearAudioTimers();
    };
  }, []);

  const handleInteraction = async () => {
    const audio = audioRef.current;
    if (!audio || sequenceRunningRef.current) return;

    sequenceRunningRef.current = true;
    setIsPlaying(true);
    audio.loop = false;

    try {
      await playOnceWithFade();
      await playOnceWithFade();
    } catch (error) {
      console.log('Audio play failed:', error);
    } finally {
      clearAudioTimers();
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0;
      setIsPlaying(false);
      sequenceRunningRef.current = false;
    }
  };

  return (
    <section ref={sectionRef} className="relative flex min-h-svh items-center justify-start overflow-hidden bg-[#F7EDE1] px-5 py-24 sm:px-8 md:py-0">
      <ParticleAnimation />
      <audio 
        ref={audioRef} 
        preload="auto"
        muted={false}
        crossOrigin="anonymous"
      >
        <source src="/sound/683399__joker313__robin2.wav" type="audio/wav" />
      </audio>
      <div className="relative z-10 max-w-xl text-start">
        <h2 className="max-w-[12ch] text-4xl font-bold text-[#C26E4B] font-lora sm:text-5xl lg:text-6xl">{title}</h2>
        <p className="mt-4 max-w-prose text-base text-[#333333] font-inter sm:text-lg">{subtitle}</p>
      </div>
      <button
        onClick={handleInteraction}
        disabled={isPlaying}
        className="absolute bottom-2 left-4 z-20 w-auto max-w-[min(90vw,18rem)] rounded-lg bg-[#C26E4B] px-4 py-3 text-center text-sm text-white transition-colors hover:bg-[#A85A3B] disabled:cursor-not-allowed disabled:opacity-70 sm:bottom-4 sm:px-6 sm:text-base"
      >
        {isPlaying ? 'Ik fluit' : 'Ik kan fluiten!'}
      </button>
      {bird}
      {beak}
      {wings}
    </section>
  );
}