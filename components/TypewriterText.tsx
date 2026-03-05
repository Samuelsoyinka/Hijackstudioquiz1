'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number; // ms per character
}

export default function TypewriterText({ text, className = '', speed = 28 }: TypewriterTextProps) {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        setDisplayed('');
        let i = 0;
        const timer = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(timer);
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);

    return (
        <motion.p
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {displayed}
            {displayed.length < text.length && (
                <span className="inline-block w-[2px] h-[1em] bg-current ml-[1px] animate-pulse align-middle" />
            )}
        </motion.p>
    );
}
