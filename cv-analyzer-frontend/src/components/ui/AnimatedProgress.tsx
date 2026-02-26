'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedProgressProps {
  value: number; // 0-1
  color?: string;
  bgColor?: string;
  height?: number;
  className?: string;
  delay?: number;
}

/** Score bar that animates its width on scroll into view. */
export function AnimatedProgress({
  value,
  color = '#00529b',
  bgColor = '#e5e7eb',
  height = 6,
  className = '',
  delay = 0,
}: AnimatedProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <div ref={ref} className={`w-full rounded-full overflow-hidden ${className}`} style={{ height, background: bgColor }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${Math.round(value * 100)}%` } : {}}
        transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      />
    </div>
  );
}
