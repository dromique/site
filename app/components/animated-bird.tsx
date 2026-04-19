'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { startSharedHopLoop, subscribeToSharedHop } from '@/app/components/birdMotion';

interface AnimatedBirdProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  motionType?: 'base' | 'underbeak' | 'wing';
}

export default function AnimatedBird({
  src,
  alt,
  width,
  height,
  motionType = 'base',
}: AnimatedBirdProps) {
  const [isHopping, setIsHopping] = useState(false);
  const [isHingeAnimating, setIsHingeAnimating] = useState(false);
  const [wingTiltsDown, setWingTiltsDown] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToSharedHop(setIsHopping);
    startSharedHopLoop();

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (motionType === 'base') return;

    let hingeScheduleTimeout: ReturnType<typeof setTimeout> | null = null;
    let hingeTimeout: ReturnType<typeof setTimeout> | null = null;

    const scheduleNextHinge = () => {
      const randomDelayMs = Math.floor(Math.random() * 7001) + 1000; // 1-8s
      hingeScheduleTimeout = setTimeout(() => {
        if (motionType === 'wing') {
          setWingTiltsDown(Math.random() < 0.35);
        }
        setIsHingeAnimating(true);
        hingeTimeout = setTimeout(() => setIsHingeAnimating(false), 450);
        scheduleNextHinge();
      }, randomDelayMs);
    };

    scheduleNextHinge();

    return () => {
      if (hingeScheduleTimeout) clearTimeout(hingeScheduleTimeout);
      if (hingeTimeout) clearTimeout(hingeTimeout);
    };
  }, [motionType]);

  const basePositionClass =
    isHopping
      ? 'bottom-4 sm:bottom-[calc(2.5vw+0.625vw)]'
      : 'bottom-3 sm:bottom-[2.5vw]';

  const hingeClass =
    motionType === 'wing'
      ? isHingeAnimating
        ? wingTiltsDown
          ? 'origin-top-left rotate-[1deg]'
          : 'origin-top-left rotate-[-1.5deg]'
        : 'origin-top-left rotate-0'
      : '';

  const underbeakSkewDeg = 0.25;
  const hingeStyle =
    motionType === 'underbeak'
      ? {
          transformOrigin: 'bottom right',
          transform: isHingeAnimating ? `skewY(${underbeakSkewDeg}deg)` : 'skewY(0deg)',
        }
      : undefined;

  return (
    <div
      className={`pointer-events-none absolute right-3 transition-all duration-500 sm:right-[2.5vw] ${basePositionClass} ${hingeClass}`}
      style={hingeStyle}
    >
      <Image 
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        unoptimized
        onLoad={() => setIsLoaded(true)}
        className={`h-auto max-w-[42vw] transition-opacity duration-500 sm:max-w-none ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
