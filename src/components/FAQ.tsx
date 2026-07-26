import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqItems } from '../data';

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [openId, setOpenId] = useState<string | null>('f1');

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <section className="section-padding bg-luxury-dark relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-4">Got Questions?</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Frequently Asked <span className="text-gold-gradient">Questions</span>
          </h2>
          <p className="text-luxury-muted text-lg leading-relaxed">
            Everything you need to know before booking. Can't find your answer?{' '}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-luxury-gold hover:underline"
            >
              Ask us directly →
            </button>
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.6 }}
            >
              <div
                className={`glass-card rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                  openId === item.id
                    ? 'border-luxury-gold/40 shadow-lg shadow-luxury-gold/5'
                    : 'border-luxury-border hover:border-luxury-gold/20'
                }`}
                onClick={() => toggle(item.id)}
              >
                {/* Question */}
                <div className="flex items-center justify-between gap-4 p-5 md:p-6">
                  <h3 className={`font-semibold text-base md:text-lg transition-colors duration-200 ${
                    openId === item.id ? 'text-luxury-gold' : 'text-white'
                  }`}>
                    {item.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openId === item.id
                      ? 'bg-luxury-gold text-luxury-dark'
                      : 'border border-luxury-border text-luxury-muted'
                  }`}>
                    {openId === item.id ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </div>

                {/* Answer */}
                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div className="px-5 md:px-6 pb-6">
                        <div className="h-px bg-luxury-gold/20 mb-5" />
                        <p className="text-luxury-subtle leading-relaxed">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="text-center mt-12 glass-card rounded-2xl p-8"
        >
          <h3 className="font-display font-bold text-2xl text-white mb-3">Still have questions?</h3>
          <p className="text-luxury-muted mb-6">We love talking photography. Reach out and we'll respond within 24 hours.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-gold"
            >
              Send Us a Message
            </button>
            <a href="tel:+919876543210" className="btn-outline">
              Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
