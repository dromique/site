'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { startSharedHopLoop, subscribeToSharedHop } from '@/app/components/birdMotion';
import { withBasePath } from '@/app/lib/with-base-path';

interface Particle {
  id: number;
  duration: number;
  startProgress: number;
  amplitude: number;
  frequency: number;
  noteImage: number; // 1-10
  startX: number;
  startY: number;
}

const NOTE_IMAGES = [
  withBasePath('/img/notes/noot1.png'),
  withBasePath('/img/notes/noot2.png'),
  withBasePath('/img/notes/noot3.png'),
  withBasePath('/img/notes/noot4.png'),
  withBasePath('/img/notes/noot5.png'),
  withBasePath('/img/notes/noot6.png'),
  withBasePath('/img/notes/noot7.png'),
  withBasePath('/img/notes/noot8.png'),
  withBasePath('/img/notes/noot9.png'),
  withBasePath('/img/notes/noot10.png'),
];

export default function ParticleAnimation() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHopping, setIsHopping] = useState(false);
  const removalTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const createParticle = (id: number, startProgress = 0): Particle => ({
    id,
    duration: Math.random() * 4 + 8,
    startProgress,
    amplitude: Math.random() * 60 + 30,
    frequency: Math.random() * 1,
    noteImage: Math.floor(Math.random() * NOTE_IMAGES.length),
    startX: Math.random() * 56 - 18,
    startY: Math.random() * 28 - 12,
  });

  const scheduleRemoval = (particle: Particle) => {
    const lifetimeMs = particle.duration * 1000 * (1 - particle.startProgress) + 250;
    const removalTimeout = setTimeout(() => {
      setParticles((current) => current.filter((item) => item.id !== particle.id));
    }, lifetimeMs);

    removalTimeoutsRef.current.push(removalTimeout);
  };

  useEffect(() => {
    const unsubscribe = subscribeToSharedHop(setIsHopping);
    startSharedHopLoop();

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Generate initial particles with sequential staggering to prevent overlap
    const initialParticles: Particle[] = Array.from({ length: 8 }, (_, i) => createParticle(i, Math.random() * 0.7 + 0.15));
    setParticles(initialParticles);
    initialParticles.forEach(scheduleRemoval);

    // Spawn new particles periodically with stagger
    const spawnInterval = setInterval(() => {
      setParticles((prev) => {
        const newParticle = createParticle(Math.max(...prev.map((p) => p.id), -1) + 1, 0);
        scheduleRemoval(newParticle);
        return [...prev, newParticle];
      });
    }, 1200); // Spawn every 1.2 seconds to prevent overlap

    return () => {
      clearInterval(spawnInterval);
      removalTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      removalTimeoutsRef.current = [];
    };
  }, []);

  const anchorPositionClass =
    isHopping
      ? 'bottom-4 sm:bottom-[calc(2.5vw+0.625vw)]'
      : 'bottom-3 sm:bottom-[2.5vw]';

  return (
    <div
      className={`pointer-events-none absolute right-3 overflow-visible transition-all duration-500 sm:right-[2.5vw] ${anchorPositionClass} w-[42vw] max-w-[480px] aspect-480/547 sm:w-[480px]`}
    >
      <style>{`
        @keyframes particleFloat {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(-180px, -220px);
            opacity: 0;
          }
        }

        ${particles
          .map(
            (p) => `
          @keyframes particleWave${p.id} {
            0% {
              transform: translateX(0) translateY(0);
            }
            ${Array.from({ length: 11 }, (_, i) => {
              const progress = i * 10;
              const waveY = Math.sin((progress / 100) * Math.PI * 2 * p.frequency) * p.amplitude;
              return `${progress}% {
                transform: translateX(0) translateY(${waveY}px);
              }`;
            }).join('\n')}
            100% {
              transform: translateX(0) translateY(0);
            }
          }

          .particle-${p.id} {
            animation: particleFloat ${p.duration}s ease-in forwards;
            animation-delay: -${(p.duration * p.startProgress).toFixed(2)}s;
          }

          .particle-wave-${p.id} {
            animation: particleWave${p.id} ${p.duration}s ease-in-out forwards;
            animation-delay: -${(p.duration * p.startProgress).toFixed(2)}s;
          }
        `
          )
          .join('\n')}
      `}</style>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle-${particle.id} absolute`}
          style={{
            left: `${particle.startX}px`,
            top: `${particle.startY}px`,
            width: 'clamp(1.25rem, 4vw, 2.5rem)',
            height: 'clamp(1.25rem, 4vw, 2.5rem)',
          }}
        >
          <div className={`particle-wave-${particle.id} h-full w-full`}>
            <Image 
              src={NOTE_IMAGES[particle.noteImage]}
              alt="music note"
              width={40}
              height={40}
              priority
              unoptimized
              loading="eager"
              onError={(e) => console.log('Image failed to load:', NOTE_IMAGES[particle.noteImage])}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
