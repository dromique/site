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
    <div className={`absolute right-[2.5vw] transition-all duration-600 pointer-events-none ${isHopping ? 'bottom-[calc(2.5vw+0.625vw)]' : 'bottom-[2.5vw]'}`}>
      <Image 
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        unoptimized
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
