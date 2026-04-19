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
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fadeIn = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    audio.volume = 0;
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          let volume = 0;
          fadeIntervalRef.current = setInterval(() => {
            if (volume < 1) {
              volume += 0.05;
              audio.volume = Math.min(volume, 1);
            } else {
              if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            }
          }, 50);
        })
        .catch((error) => console.log('Audio play failed:', error));
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !hasInteracted) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fadeIn();
          }
        });
      },
      { threshold: 0.5 }
    );

    observerRef.current.observe(section);
    
    // Start audio immediately if section is visible
    fadeIn();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [hasInteracted]);

  const handleInteraction = () => {
    setHasInteracted(true);
  };

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center justify-start overflow-hidden bg-[#F7EDE1] px-5 py-24 sm:px-8 md:py-0">
      <ParticleAnimation />
      <audio 
        ref={audioRef} 
        loop
        preload="auto"
        muted={false}
        crossOrigin="anonymous"
      >
        <source src="/sound/683399__joker313__robin2.wav" type="audio/wav" />
      </audio>
      <div className="relative z-10 max-w-xl text-start">
        <h2 className="max-w-[12ch] text-4xl font-bold text-[#C26E4B] font-lora sm:text-5xl lg:text-6xl">{title}</h2>
        <p className="mt-4 max-w-prose text-base text-[#333333] font-inter sm:text-lg">{subtitle}</p>
        {!hasInteracted && (
          <button
            onClick={handleInteraction}
            className="mt-6 rounded-lg bg-[#C26E4B] px-5 py-3 text-sm text-white transition-colors hover:bg-[#A85A3B] sm:px-6 sm:text-base"
          >
            Start
          </button>
        )}
      </div>
      {bird}
      {beak}
      {wings}
    </section>
  );
}