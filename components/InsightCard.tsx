'use client';
import { motion } from 'framer-motion';

interface InsightCardProps {
    label: string;
    icon: string;
    text: string;
    color: string;
    index: number;
}

export default function InsightCard({ label, icon, text, color, index }: InsightCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
            className="flex items-start gap-4 py-4 border-b border-[#EDE8DC] last:border-0"
        >
            <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
                style={{ backgroundColor: color + '22' }}
            >
                {icon}
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color }}>
                    {label}
                </p>
                <p className="text-[#3A3A3A] text-[15px] leading-relaxed">{text}</p>
            </div>
        </motion.div>
    );
}
