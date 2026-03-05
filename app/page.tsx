'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-24 overflow-hidden">
        {/* Warm gradient glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[400px] rounded-full bg-gradient-radial from-[#E8D9B8] via-[#F5F1E8]/60 to-transparent opacity-80 blur-3xl" />
        </div>

        {/* Logo */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.5 }}
          className="mb-10 text-xs font-semibold tracking-[0.25em] text-[#888] uppercase"
        >
          Hijack Studio
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.15] max-w-3xl"
        >
          Are You Ready to Double Your Sales Without Doing More?
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-[17px] text-[#555] leading-relaxed max-w-xl"
        >
          Most businesses don&apos;t need more marketing.
          <br />They need <em>better systems.</em>
        </motion.p>

        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10"
        >
          <Link
            href="/contact"
            id="hero-cta"
            className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-4 rounded-full text-[15px] font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Start the Assessment →
          </Link>
        </motion.div>
      </section>

      {/* ── VALUE PROPOSITION ─────────────────────────────── */}
      <section className="py-20 px-6 bg-white/40 backdrop-blur">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4"
          >
            Answer 15 Questions So We Can Measure &amp; Improve Your:
          </motion.h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Lead Acquisition',
                desc: 'Are you consistently bringing in new qualified leads — or relying on luck and referrals?',
                color: '#3B82F6',
              },
              {
                icon: '💬',
                title: 'Lead Conversion',
                desc: 'Do your inquiries turn into paying customers, or do they disappear into silence?',
                color: '#8B5CF6',
              },
              {
                icon: '🔄',
                title: 'Lead Retention',
                desc: 'Are past customers coming back — or are you always starting from zero?',
                color: '#10B981',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-[#EDE8DC] text-left"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: item.color + '18' }}
                >
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY ───────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#E8D9B8] to-[#D4C9A8] flex items-center justify-center"
          >
            <span className="text-6xl">📊</span>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-[#888] uppercase mb-4">Our Approach</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-tight mb-5">
              Built on Real Research &amp; Structured Growth Testing
            </h2>
            <p className="text-[#555] leading-relaxed text-[15px] mb-4">
              The Hijack Studio diagnostic isn&apos;t a generic quiz. It&apos;s a structured evaluation built on the same frameworks we use with growth-stage businesses to identify the exact levers that unlock revenue.
            </p>
            <p className="text-[#555] leading-relaxed text-[15px]">
              Three minutes. Fifteen questions. One personalized growth prescription.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#EDE8DC]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4"
          >
            Get Your Personalized Growth Diagnosis
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[#666] mb-8"
          >
            Takes 3 minutes. Completely free. Immediate recommendation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              href="/contact"
              id="bottom-cta"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-4 rounded-full text-[15px] font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Start the Quiz →
            </Link>
            <div className="mt-5 flex items-center justify-center gap-5 text-sm text-[#888]">
              <span>✓ Takes 3 minutes</span>
              <span>✓ Completely free</span>
              <span>✓ Immediate recommendation</span>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
