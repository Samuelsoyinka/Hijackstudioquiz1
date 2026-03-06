'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProgressBar from '@/components/ProgressBar';
import TypewriterText from '@/components/TypewriterText';
import AnswerButton from '@/components/AnswerButton';
import { QUESTIONS, TOTAL_STEPS, getQuestion } from '@/lib/questions';
import { computeScores, computeTier } from '@/lib/scoring';
import { loadSession, saveAnswer, getAnswer } from '@/lib/state';
import { submitQuiz } from '@/lib/supabase';

export default function QuizPage() {
    const router = useRouter();
    const params = useParams();
    const step = Number(params.step);
    const question = getQuestion(step);

    const [selected, setSelected] = useState<string | number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Guard: if no session, redirect to contact
    useEffect(() => {
        const session = loadSession();
        if (!session) { router.replace('/contact'); return; }

        // Restore previously saved answer for this question
        if (question) {
            const prev = getAnswer(question.id);
            if (prev !== undefined) setSelected(prev);
            else setSelected(null);
        }
    }, [step, question, router]);

    if (!question) return null;

    const isLastStep = step === TOTAL_STEPS;
    const backHref = step === 1 ? '/contact' : `/quiz/${step - 1}`;

    async function handleNext() {
        if (selected === null && !question?.optional) return;
        if (question) {
            saveAnswer(question.id, selected ?? '');
        }

        if (isLastStep) {
            setIsSubmitting(true);
            const session = loadSession();
            if (session) {
                const a = session.answers;
                const rawAnswers = {
                    q1: Number(a.q1_acquisition_source_clarity ?? 0),
                    q2: Number(a.q2_acquisition_consistency ?? 0),
                    q3: Number(a.q3_acquisition_targeted_marketing ?? 0),
                    q4: Number(a.q4_acquisition_capture_system ?? 0),
                    q5: Number(a.q5_conversion_repeatable_process ?? 0),
                    q6: Number(a.q6_conversion_followup ?? 0),
                    q7: Number(a.q7_conversion_response_speed ?? 0),
                    q8: Number(a.q8_retention_post_purchase_system ?? 0),
                    q9: Number(a.q9_retention_tracking ?? 0),
                    q10: Number(a.q10_retention_communication ?? 0),
                };
                const scores = computeScores(rawAnswers);
                const tier = computeTier(
                    String(a.q11_revenue_range ?? 'not_sure'),
                    String(a.q14_support_type ?? 'not_sure'),
                );

                // Store scores in session for results page
                saveAnswer('__scores__', JSON.stringify({ ...scores, tier }));

                // Persist to Supabase (non-blocking)
                await submitQuiz({
                    submission_id: session.submission_id,
                    contact: session.contact,
                    answers: session.answers,
                    scores,
                    tier,
                });
            }
            router.push('/results');
        } else {
            router.push(`/quiz/${step + 1}`);
        }
    }

    const progressStep = step; // contact = 0, quiz 1–15 = 1–15, submit = 16+
    const canProceed = question.optional ? true : selected !== null;

    return (
        <main className="min-h-screen bg-[#F5F1E8] flex flex-col">
            <ProgressBar step={progressStep} total={17} />

            <div className="flex flex-col items-center flex-1 px-6 py-10">
                {/* Nav bar */}
                <div className="w-full max-w-md mb-10 flex items-center justify-between">
                    <Link href={backHref} className="text-[#888] hover:text-[#1A1A1A] transition-colors text-sm">
                        ← Back
                    </Link>
                    <Image src="/HijackStudioLogo.png" alt="Hijack Studio" width={100} height={28} className="object-contain" priority />
                    <span className="text-xs text-[#AAA] font-medium">{step} / {TOTAL_STEPS}</span>
                </div>

                {/* Category label */}
                {question.category && (
                    <motion.p
                        key={`cat-${step}`}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="w-full max-w-md text-xs font-semibold tracking-[0.2em] text-[#999] uppercase mb-4"
                    >
                        {question.category === 'acquisition' && '🔵 Lead Acquisition'}
                        {question.category === 'conversion' && '🟠 Lead Conversion'}
                        {question.category === 'retention' && '🟢 Lead Retention'}
                    </motion.p>
                )}

                {/* Question */}
                <div className="w-full max-w-md mb-8">
                    <AnimatePresence mode="wait">
                        <motion.div key={`q-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                            {question.type === 'open' ? (
                                <p className="font-serif text-2xl font-bold text-[#1A1A1A] leading-snug mb-6">
                                    {question.text}
                                </p>
                            ) : (
                                <TypewriterText
                                    text={question.text}
                                    className="font-serif text-2xl font-bold text-[#1A1A1A] leading-snug mb-6"
                                    speed={22}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Answer options */}
                <div className="w-full max-w-md flex flex-col gap-3">
                    {question.type === 'open' ? (
                        <textarea
                            id="q15-textarea"
                            value={String(selected ?? '')}
                            onChange={(e) => setSelected(e.target.value)}
                            placeholder={question.placeholder}
                            rows={5}
                            className="w-full px-4 py-3.5 rounded-xl border border-[#D5D0C5] bg-white text-[#1A1A1A] text-[15px] outline-none resize-none focus:ring-2 focus:ring-[#1A1A1A]/20 focus:border-[#1A1A1A] transition-all"
                        />
                    ) : (
                        question.options?.map((opt, i) => (
                            <AnswerButton
                                key={String(opt.value)}
                                label={opt.label}
                                selected={selected === opt.value}
                                onClick={() => setSelected(opt.value)}
                                index={i}
                            />
                        ))
                    )}
                </div>

                {/* Next / Submit */}
                <motion.div
                    className="w-full max-w-md mt-8"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                >
                    <button
                        id={isLastStep ? 'quiz-submit' : 'quiz-next'}
                        onClick={handleNext}
                        disabled={!canProceed || isSubmitting}
                        className="w-full bg-[#1A1A1A] text-white py-4 rounded-xl text-[15px] font-semibold hover:bg-[#333] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Computing your results…' : isLastStep ? 'Submit →' : 'Next →'}
                    </button>
                </motion.div>
            </div>
        </main>
    );
}
