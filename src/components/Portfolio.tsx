import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, MapPin, Instagram, Expand } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioItems } from '../data';
import type { PortfolioItem } from '../types';

type Category = 'all' | PortfolioItem['category'];

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Work' },
  { value: 'pre-wedding', label: 'Pre-Wedding' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'portrait', label: 'Maternity' },
  { value: 'baby', label: 'Baby Shoot' },
  { value: 'lifestyle', label: 'Lifestyle' },
];

// hero-1.png is the commanding featured image (p0)
const HERO_IMG = portfolioItems[0]; // p0 — hero-1.png
const REST = portfolioItems.slice(1);

// ── Parallax image wrapper (scroll-driven, works on mobile) ──────────────
function ParallaxImage({ src, alt, strength = 14, objectFit = "cover", zoomOut = false, autoHeight = false }: { src: string; alt: string; strength?: number; objectFit?: "cover" | "contain"; zoomOut?: boolean; autoHeight?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  
  // Dynamically calculate the minimum scale required to prevent the edges from showing during parallax
  const dynamicScale = 1 + (strength * 2.2) / 100;
  
  // If zoomOut is true, scale down as user scrolls past it. Otherwise, use a static scale to support the y-axis parallax.
  const scale = useTransform(scrollYProgress, [0, 1], zoomOut ? [1.1, 0.95] : [dynamicScale, dynamicScale]);

  return (
    <div ref={ref} className={`w-full ${autoHeight ? 'h-auto' : 'h-full'} overflow-hidden bg-[#0A101C]`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y: zoomOut ? 0 : y, scale }}
        className={`w-full ${autoHeight ? 'h-auto' : 'h-full'} object-${objectFit} will-change-transform`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Hero Image Sticky Zoom Effect
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start 112px', 'end start'] // 112px is roughly top-28
  });
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.85]);
  const heroOpacity = useTransform(heroScroll, [0.5, 1], [1, 0]);

  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter only REST (grid), not the hero
  // On mobile 'all', show exactly 3 images: 1 baby, 1 wedding, 1 maternity (portrait).
  // On desktop 'all', take 1 image from EACH category to create a curated mix.
  const filtered = activeCategory === 'all'
    ? (isMobile 
        ? [
            REST.find(item => item.category === 'baby'),
            REST.find(item => item.category === 'wedding'),
            REST.find(item => item.category === 'portrait')
          ].filter(Boolean) as PortfolioItem[]
        : categories.filter(c => c.value !== 'all' && c.value !== 'lifestyle').flatMap(c => REST.filter(item => item.category === c.value).slice(0, 1)))
    : REST.filter(item => item.category === activeCategory).slice(0, 3);

  // Lightbox operates on filtered array
  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };
  const prev = () => setLightboxIndex(p => p === null ? null : (p - 1 + filtered.length) % filtered.length);
  const next = () => setLightboxIndex(p => p === null ? null : (p + 1) % filtered.length);

  // Close lightbox on scroll attempt
  useEffect(() => {
    if (lightboxIndex !== null) {
      const handleScroll = () => closeLightbox();
      window.addEventListener('wheel', handleScroll, { passive: true });
      window.addEventListener('touchmove', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('touchmove', handleScroll);
      };
    }
  }, [lightboxIndex]);

  return (
    <section id="portfolio" className="pt-8 pb-8 md:pt-32 md:pb-8 bg-[#0F172A] relative z-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Section Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="section-label mb-4">Our Work</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-5">
            Frames That <span className="text-gold-gradient">Feel</span>
          </h2>
          <p className="text-luxury-muted text-lg max-w-xl mx-auto">
            Every photograph below was captured by Lytro Kapture — real people, real moments, real emotion.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════
            COMMANDING HERO IMAGE — hero-1.png full width
        ══════════════════════════════════════════════ */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="sticky top-28 z-0 relative group cursor-pointer rounded-3xl overflow-hidden shadow-2xl w-full aspect-[4/3] md:aspect-video lg:aspect-[16/9]"
          onClick={() => {
            // open hero image in lightbox as a standalone overlay
            setLightboxIndex(-1);
            document.body.style.overflow = 'hidden';
          }}
        >
          <ParallaxImage src={HERO_IMG.imageUrl} alt={HERO_IMG.title} strength={6} objectFit="contain" zoomOut={true} />

          {/* Bottom gradient */}
          <div className="absolute inset-0 hidden md:block"
            style={{ background: 'linear-gradient(to top, rgba(7,11,20,0.92) 0%, rgba(7,11,20,0.35) 40%, transparent 70%)' }} />

          {/* Gold border shimmer on hover */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[rgba(245,158,11,0.5)] transition-all duration-500" />

          {/* FEATURED badge */}
          <div className="absolute top-5 left-5 hidden md:flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em]"
              style={{ background: '#F59E0B', color: '#0F172A' }}>
              Featured
            </span>
            <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white/80"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              {HERO_IMG.category}
            </span>
          </div>

          {/* Expand icon */}
          <div className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"
            style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)', backdropFilter: 'blur(8px)' }}>
            <Expand size={16} className="text-[#F59E0B]" />
          </div>

          {/* Title + location */}
          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 hidden md:block">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-white text-2xl sm:text-3xl md:text-4xl leading-tight mb-2 drop-shadow-lg">
                  {HERO_IMG.title}
                </h3>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <MapPin size={13} className="text-[#F59E0B]" />
                  {HERO_IMG.location}
                </div>
              </div>
              {/* View full CTA */}
              <div className="flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold text-[#FCD34D] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                style={{ background: 'rgba(245,158,11,0.18)', border: '1px solid rgba(245,158,11,0.4)', backdropFilter: 'blur(12px)', whiteSpace: 'nowrap' }}>
                View Full
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Solid Background Wrapper for Grid to Slide Over Hero ── */}
        <div className="relative z-10 bg-[#0F172A] w-full pt-6 mt-4 sm:pt-16 sm:mt-16">
          {/* ── Category Filters ── */}
          <div className="flex flex-nowrap overflow-x-auto gap-2 pb-3 mb-10 no-scrollbar md:flex-wrap md:justify-center px-1">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-luxury-gold text-luxury-dark shadow-lg shadow-luxury-gold/30'
                  : 'glass-card text-luxury-muted hover:text-white border border-luxury-border hover:border-luxury-gold/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
          </div>

          {/* ── Masonry Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="masonry-grid"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="masonry-item"
              >
                <div
                  className="relative group cursor-pointer overflow-hidden rounded-xl h-full"
                  onClick={() => openLightbox(i)}
                >
                  <ParallaxImage src={item.imageUrl} alt={item.title} strength={4} autoHeight={true} />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                    <p className="text-luxury-gold text-[10px] font-bold uppercase tracking-widest mb-1">{item.category}</p>
                    <h3 className="text-white font-display font-bold text-base leading-snug">{item.title}</h3>
                    <div className="flex items-center gap-1 text-luxury-muted text-xs mt-1">
                      <MapPin size={10} />{item.location}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <ZoomIn size={14} className="text-white" />
                  </div>
                  {item.featured && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-luxury-gold text-luxury-dark text-[9px] font-bold uppercase tracking-widest">
                      Featured
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 md:mt-14"
        >
          <p className="text-luxury-muted mb-5">Explore more of our stunning visuals</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/gallery"
              className="btn-gold"
            >
              View Full Gallery
            </Link>
            <a
              href="https://www.instagram.com/lytrokapture_fotography"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity duration-200 shadow-lg"
            >
              <Instagram size={18} />
              @lytrokapture_fotography
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 28 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 md:-top-12 md:right-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-50 bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
              >
                <X size={18} />
              </button>

              <div className="rounded-2xl overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  {lightboxIndex === -1 ? (
                    // Hero image fullscreen
                    <motion.img
                      key="hero-lb"
                      src={HERO_IMG.imageUrl}
                      alt={HERO_IMG.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-h-[60vh] md:max-h-[80vh] object-contain"
                    />
                  ) : (
                    <motion.img
                      key={lightboxIndex}
                      src={filtered[lightboxIndex].imageUrl}
                      alt={filtered[lightboxIndex].title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-h-[60vh] md:max-h-[78vh] object-contain"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Caption */}
              <div className="mt-4 flex items-center justify-between px-1">
                {lightboxIndex === -1 ? (
                  <div>
                    <span className="text-luxury-gold text-[10px] uppercase tracking-widest font-bold">{HERO_IMG.category}</span>
                    <h3 className="text-white font-display font-bold text-lg mt-0.5">{HERO_IMG.title}</h3>
                    <p className="text-luxury-muted text-sm flex items-center gap-1.5 mt-0.5">
                      <MapPin size={12} className="text-luxury-gold" />{HERO_IMG.location}
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="text-luxury-gold text-[10px] uppercase tracking-widest font-bold">{filtered[lightboxIndex].category}</span>
                      <h3 className="text-white font-display font-bold text-lg mt-0.5">{filtered[lightboxIndex].title}</h3>
                      <p className="text-luxury-muted text-sm flex items-center gap-1.5 mt-0.5">
                        <MapPin size={12} className="text-luxury-gold" />{filtered[lightboxIndex].location}
                      </p>
                    </div>
                    <span className="text-luxury-muted text-sm">{lightboxIndex + 1} / {filtered.length}</span>
                  </>
                )}
              </div>

              {/* Nav (only for grid images) */}
              {lightboxIndex !== -1 && (
                <>
                  <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-luxury-gold hover:border-luxury-gold hover:text-luxury-dark transition-all duration-200 hidden md:flex">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-luxury-gold hover:border-luxury-gold hover:text-luxury-dark transition-all duration-200 hidden md:flex">
                    <ChevronRight size={20} />
                  </button>
                  <div className="flex gap-3 justify-center mt-5 md:hidden">
                    <button onClick={prev} className="btn-outline py-2 px-5 text-sm">← Prev</button>
                    <button onClick={next} className="btn-outline py-2 px-5 text-sm">Next →</button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
