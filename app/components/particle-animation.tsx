'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Particle {
  id: number;
  duration: number;
  delay: number;
  amplitude: number;
  frequency: number;
  noteImage: number; // 1-10
}

const NOTE_IMAGES = [
  '/img/notes/noot1.png',
  '/img/notes/noot2.png',
  '/img/notes/noot3.png',
  '/img/notes/noot4.png',
  '/img/notes/noot5.png',
  '/img/notes/noot6.png',
  '/img/notes/noot7.png',
  '/img/notes/noot8.png',
  '/img/notes/noot9.png',
  '/img/notes/noot10.png',
];

export default function ParticleAnimation() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate initial particles with sequential staggering to prevent overlap
    const initialParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      duration: Math.random() * 4 + 8, // 8-12 seconds
      delay: i * 0.6, // Sequential stagger: 0s, 0.6s, 1.2s, etc.
      amplitude: Math.random() * 60 + 30, // 30-90px wave amplitude
      frequency: Math.random() * 1 , // 1-2 oscillations
      noteImage: Math.floor(Math.random() * NOTE_IMAGES.length),
    }));
    setParticles(initialParticles);

    // Spawn new particles periodically with stagger
    const spawnInterval = setInterval(() => {
      setParticles((prev) => {
        const newParticle: Particle = {
          id: Math.max(...prev.map((p) => p.id), -1) + 1,
          duration: Math.random() * 4 + 8,
          delay: 0.6, // Minimum delay to prevent immediate overlap
          amplitude: Math.random() * 60 + 30,
          frequency: Math.random() * 1 , // 1-2 oscillations
          noteImage: Math.floor(Math.random() * NOTE_IMAGES.length),
        };
        return [...prev, newParticle];
      });
    }, 1200); // Spawn every 1.2 seconds to prevent overlap

    return () => clearInterval(spawnInterval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes particleFloat {
          0% {
            right: 30vw;
            top: 25vh;
            opacity: 1;
          }
          100% {
            right: calc(50% - 20px);
            top: 0;
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
            animation: 
              particleFloat ${p.duration}s ease-in forwards,
              particleWave${p.id} ${p.duration}s ease-in-out forwards;
            animation-delay: ${p.delay}s;
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
            right: '30vw',
            top: '25vh',
            width: '40px',
            height: '40px',
          }}
        >
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
      ))}
    </div>
  );
}
