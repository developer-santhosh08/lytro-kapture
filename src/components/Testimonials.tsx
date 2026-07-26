import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '../data';

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(p => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent(p => (p - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent(p => (p + 1) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section className="section-padding bg-luxury-darker relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-luxury-gold/4 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-luxury-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Client Love</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            What Our Clients <span className="text-gold-gradient">Say</span>
          </h2>
        </motion.div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Main testimonial */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card rounded-3xl p-8 md:p-12 relative"
            >
              {/* Decorative quote */}
              <div className="absolute top-8 right-10 opacity-5">
                <Quote size={120} className="text-luxury-gold fill-luxury-gold" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-luxury-gold fill-luxury-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-luxury-subtle text-lg md:text-xl leading-relaxed mb-8 font-light italic">
                "{t.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-luxury-gold/40"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-luxury-gold rounded-full flex items-center justify-center">
                    <Quote size={9} className="text-luxury-dark fill-luxury-dark" />
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-lg">{t.name}</h4>
                  <p className="text-luxury-gold text-sm font-medium">{t.eventType}</p>
                  <p className="text-luxury-muted text-sm">{t.location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'bg-luxury-gold w-8 h-2'
                      : 'bg-luxury-border w-2 h-2 hover:bg-luxury-muted'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-luxury-border flex items-center justify-center text-luxury-muted hover:border-luxury-gold hover:text-luxury-gold transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-luxury-border flex items-center justify-center text-luxury-muted hover:border-luxury-gold hover:text-luxury-gold transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* All clients strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6"
        >
          <p className="text-luxury-muted text-sm">Trusted by families and brands across India:</p>
          {['Wedding Families', 'Corporate Brands', 'Fashion Clients', 'Event Organisers', 'Couples Worldwide'].map(brand => (
            <span key={brand} className="text-luxury-subtle text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
