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
            className="flex items-start gap-4 py-5 border-b border-[#EDE8DC] last:border-0"
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 mt-0.5"
                style={{ backgroundColor: color + '15', color: color }}
            >
                {icon}
            </div>
            <div className="flex-1 mt-0.5 text-left">
                <p className="text-[15px] font-medium text-[#555] leading-relaxed">
                    {label}
                </p>
                {text && <p className="text-[#666] text-[14px] leading-relaxed mt-1">{text}</p>}
            </div>
            <div className="hidden sm:flex mt-1">
                {/* Optional high/moderate text placeholder for future expansion to match reference fully */}
            </div>
        </motion.div>
    );
}
