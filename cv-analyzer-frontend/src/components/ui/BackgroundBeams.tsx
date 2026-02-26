'use client';
import { motion } from 'framer-motion';

/**
 * Animated beam lines that flow diagonally across a hero section.
 * Inspired by Aceternity-UI BackgroundBeams.
 */
export function BackgroundBeams() {
  const beams = [
    { x1: '10%', y1: '-10%', x2: '45%', y2: '110%', delay: 0, dur: 7, width: 1.5, opacity: 0.12 },
    { x1: '30%', y1: '-10%', x2: '65%', y2: '110%', delay: 1.5, dur: 8, width: 2, opacity: 0.10 },
    { x1: '55%', y1: '-10%', x2: '90%', y2: '110%', delay: 0.8, dur: 9, width: 1, opacity: 0.08 },
    { x1: '75%', y1: '-10%', x2: '95%', y2: '110%', delay: 2.2, dur: 6, width: 1.5, opacity: 0.10 },
    { x1: '20%', y1: '-10%', x2: '55%', y2: '110%', delay: 3, dur: 10, width: 1, opacity: 0.06 },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {beams.map((_, i) => (
          <linearGradient key={i} id={`beam-grad-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="40%" stopColor="white" stopOpacity="1" />
            <stop offset="60%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {beams.map((b, i) => (
        <motion.line
          key={i}
          x1={b.x1}
          y1={b.y1}
          x2={b.x2}
          y2={b.y2}
          stroke={`url(#beam-grad-${i})`}
          strokeWidth={b.width}
          strokeOpacity={b.opacity}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, b.opacity, 0],
          }}
          transition={{
            duration: b.dur,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
}
