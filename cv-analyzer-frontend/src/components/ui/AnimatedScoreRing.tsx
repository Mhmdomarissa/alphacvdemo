'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedScoreRingProps {
  score: number; // 0-1
  size?: number;
  strokeWidth?: number;
  delay?: number;
}

/**
 * Animated SVG ring that draws itself on scroll into view,
 * with the score number counting up in the center.
 */
export function AnimatedScoreRing({ score, size = 52, strokeWidth = 4, delay = 0 }: AnimatedScoreRingProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  const r = size / 2 - strokeWidth - 1;
  const circ = 2 * Math.PI * r;
  const color = score >= 0.85 ? '#16a34a' : score >= 0.70 ? '#d97706' : '#dc2626';
  const bgStroke = score >= 0.85 ? '#dcfce7' : score >= 0.70 ? '#fef3c7' : '#fee2e2';

  return (
    <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bgStroke} strokeWidth={strokeWidth} />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        animate={isInView ? { strokeDashoffset: circ * (1 - score) } : {}}
        transition={{ duration: 1, delay, ease: 'easeOut' }}
      />
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="11"
        fontWeight="bold"
        fill={color}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.5 }}
      >
        {Math.round(score * 100)}
      </motion.text>
    </svg>
  );
}
