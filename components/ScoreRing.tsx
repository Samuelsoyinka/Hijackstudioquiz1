'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getRingColor } from '@/lib/scoring';

interface ScoreRingProps {
    percent: number;
    size?: number;
}

export default function ScoreRing({ percent, size = 200 }: ScoreRingProps) {
    const radius = (size - 24) / 2;
    const circumference = 2 * Math.PI * radius;
    const color = getRingColor(percent);

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background ring */}
                <svg width={size} height={size} className="rotate-[-90deg]">
                    <circle
                        cx={size / 2} cy={size / 2} r={radius}
                        fill="none"
                        stroke="#E8E4DA"
                        strokeWidth={12}
                    />
                    {/* Animated progress ring */}
                    <motion.circle
                        cx={size / 2} cy={size / 2} r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={12}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: circumference - (percent / 100) * circumference }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                </svg>
                {/* Center percentage */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        className="text-4xl font-bold text-[#1A1A1A] font-serif"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        {percent}%
                    </motion.span>
                </div>
            </div>
            <p className="text-sm text-[#666] tracking-wide uppercase font-medium">Business Health Score</p>
        </div>
    );
}
