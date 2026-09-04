import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCounter } from '../hooks/useCounter';

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const count = useCounter(value, 2000, true);
  return (
    <div className="flex flex-col items-center justify-center p-2 md:p-6 border-b lg:border-b-0 lg:border-r border-white/10 last:border-0 hover:bg-white/[0.02] transition-colors duration-500">
      <div className="font-display font-light text-3xl md:text-5xl lg:text-6xl text-white tracking-tight mb-1 md:mb-2">
        {count}<span className="text-luxury-gold">{suffix}</span>
      </div>
      <div className="text-[7px] md:text-[9px] tracking-[0.35em] uppercase font-bold text-luxury-gold/80">{label}</div>
    </div>
  );
}

export default function About() {
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);

  // Phase 1 scales down as Phase 2 slides up over it
  const { scrollYProgress: scroll1 } = useScroll({
    target: phase2Ref,
    offset: ["start end", "start start"]
  });
  const scale1 = useTransform(scroll1, [0, 1], [1, 0.85]);
  const opacity1 = useTransform(scroll1, [0.5, 1], [1, 0]);

  // Phase 2 scales down as Phase 3 slides up over it
  const { scrollYProgress: scroll2 } = useScroll({
    target: phase3Ref,
    offset: ["start end", "start start"]
  });
  const scale2 = useTransform(scroll2, [0, 1], [1, 0.85]);
  const opacity2 = useTransform(scroll2, [0.5, 1], [1, 0]);

  const scrollTo = (id: string) => (window as any).scrollToSection?.(id);

  return (
    <section id="about" className="relative w-full bg-[#0F172A]">
      
      {/* Background ambient glow (Static) */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-luxury-gold/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />

      {/* ======================= PHASE 1 ======================= */}
      <div className="sticky top-0 z-10 w-full h-screen bg-[#0F172A] overflow-hidden">
        <motion.div style={{ scale: scale1, opacity: opacity1 }} className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center w-full mt-0">
            
            {/* Left Content */}
            <div className="flex flex-col justify-center z-20">
              <div className="flex items-center gap-4 mb-4 md:mb-8">
                <div className="h-[1px] w-12 bg-luxury-gold" />
                <span className="text-[10px] tracking-[0.4em] uppercase font-black text-luxury-gold">Phase 01 — Who We Are</span>
              </div>
              
              <h2 className="font-display font-light text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-white mb-4 md:mb-8 tracking-tight">
                Stories <br />
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#D4AF37] to-[#F59E0B]">Told Through</span><br />
                Light.
              </h2>
              
              <p className="text-white/70 text-sm md:text-lg leading-relaxed font-light mb-4 md:mb-6 max-w-md">
                Based in Salem, Tamil Nadu, Lytro Kapture is a premium photography studio dedicated to preserving your most fleeting moments with cinematic precision.
              </p>
            </div>

            {/* Right Single Image */}
            <div className="relative w-full h-[35vh] md:h-auto rounded-2xl overflow-hidden group cursor-pointer flex items-center justify-center border-2 border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-[#0F172A]">
              <img 
                src="/images/name-board.jpeg" 
                alt="Lytro Kapture" 
                className="w-full h-full md:h-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
            </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ======================= PHASE 2 ======================= */}
      <div ref={phase2Ref} className="sticky top-0 z-20 w-full h-screen bg-[#0F172A] overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <motion.div style={{ scale: scale2, opacity: opacity2 }} className="absolute inset-0 w-full h-full flex items-start lg:items-center justify-center pt-32 sm:pt-36 md:pt-20 lg:pt-0">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-center w-full mt-0">
            
            {/* Left Content: Image Grid */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              
              <div className="relative h-[200px] md:h-[500px] lg:h-[600px] w-full rounded-2xl">
                <div className="absolute top-0 left-0 w-[60%] h-[70%] rounded-2xl overflow-hidden z-10 border-4 lg:border-8 border-[#0F172A]">
                  <img src="/images/about-001.jpg" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" alt="Wedding Detail" />
                </div>
                <div className="absolute bottom-0 right-0 w-[55%] h-[60%] rounded-2xl overflow-hidden z-20 border-4 lg:border-8 border-[#0F172A] group">
                  <img src="/images/herobanner/006.jpg" className="w-full h-full object-cover" alt="Couple Portrait" />
                  
                  {/* Scroll Cue overlaid on the bottom image */}
                  <button 
                    onClick={() => {
                      const container = document.getElementById('about');
                      if (container) {
                        const targetScroll = container.offsetTop + window.innerHeight * 2;
                        (window as any).scrollToSection?.(targetScroll, { duration: 2 });
                      }
                    }}
                    className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-row items-center gap-2 text-white/70 cursor-pointer hover:text-white transition-colors w-fit z-40 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md pointer-events-auto shadow-xl"
                  >
                    <span className="text-[10px] tracking-[0.35em] uppercase font-black">Scroll</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-bounce">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content: Stats & New Design */}
            <motion.div 
              className="lg:col-span-5 flex flex-col justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.div 
                className="flex items-center gap-2 md:gap-4 mb-2 lg:mb-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                <div className="h-[1px] w-12 bg-luxury-gold" />
                <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-black text-luxury-gold">Phase 02 — The Details</span>
              </motion.div>
              
              <motion.h3 
                className="font-display font-light text-2xl md:text-4xl text-white mb-2 lg:mb-8"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                Creating <span className="font-bold">Timeless</span> Memories
              </motion.h3>
              
              <motion.p 
                className="text-white/70 text-xs md:text-sm lg:text-base leading-relaxed font-light mb-4 lg:mb-10"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                From the vibrant energy of pre-wedding shoots across Pondicherry to the timeless grace of traditional portraits, we bring a high-fashion, editorial eye to your love story. Every frame is a testament to our dedication.
              </motion.p>

              {/* Stats block */}
              <motion.div 
                className="grid grid-cols-2 gap-3 md:gap-6 bg-white/5 border border-white/10 rounded-2xl p-3 md:p-6 backdrop-blur-sm"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                {[
                  { value: 400, suffix: '+', label: 'Shoots' },
                  { value: 250, suffix: '+', label: 'Clients' },
                ].map((s) => (
                  <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
                ))}
              </motion.div>
            </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ======================= PHASE 3 ======================= */}
      <div ref={phase3Ref} className="sticky top-0 z-30 w-full h-screen bg-black overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          
          <video 
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
            src="/images/video/logo_video.mp4" 
          />
          
          {/* Overlay Gradient for Text Readability removed as requested */}
          
          {/* Button Container perfectly centered at the bottom */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-5 w-full h-full pointer-events-none">
            <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center z-10 pointer-events-auto">
              <button onClick={() => scrollTo('portfolio')} className="btn-gold px-10 py-4 text-sm font-black rounded-full shadow-2xl shrink-0">
                Explore Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
