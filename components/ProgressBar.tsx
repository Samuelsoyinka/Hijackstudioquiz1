'use client';

interface ProgressBarProps {
    step: number;  // 0-indexed (0 = contact page)
    total: number; // 17 total steps after landing
}

export default function ProgressBar({ step, total }: ProgressBarProps) {
    const percent = Math.min(Math.round(((step) / total) * 100), 100);

    return (
        <div className="w-full h-[3px] bg-[#E8E4DA] relative">
            <div
                className="h-full bg-[#1A1A1A] transition-all duration-500 ease-out"
                style={{ width: `${percent}%` }}
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
            />
        </div>
    );
}
