'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  delay?: number;
}

export function TextGenerateEffect({ words, className = '', delay = 0 }: TextGenerateEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const parts = words.split(' ');

  return (
    <div ref={ref} className={className}>
      {parts.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, filter: 'blur(4px)', y: 6 }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{ duration: 0.35, delay: delay + i * 0.06 }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
