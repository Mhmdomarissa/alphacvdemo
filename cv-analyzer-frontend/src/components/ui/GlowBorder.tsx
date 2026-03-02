'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  /** Duration of one full gradient rotation in seconds */
  duration?: number;
  borderWidth?: number;
  borderRadius?: number;
}

/**
 * Animated gradient border that rotates around a card — inspired by
 * Aceternity "moving border" component.
 */
export function GlowBorder({
  children,
  className = '',
  duration = 4,
  borderWidth = 1.5,
  borderRadius = 16,
}: GlowBorderProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ borderRadius }}
    >
      {/* Rotating gradient border */}
      <div className="absolute -inset-px overflow-hidden" style={{ borderRadius }}>
        <motion.div
          className="absolute w-[200%] h-[200%]"
          style={{
            top: '-50%',
            left: '-50%',
            background: 'conic-gradient(from 0deg, transparent 0%, var(--color-brand-600, #00529b) 20%, transparent 40%, var(--color-brand-600, #00529b) 60%, transparent 80%)',
            opacity: 0.45,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      {/* Inner card with white bg to mask border */}
      <div
        className="relative bg-white"
        style={{
          borderRadius: borderRadius - borderWidth,
          margin: borderWidth,
        }}
      >
        {children}
      </div>
    </div>
  );
}
