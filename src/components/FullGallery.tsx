import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, MapPin, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioItems } from '../data';

// Define the portfolio item type
interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  location: string;
  imageUrl: string;
  featured?: boolean;
}

const categories = [
  { label: 'All Work', value: 'all' },
  { label: 'Pre-Wedding', value: 'pre-wedding' },
  { label: 'Wedding', value: 'wedding' },
  { label: 'Maternity', value: 'portrait' },
  { label: 'Baby Shoot', value: 'baby' },
  { label: 'Lifestyle', value: 'lifestyle' },
];

export default function FullGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

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
    <div className="min-h-screen bg-[#0F172A] relative z-20 pt-24 pb-32">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-luxury-dark/90 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-luxury-muted hover:text-white transition-colors duration-200">
            <ArrowLeft size={20} />
            <span className="font-semibold text-sm">Back to Home</span>
          </Link>
          <div className="font-display font-bold text-lg tracking-wide text-white">
            LYTRO <span className="text-luxury-gold">KAPTURE</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 mt-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Full <span className="text-luxury-gold font-light italic">Gallery</span>
          </h1>
          <p className="text-luxury-muted max-w-2xl mx-auto">
            Explore our complete collection of stunning visual stories.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-luxury-gold text-luxury-dark shadow-lg shadow-luxury-gold/30'
                  : 'glass-card text-luxury-muted hover:text-white border border-luxury-border hover:border-luxury-gold/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
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
                transition={{ delay: (i % 10) * 0.06, duration: 0.5 }}
                className="masonry-item"
              >
                <div
                  className="relative group cursor-pointer overflow-hidden rounded-xl h-full"
                  onClick={() => openLightbox(i)}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    loading="lazy"
                  />
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
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
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
                </AnimatePresence>
              </div>

              {/* Caption */}
              <div className="mt-4 flex items-center justify-between px-1">
                <div>
                  <span className="text-luxury-gold text-[10px] uppercase tracking-widest font-bold">{filtered[lightboxIndex].category}</span>
                  <h3 className="text-white font-display font-bold text-lg mt-0.5">{filtered[lightboxIndex].title}</h3>
                  <p className="text-luxury-muted text-sm flex items-center gap-1.5 mt-0.5">
                    <MapPin size={12} className="text-luxury-gold" />{filtered[lightboxIndex].location}
                  </p>
                </div>
                <span className="text-luxury-muted text-sm">{lightboxIndex + 1} / {filtered.length}</span>
              </div>

              {/* Nav */}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
