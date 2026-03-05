'use client';
import { motion } from 'framer-motion';

interface AnswerButtonProps {
    label: string;
    selected: boolean;
    onClick: () => void;
    index: number;
}

export default function AnswerButton({ label, selected, onClick, index }: AnswerButtonProps) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 + 0.4, duration: 0.3 }}
            onClick={onClick}
            className={`
        w-full text-left px-5 py-4 rounded-xl border text-[15px] font-medium
        transition-all duration-200 cursor-pointer
        ${selected
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-[#D5D0C5] hover:border-[#1A1A1A] hover:shadow-sm'
                }
      `}
        >
            {label}
        </motion.button>
    );
}
