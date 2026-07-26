import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import { catalogItems } from '../data';

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="section-padding bg-luxury-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-luxury-gold/4 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="section-label mb-4">What We Offer</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            What We<br />
            <span className="text-gold-gradient">Shoot</span>
          </h2>
          <p className="text-luxury-muted text-lg max-w-2xl mx-auto leading-relaxed">
            From romantic pre-wedding sessions across Tamil Nadu to cinematic portraits — every session is crafted with premium equipment and genuine passion.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {catalogItems.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.7 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative glass-card rounded-2xl p-5 sm:p-6 cursor-pointer overflow-hidden flex flex-col"
            >
              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-luxury-gold/0 group-hover:border-luxury-gold/40 transition-all duration-400" />

              {/* Gold shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 via-transparent to-luxury-gold/5" />
              </div>

              {/* Badge */}
              {service.badge && (
                <div className="absolute top-8 right-8 z-10 px-3 py-1 bg-luxury-gold text-luxury-dark text-[10px] uppercase tracking-widest font-bold rounded-full shadow-lg">
                  {service.badge}
                </div>
              )}

              {/* Image Header with Icon */}
              <div className="relative mb-5 w-full h-44 sm:h-48 rounded-xl overflow-hidden shadow-lg border border-white/5">
                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                
                {/* Icon overlaid */}
                <div className="absolute bottom-3 left-3 w-10 h-10 rounded-lg bg-luxury-gold/20 backdrop-blur-md border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                  {(() => {
                    const Icon = (Icons as any)[service.icon] || Icons.HelpCircle;
                    return <Icon size={18} />;
                  })()}
                </div>
              </div>

              {/* Content */}
              <div className="relative flex-1 flex flex-col">
                <h3 className="font-display font-bold text-xl text-white mb-1 group-hover:text-luxury-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-luxury-gold text-xs font-semibold tracking-wider uppercase mb-3">{service.subtitle}</p>
                <p className="text-luxury-muted text-sm leading-relaxed mb-6 flex-1">{service.description}</p>

                {/* CTA */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-luxury-muted text-[11px] uppercase tracking-widest font-medium group-hover:text-white transition-colors duration-300">View Details</span>
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-10 h-10 rounded-full border border-luxury-border group-hover:border-luxury-gold group-hover:bg-luxury-gold flex items-center justify-center transition-all duration-300"
                  >
                    <Icons.ArrowRight size={16} className="text-luxury-muted group-hover:text-luxury-dark transition-colors duration-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-center mt-14"
        >
          <p className="text-luxury-muted mb-6">
            Have something in mind? Let's make it happen.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-gold"
            >
              Book a Session
            </button>
            <a
              href="https://wa.me/919514362836"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200"
            >
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
