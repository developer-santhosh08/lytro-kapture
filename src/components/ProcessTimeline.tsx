import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { processSteps } from '../data';

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding bg-luxury-dark relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-luxury-gold/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-luxury-gold/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-luxury-gold/5 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="section-label mb-4">How We Work</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            The <span className="text-gold-gradient">Lytro</span> Process
          </h2>
          <p className="text-luxury-muted text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            A thoughtful, collaborative process designed to make your photography experience effortless and memorable.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-luxury-gold/40 to-transparent origin-top"
          />

          <div className="space-y-12 lg:space-y-0">
            {processSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${i > 0 ? 'lg:mt-16' : ''}`}
                >
                  {/* Content */}
                  <div className={isLeft ? 'lg:text-right' : 'lg:order-2'}>
                    <div className={`glass-card rounded-2xl p-6 md:p-8 group hover:border-luxury-gold/30 border border-luxury-border/50 transition-all duration-300 hover:-translate-y-1`}>
                      {/* Step number */}
                      <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                        <span className="text-4xl">{step.icon}</span>
                        <span className="font-display font-bold text-5xl text-luxury-gold/20 group-hover:text-luxury-gold/40 transition-colors duration-300 select-none">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-2xl text-white mb-3">{step.title}</h3>
                      <p className="text-luxury-muted leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.15, type: 'spring' }}
                      className="w-10 h-10 rounded-full bg-luxury-dark border-2 border-luxury-gold flex items-center justify-center"
                    >
                      <div className="w-3 h-3 rounded-full bg-luxury-gold" />
                    </motion.div>
                  </div>

                  {/* Empty column for alignment */}
                  <div className={isLeft ? 'hidden lg:block' : 'hidden lg:block lg:order-1'} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="text-center mt-16"
        >
          <p className="text-luxury-muted mb-6">Ready to start your journey?</p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold"
          >
            Begin with a Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
