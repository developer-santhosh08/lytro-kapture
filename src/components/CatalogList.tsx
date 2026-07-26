import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';
import { catalogItems } from '../data';

export default function CatalogList() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState<string | null>(null);

  const selectedItem = catalogItems.find(c => c.id === selected);

  return (
    <section id="catalog" className="pt-8 md:pt-10 pb-10 md:pb-16 bg-luxury-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(245,158,11,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-4">What We Offer</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-5">
            Our Services <span className="text-gold-gradient">Catalog</span>
          </h2>
          <p className="text-luxury-muted text-lg max-w-xl mx-auto leading-relaxed">
            Click any service to explore details and book directly on WhatsApp.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {catalogItems.map((item, i) => {
            const Icon = (Icons as any)[item.icon] || Icons.Camera;
            const isSelected = selected === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.6 }}
              >
                <button
                  onClick={() => setSelected(isSelected ? null : item.id)}
                  className="group relative w-full rounded-2xl overflow-hidden text-left transition-all duration-300 focus:outline-none"
                  style={{
                    aspectRatio: '3/4',
                    boxShadow: isSelected
                      ? '0 0 0 2px #F59E0B, 0 20px 50px rgba(0,0,0,0.5)'
                      : '0 8px 32px rgba(0,0,0,0.35)',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  {/* Background image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Gradient overlay — always */}
                  <div className="absolute inset-0 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(7,11,20,0.96) 0%, rgba(7,11,20,0.55) 45%, rgba(7,11,20,0.15) 100%)' }} />

                  {/* Hover extra darkening */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(245,158,11,0.06)' }} />

                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
                      style={{ background: '#F59E0B', color: '#0F172A' }}>
                      {item.badge}
                    </div>
                  )}

                  {/* Selected checkmark */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: '#F59E0B' }}
                    >
                      <Icons.Check size={14} color="#0F172A" strokeWidth={2.5} />
                    </motion.div>
                  )}

                  {/* Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isSelected ? 'transparent' : 'rgba(245,158,11,0.18)',
                      border: '1px solid rgba(245,158,11,0.35)',
                      opacity: isSelected ? 0 : 1,
                      backdropFilter: 'blur(8px)',
                    }}>
                    <Icon size={14} className="text-[#F59E0B]" />
                  </div>

                  {/* Bottom text */}
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <p className="text-[#F59E0B] text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{item.subtitle}</p>
                    <h3 className={`font-display font-bold leading-snug transition-colors duration-200 ${isSelected ? 'text-[#FCD34D]' : 'text-white group-hover:text-[#FDE68A]'}`}
                      style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}>
                      {item.title}
                    </h3>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded detail panel */}
        <AnimatePresence mode="wait">
          {selectedItem && (
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, y: 24, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 16, height: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden mt-5"
            >
              <div
                className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-start"
                style={{
                  background: 'rgba(17,24,39,0.75)',
                  border: '1px solid rgba(245,158,11,0.3)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 40px rgba(245,158,11,0.05)',
                }}
              >
                {/* Image */}
                <div className="flex-shrink-0 w-full md:w-52 h-48 md:h-64 rounded-xl overflow-hidden"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-[#F59E0B] text-xs font-bold uppercase tracking-[0.2em] mb-1">{selectedItem.subtitle}</p>
                      <h3 className="font-display font-bold text-2xl md:text-3xl text-white">{selectedItem.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Icons.X size={16} />
                    </button>
                  </div>

                  <div className="h-px mb-5" style={{ background: 'linear-gradient(to right, rgba(245,158,11,0.4), transparent)' }} />

                  <p className="text-white/60 leading-relaxed text-sm md:text-base mb-7">{selectedItem.description}</p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`https://wa.me/919514362836?text=Hi%20Lytro%20Kapture!%20I%27m%20interested%20in%20your%20${encodeURIComponent(selectedItem.title)}%20service.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 font-semibold text-sm text-white px-6 py-3 rounded-full transition-colors duration-200"
                      style={{ background: '#22c55e' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#16a34a'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#22c55e'; }}
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Enquire on WhatsApp
                    </a>
                    <button
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200"
                      style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)', color: '#F59E0B' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(245,158,11,0.24)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(245,158,11,0.12)'; }}
                    >
                      <Icons.CalendarDays size={15} />
                      Book a Session
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom note & Button */}
        <motion.div
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="flex flex-col items-center mt-10 gap-6"
        >
          <p className="text-center text-luxury-muted text-sm">
            All packages are fully customisable. Contact us for a personalised quote.
          </p>
          
          <a
            href="/images/wedding_package.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-300"
            style={{ background: '#F59E0B', color: '#0F172A', boxShadow: '0 4px 20px rgba(245,158,11,0.3)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 25px rgba(245,158,11,0.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(245,158,11,0.3)'; }}
          >
            <Icons.BookOpen size={16} />
            See our Wedding Packages
          </a>
        </motion.div>
      </div>
    </section>
  );
}
