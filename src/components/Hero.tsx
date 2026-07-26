import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Aperture, MapPin, Instagram } from 'lucide-react';

const DESKTOP_SLIDES = [
  { src: '/images/herobanner/002.jpg', label: '', align: '50% 0%' },
  { src: '/images/herobanner/24.JPG', label: '', align: '50% 0%' },
  // { src: '/images/herobanner/006.jpg', label: '', align: '50% 70%' }, // Commented for desktop
];

const MOBILE_SLIDES = [
  { src: '/images/herobanner/07.JPG', label: '', align: '50% 0%' },
  { src: '/images/herobanner/007.jpg', label: '', align: '50% 0%' },
  { src: '/images/herobanner/006.jpg', label: '', align: '50% 70%' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1200], ['0%', '25%']);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const SLIDES = isMobile ? MOBILE_SLIDES : DESKTOP_SLIDES;
  const safeCurrent = current % SLIDES.length;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    const startTimer = () => {
      timer = setInterval(() => {
        setCurrent((prev) => prev + 1);
      }, 8000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        startTimer();
      }
    };

    if (!document.hidden) {
      startTimer();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const scrollTo = (id: string) => (window as any).scrollToSection?.(id);

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{ height: '100svh', minHeight: '700px' }}
    >
      {/* ── Full-bleed slideshow background with Parallax ── */}
      <motion.div 
        className="absolute inset-0" 
        style={{ y: backgroundY, willChange: 'transform', WebkitBackfaceVisibility: 'hidden' }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={safeCurrent}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{ willChange: 'opacity, transform', WebkitBackfaceVisibility: 'hidden' }}
          >
            <img
              src={SLIDES[safeCurrent].src}
              alt={SLIDES[safeCurrent].label}
              className="w-full h-full object-cover"
              style={{ display: 'block', objectPosition: SLIDES[safeCurrent].align }}
            />
          </motion.div>
        </AnimatePresence>

      </motion.div>

      {/* ── Slide dots — right edge ── */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-500"
            style={{
              width: '5px',
              height: i === safeCurrent ? '36px' : '8px',
              background: i === safeCurrent ? '#F59E0B' : 'rgba(255,255,255,0.22)',
              boxShadow: i === safeCurrent ? '0 0 8px rgba(245,158,11,0.5)' : 'none',
            }}
          />
        ))}
      </div>



      {/* ── Main content ── */}
      <div className="relative z-10 h-full flex flex-col max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">

        {/* Nav spacer */}
        <div className="flex-shrink-0" style={{ height: 'clamp(80px, 10svh, 112px)' }} />

        {/* Text content removed as requested */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
        </div>


      </div>

      {/* ── Bottom Controls ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20 w-full px-4">
        
        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-center justify-center gap-4 w-full"
        >
          <button onClick={() => scrollTo('portfolio')} className="btn-dark px-8 py-3.5 text-sm font-black rounded-full shadow-lg text-white">
            View Works
          </button>
          <button onClick={() => scrollTo('contact')} className="btn-gold-dark px-8 py-3.5 text-sm font-black rounded-full shadow-lg text-white">
            Book Now
          </button>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => scrollTo('about')}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-1 text-[#0F172A]/70 hover:text-[#F59E0B] transition-colors duration-300"
        >
          <span className="text-[9px] tracking-[0.35em] uppercase font-black">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
