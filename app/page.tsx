'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#F5F1E8] text-[#1a1a1a]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-20 py-6 border-b border-[#1a1a1a]/10">
        <div className="flex items-center gap-3">
          <Image src="/HijackStudioLogo.png" alt="Hijack Studio Logo" width={40} height={40} className="rounded-lg object-contain" />
          <h2 className="text-xl font-bold tracking-tight">Hijack Studio</h2>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          <a className="text-sm font-medium hover:text-[#1a1a1a]/70 transition-colors" href="#how-it-works">How It Works</a>
          <a className="text-sm font-medium hover:text-[#1a1a1a]/70 transition-colors" href="#meet-the-expert">Meet The Expert</a>
          <a className="text-sm font-medium hover:text-[#1a1a1a]/70 transition-colors" href="#assessment">Assessment</a>
        </nav>
        <Link href="/contact" className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#1a1a1a]/90 transition-all">
          Start Quiz
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 xl:py-40 max-w-5xl mx-auto">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-[600px] h-[400px] rounded-full bg-gradient-radial from-[#eadebe] via-[#F5F1E8]/60 to-transparent opacity-80 blur-3xl" />
        </div>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-[#1a1a1a]"
        >
          Are You Ready to Double Your Sales Without Even Doing More?
        </motion.h1>
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-[#1a1a1a]/60 max-w-2xl mb-12"
        >
          Your Scale reside in the 20% of things you don&apos;t even know about. <div className="mt-2 font-medium">Let&apos;s Find it</div>
        </motion.div>
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/contact"
            className="bg-[#1a1a1a] text-white px-10 py-5 rounded-lg text-lg font-bold hover:scale-[1.02] hover:shadow-xl transition-all flex items-center gap-2"
          >
            Start the Assessment
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section id="how-it-works" className="bg-[#1a1a1a]/5 py-24 px-6 border-y border-[#1a1a1a]/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center text-sm md:text-lg font-bold font-sans uppercase tracking-[0.2em] mb-12 text-[#1a1a1a]"
          >
            Answer these 15 questions so we can measure &amp; improve your:
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
                title: 'Lead Acquisition',
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3-4 4 4 4" /><path d="M20 7H4" /><path d="m8 21 4-4-4-4" /><path d="M4 17h16" /></svg>,
                title: 'Lead Conversion',
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>,
                title: 'Lead Retention',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-[#F5F1E8] md:bg-white p-8 rounded-xl border border-[#1a1a1a]/5 shadow-sm"
              >
                <div className="size-12 bg-[#1a1a1a]/10 rounded-lg flex items-center justify-center text-[#1a1a1a] mb-6">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section id="meet-the-expert" className="max-w-6xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative max-w-sm mx-auto md:mx-0 md:max-w-none"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a1a1a]/10 shadow-lg">
            <Image src="/AuthorImage.png" alt="Founder Portrait" width={600} height={800} className="w-full h-full object-cover" priority />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-2xl border border-black/5 whitespace-nowrap">
            <p className="text-sm text-[#1a1a1a]/80 font-medium italic">&quot;precision beats activity every single time&quot;</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-5xl font-serif font-bold mb-8 text-[#1a1a1a] leading-tight">Built on Real Research &amp; Structured Growth Testing</h3>
          <p className="text-lg text-[#1a1a1a]/70 mb-6 leading-relaxed">
            I&apos;ve spent years analyzing why some businesses scale effortlessly while others get stuck. The secret isn&apos;t working harder—it&apos;s building predictable systems.
          </p>
          <p className="text-lg text-[#1a1a1a]/70 leading-relaxed">
            This diagnostic tool removes the guesswork, giving you a clear roadmap to sustainable growth.
          </p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section id="assessment" className="py-24 px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-[#eaddc4] p-12 md:p-20 rounded-[2rem] text-center shadow-lg border border-[#e1d0b0]"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] mb-8 leading-tight">
            Get Your Personalized Growth Diagnosis
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 text-[16px] text-[#1a1a1a]/80 mb-10 font-bold">
            <span className="flex items-center gap-2"><svg className="text-green-700" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Takes 3 minutes</span>
            <span className="flex items-center gap-2"><svg className="text-green-700" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Completely free</span>
            <span className="flex items-center gap-2"><svg className="text-green-700" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Immediate recommendation</span>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-10 py-5 rounded-lg text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Start the Quiz →
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
