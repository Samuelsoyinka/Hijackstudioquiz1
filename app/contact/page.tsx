'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ProgressBar from '@/components/ProgressBar';
import TypewriterText from '@/components/TypewriterText';
import { initSession } from '@/lib/state';

const COUNTRIES = [
    { code: 'NG', dial: '+234', name: 'Nigeria', flag: 'https://flagcdn.com/w20/ng.png' },
    { code: 'US', dial: '+1', name: 'United States', flag: 'https://flagcdn.com/w20/us.png' },
    { code: 'GB', dial: '+44', name: 'United Kingdom', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'ZA', dial: '+27', name: 'South Africa', flag: 'https://flagcdn.com/w20/za.png' },
    { code: 'KE', dial: '+254', name: 'Kenya', flag: 'https://flagcdn.com/w20/ke.png' },
    { code: 'GH', dial: '+233', name: 'Ghana', flag: 'https://flagcdn.com/w20/gh.png' },
    { code: 'IN', dial: '+91', name: 'India', flag: 'https://flagcdn.com/w20/in.png' },
    { code: 'AU', dial: '+61', name: 'Australia', flag: 'https://flagcdn.com/w20/au.png' },
];

export default function ContactPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
    const [whatsapp, setWhatsapp] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
        const fullWhatsapp = whatsapp.trim() ? `${selectedCountry.dial} ${whatsapp.trim()}` : undefined;
        initSession({ name: name.trim(), email: email.trim(), whatsapp: fullWhatsapp });
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
                            <div className="flex w-full rounded-xl border border-[#D5D0C5] bg-white transition-all duration-200 focus-within:ring-2 focus-within:ring-[#1A1A1A]/20 focus-within:border-[#1A1A1A] relative">
                                {/* Custom Dropdown Trigger */}
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 w-[100px] px-4 py-3.5 bg-transparent text-[#1A1A1A] text-[15px] outline-none border-r border-[#D5D0C5] hover:bg-gray-50 transition-colors rounded-l-xl"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-5 h-[15px] object-cover rounded-[2px]" />
                                    <span>{selectedCountry.dial}</span>
                                </button>

                                {/* Custom Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-[220px] max-h-[250px] overflow-y-auto bg-white border border-[#D5D0C5] rounded-xl shadow-xl z-10 py-2 custom-scrollbar">
                                        {COUNTRIES.map((country) => (
                                            <button
                                                key={country.code}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCountry(country);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors ${selectedCountry.code === country.code ? 'bg-[#F5F1E8]' : ''}`}
                                            >
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={country.flag} alt={country.name} className="w-5 h-[15px] object-cover rounded-[2px]" />
                                                <span className="text-[15px] text-[#1A1A1A] flex-1">{country.name}</span>
                                                <span className="text-[14px] text-[#888]">{country.dial}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* WhatsApp Input */}
                                <input
                                    id="whatsapp"
                                    type="tel"
                                    value={whatsapp}
                                    onChange={(e) => setWhatsapp(e.target.value)}
                                    placeholder="800 000 0000"
                                    className="flex-1 px-4 py-3.5 bg-transparent text-[#1A1A1A] text-[15px] outline-none rounded-r-xl"
                                />
                            </div>
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
