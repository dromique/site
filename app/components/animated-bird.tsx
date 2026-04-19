'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface AnimatedBirdProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function AnimatedBird({ src, alt, width, height }: AnimatedBirdProps) {
  const [isHopping, setIsHopping] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHopping(true);
      setTimeout(() => setIsHopping(false), 600);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`pointer-events-none absolute right-3 sm:right-[2.5vw] transition-all duration-500 ${isHopping ? 'bottom-4 sm:bottom-[calc(2.5vw+0.625vw)]' : 'bottom-3 sm:bottom-[2.5vw]'}`}>
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
