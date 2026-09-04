import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Camera } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Catalog', href: '#catalog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -20% 0px' }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-luxury-dark/90 backdrop-blur-xl shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-luxury-gold/10 border border-luxury-gold/30 group-hover:bg-luxury-gold/20 transition-all duration-300 overflow-hidden shadow-sm">
              <img src="/images/lk-logo.webp" alt="LK Logo" className="w-full h-full object-cover" />
            </div>
            <div className="leading-none text-left">
              <span 
                className={`text-xl tracking-wide transition-colors duration-300 ${scrolled ? 'text-white' : 'text-[#0F172A]'}`}
                style={{ fontFamily: 'Galmine', fontWeight: 'normal' }}
              >
                LYTRO <span className="text-luxury-gold">KAPTURE</span>
              </span>
              <p className={`text-[10px] tracking-[0.2em] uppercase font-bold transition-colors duration-300 ${scrolled ? 'text-luxury-muted' : 'text-[#0F172A]/70'}`}>Fotography Studio</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative text-sm font-bold tracking-wide transition-colors duration-200 group ${
                  activeSection === link.href.slice(1)
                    ? 'text-luxury-gold'
                    : scrolled
                      ? 'text-luxury-subtle hover:text-white font-medium'
                      : 'text-[#0F172A]/80 hover:text-luxury-gold'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-luxury-gold transition-all duration-300 ${
                    activeSection === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollTo('#contact')}
              className={`transition-all duration-300 ${
                scrolled ? 'btn-gold' : 'btn-gold-dark'
              }`}
            >
              Book a Session
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-luxury-border text-white hover:border-luxury-gold hover:text-luxury-gold transition-all duration-200"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-luxury-dark/95 backdrop-blur-2xl" />
            <div className="relative h-full flex flex-col pt-24 px-8">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left py-4 text-3xl font-display font-bold border-b border-luxury-border/30 transition-colors duration-200 ${
                      activeSection === link.href.slice(1) ? 'text-luxury-gold' : 'text-white hover:text-luxury-gold'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <button
                  onClick={() => scrollTo('#contact')}
                  className="btn-gold w-full justify-center text-lg"
                >
                  Book a Session
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
