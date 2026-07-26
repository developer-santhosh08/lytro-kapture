import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import CatalogList from './components/CatalogList';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import FullGallery from './components/FullGallery';
import { Routes, Route, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Home component containing the landing page sections
function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <CatalogList />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ultra smooth easing
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Expose lenis globally for click-to-scroll features
    (window as any).lenis = lenis;
    (window as any).scrollToSection = (target: string | number, options?: any) => {
      if (typeof target === 'string') {
        lenis.scrollTo(target.startsWith('#') ? target : `#${target}`, options);
      } else {
        lenis.scrollTo(target, options);
      }
    };

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP from lagging behind Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  useEffect(() => {
    // Preload hero images
    const urls = [
      '/images/hero-1.png',
      '/images/hero-2.png',
      '/images/hero-3.png',
      '/images/hero-4.png',
    ];
    urls.forEach(url => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = url;
    });
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-luxury-dark text-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<FullGallery />} />
        </Routes>
      </div>
    </>
  );
}
