import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { pricingPackages } from '../data';

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" className="section-padding bg-luxury-darker relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-luxury-gold/3 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-4">Investment</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Transparent <span className="text-gold-gradient">Pricing</span>
          </h2>
          <p className="text-luxury-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Every package is fully customisable. Prices shown are starting points — your perfect package is built together.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {pricingPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                pkg.popular
                  ? 'bg-gradient-to-b from-luxury-gold/15 to-luxury-card border border-luxury-gold/40 shadow-2xl shadow-luxury-gold/10'
                  : 'glass-card border border-luxury-border hover:border-luxury-gold/30'
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-luxury-gold text-luxury-dark text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  <Zap size={11} className="fill-luxury-dark" />
                  Most Popular
                </div>
              )}

              {/* Package name */}
              <div className="mb-6">
                <h3 className={`font-display font-bold text-2xl mb-1 ${pkg.popular ? 'text-luxury-gold' : 'text-white'}`}>
                  {pkg.name}
                </h3>
                <p className="text-luxury-muted text-sm">{pkg.duration}</p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-luxury-border/40">
                <div className="flex items-end gap-2">
                  <span className="font-display font-bold text-5xl text-white leading-none">{pkg.price}</span>
                </div>
                <p className="text-luxury-muted text-sm mt-2">Starting price · fully customisable</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {pkg.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      pkg.popular ? 'bg-luxury-gold' : 'bg-luxury-gold/20 border border-luxury-gold/40'
                    }`}>
                      <Check size={11} className={pkg.popular ? 'text-luxury-dark' : 'text-luxury-gold'} />
                    </div>
                    <span className="text-luxury-subtle text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-luxury-gold text-luxury-dark hover:bg-luxury-gold-light shadow-lg shadow-luxury-gold/30 hover:shadow-luxury-gold/50'
                    : 'border border-luxury-border text-white hover:border-luxury-gold hover:text-luxury-gold'
                }`}
              >
                {pkg.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <p className="text-luxury-muted text-sm">
            All packages include full copyright transfer. Travel, accommodation, and specialist equipment quoted separately.
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-luxury-gold hover:underline ml-1"
            >
              Let's build your custom package →
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
