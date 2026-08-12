import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: 'A rare mix of AI depth and product taste. The systems feel built for real users, not just demos.',
    name: 'Product Lead',
    role: 'Enterprise AI',
  },
  {
    quote: 'Strong architecture, clean delivery, and a sharp understanding of how to ship reliable LLM workflows.',
    name: 'Engineering Manager',
    role: 'Backend Platform',
  },
  {
    quote: 'The portfolio presentation matches the engineering quality. It reads like a premium AI startup site.',
    name: 'Technical Reviewer',
    role: 'AI Systems',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % TESTIMONIALS.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="section-container">
      <p className="eyebrow">08. TESTIMONIALS</p>
      <h2 className="section-title">What people say about the <span className="gradient-text">work</span></h2>
      <p className="section-subtitle">A lightweight auto-rotating carousel with a glassmorphism presentation.</p>

      <div className="mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.55 }}
            className="glass rounded-[34px] p-8 text-center"
          >
            <p className="mx-auto max-w-3xl text-xl leading-8 text-white sm:text-2xl">“{TESTIMONIALS[index].quote}”</p>
            <div className="mt-6 text-sm text-slate-300">
              <div className="font-semibold text-white">{TESTIMONIALS[index].name}</div>
              <div className="uppercase tracking-[0.18em] text-slate-400">{TESTIMONIALS[index].role}</div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex justify-center gap-2">
          {TESTIMONIALS.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setIndex(dotIndex)}
              className={`h-2.5 rounded-full transition-all duration-200 ${index === dotIndex ? 'w-10 bg-cyan-300' : 'w-2.5 bg-white/20'}`}
              aria-label={`Show testimonial ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}