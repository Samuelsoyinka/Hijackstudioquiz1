'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProgressBar from '@/components/ProgressBar';
import TypewriterText from '@/components/TypewriterText';
import { initSession } from '@/lib/state';

export default function ContactPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    function validate() {
        const errs: Record<string, string> = {};
        if (!name.trim()) errs.name = 'Name is required.';
        if (!email.trim()) errs.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email.';
        return errs;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        initSession({ name: name.trim(), email: email.trim(), whatsapp: whatsapp.trim() || undefined });
        router.push('/quiz/1');
    }

    return (
        <main className="min-h-screen bg-[#F5F1E8] flex flex-col">
            <ProgressBar step={0} total={17} />

            <div className="flex flex-col items-center justify-center flex-1 px-6 py-12">
                {/* Header */}
                <div className="w-full max-w-md mb-8 flex items-center justify-between">
                    <Link href="/" className="text-[#888] hover:text-[#1A1A1A] transition-colors" aria-label="Back">
                        ← Back
                    </Link>
                    <Image src="/HijackStudioLogo.png" alt="Hijack Studio" width={100} height={28} className="object-contain" priority />
                    <div className="w-12" />
                </div>

                {/* Form card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <TypewriterText
                        text="Before We Begin…"
                        className="font-serif text-3xl font-bold text-[#1A1A1A] mb-3"
                        speed={40}
                    />
                    <p className="text-[#666] text-sm mb-8">
                        Let us know who you are so we can personalise your results.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-[13px] font-medium text-[#444] mb-1.5">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })); }}
                                placeholder="e.g. Amara Johnson"
                                className={`w-full px-4 py-3.5 rounded-xl border bg-white text-[#1A1A1A] text-[15px] outline-none transition-all duration-200
                  focus:ring-2 focus:ring-[#1A1A1A]/20 focus:border-[#1A1A1A]
                  ${errors.name ? 'border-red-400' : 'border-[#D5D0C5]'}`}
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-[13px] font-medium text-[#444] mb-1.5">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
                                placeholder="you@example.com"
                                className={`w-full px-4 py-3.5 rounded-xl border bg-white text-[#1A1A1A] text-[15px] outline-none transition-all duration-200
                  focus:ring-2 focus:ring-[#1A1A1A]/20 focus:border-[#1A1A1A]
                  ${errors.email ? 'border-red-400' : 'border-[#D5D0C5]'}`}
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>

                        {/* WhatsApp */}
                        <div>
                            <label htmlFor="whatsapp" className="block text-[13px] font-medium text-[#444] mb-1.5">
                                WhatsApp Number <span className="text-[#AAA]">(optional)</span>
                            </label>
                            <input
                                id="whatsapp"
                                type="tel"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                placeholder="+234 800 000 0000"
                                className="w-full px-4 py-3.5 rounded-xl border border-[#D5D0C5] bg-white text-[#1A1A1A] text-[15px] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#1A1A1A]/20 focus:border-[#1A1A1A]"
                            />
                        </div>

                        <button
                            id="contact-continue"
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full bg-[#1A1A1A] text-white py-4 rounded-xl text-[15px] font-semibold hover:bg-[#333] transition-colors disabled:opacity-60"
                        >
                            {loading ? 'Starting…' : 'Continue →'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
