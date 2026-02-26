'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number | string;
  duration?: number;
  className?: string;
  suffix?: string;
}

export function AnimatedCounter({ value, duration = 1.2, className = '', suffix = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const isPercent = typeof value === 'string' && value.includes('%');

  useEffect(() => {
    if (!isInView) return;
    const start = 0;
    const end = numericValue;
    const startTime = performance.now();
    const dur = duration * 1000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / dur, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, numericValue, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {display}
      {isPercent ? '%' : suffix}
    </motion.span>
  );
}
