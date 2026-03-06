'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ScoreRing from '@/components/ScoreRing';
import InsightCard from '@/components/InsightCard';
import { ComputedScores, Tier, TIER_CONTENT, PERFORMANCE_COPY, getInsightText, getRingColor } from '@/lib/scoring';
import { loadSession } from '@/lib/state';

interface ResultsData extends ComputedScores {
    tier: Tier;
}

export default function ResultsPage() {
    const router = useRouter();
    const [data, setData] = useState<ResultsData | null>(null);
    const [name, setName] = useState('');

    useEffect(() => {
        const session = loadSession();
        if (!session) { router.replace('/'); return; }

        const raw = session.answers['__scores__'];
        if (!raw) { router.replace('/quiz/1'); return; }

        try {
            setData(JSON.parse(String(raw)) as ResultsData);
            setName(session.contact.name.split(' ')[0]);
        } catch {
            router.replace('/');
        }
    }, [router]);

    if (!data) {
        return (
            <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const { performance_label, overall_percent, acquisition_percent, conversion_percent,
        retention_percent, focus_area, tier } = data;

    const copy = PERFORMANCE_COPY[performance_label];
    const cta = TIER_CONTENT[tier];
    const ringColor = getRingColor(overall_percent);

    const performanceBadgeColors: Record<string, string> = {
        'Top Performer': '#4CAF7D',
        'Growth Ready': '#F59E0B',
        'Unstable Growth': '#F97316',
        'Leaking Revenue': '#EF4444',
    };
    const badgeColor = performanceBadgeColors[performance_label] ?? '#888';

    const insights = [
        { key: 'acquisition', label: 'Lead Acquisition', icon: '🎯', color: '#3B82F6', pct: acquisition_percent },
        { key: 'conversion', label: 'Lead Conversion', icon: '💬', color: '#8B5CF6', pct: conversion_percent },
        { key: 'retention', label: 'Lead Retention', icon: '🔄', color: '#10B981', pct: retention_percent },
    ] as const;

    const focusColors: Record<string, string> = {
        'Lead Acquisition': '#3B82F6',
        'Lead Conversion': '#8B5CF6',
        'Lead Retention': '#10B981',
    };
    const focusColor = focusColors[focus_area] ?? '#888';

    return (
        <main className="min-h-screen bg-[#F5F1E8] overflow-x-hidden pb-20">

            {/* ── SECTION 1 — BIG REVEAL ───────────────────────── */}
            <section className="relative pt-16 pb-12 px-6 text-center overflow-hidden">
                {/* Background gradient */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#EDE8DC] to-transparent" />
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl opacity-40"
                        style={{ background: `radial-gradient(circle, ${ringColor}33, transparent 70%)` }}
                    />
                </div>

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Image src="/HijackStudioLogo.png" alt="Hijack Studio" width={120} height={34} className="object-contain" priority />
                </div>

                {/* Performance badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold mb-10"
                    style={{ backgroundColor: badgeColor }}
                >
                    <span>●</span> {performance_label}
                </motion.div>

                {/* Animated Score Ring */}
                <div className="flex justify-center mb-8">
                    <ScoreRing percent={overall_percent} size={220} />
                </div>

                {/* Headline + subtitle */}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3"
                >
                    {name ? `${copy.title} ${name}` : copy.title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="text-[#555] text-[16px] leading-relaxed max-w-xl mx-auto"
                >
                    {copy.subtitle}
                </motion.p>
            </section>

            {/* ── SECTION 2 — INSIGHTS CARD ────────────────────── */}
            <section className="px-6 max-w-xl mx-auto mb-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="bg-white rounded-2xl p-7 shadow-sm border border-[#EDE8DC]"
                >
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-5">Your Growth Insights</h2>
                    {insights.map((ins, i) => (
                        <InsightCard
                            key={ins.key}
                            label={`${ins.label} — ${ins.pct}%`}
                            icon={ins.icon}
                            color={ins.color}
                            text={getInsightText(ins.key, ins.pct)}
                            index={i}
                        />
                    ))}
                </motion.div>
            </section>

            {/* ── SECTION 3 — FOCUS AREA ───────────────────────── */}
            <section className="px-6 max-w-xl mx-auto mb-6">
                <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                    className="rounded-2xl p-7 border"
                    style={{ backgroundColor: focusColor + '10', borderColor: focusColor + '30' }}
                >
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: focusColor }}>
                        Primary Focus Area
                    </p>
                    <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">{focus_area}</h3>
                    <p className="text-[#555] text-[14px] leading-relaxed">
                        Improving your {focus_area.toLowerCase()} process will likely create the fastest growth for your business.
                    </p>
                </motion.div>
            </section>

            {/* ── SECTION 4 — NEXT STEP ────────────────────────── */}
            <section className="px-6 max-w-xl mx-auto mb-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-[#EDE8DC] text-center"
                >
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#888] mb-3">Your Recommended Next Step</p>
                    <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6">Ready to act on this?</h3>
                    <button
                        id="results-cta"
                        className="w-full bg-[#1A1A1A] text-white py-4 rounded-xl text-[15px] font-semibold hover:bg-[#333] transition-colors"
                        onClick={() => window.open('https://instagram.com/HijackStudio', '_blank')}
                    >
                        {cta.cta}
                    </button>
                    <p className="mt-3 text-xs text-[#AAA]">{cta.subtext}</p>
                </motion.div>
            </section>

            {/* ── SECTION 5 — FOOTER ───────────────────────────── */}
            <section className="px-6 text-center mt-8">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="text-sm text-[#AAA]"
                >
                    Questions? Reach us on Instagram{' '}
                    <a
                        href="https://instagram.com/HijackStudio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#888] underline hover:text-[#1A1A1A] transition-colors"
                    >
                        @HijackStudio
                    </a>
                </motion.p>
            </section>

        </main>
    );
}
