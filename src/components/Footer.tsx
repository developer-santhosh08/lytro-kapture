import { motion } from 'framer-motion';
import { Camera, Instagram, MessageCircle, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className="fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

const quickLinks = ['Home', 'About', 'Portfolio', 'Catalog', 'Contact'];
const serviceLinks = ['Wedding Photography', 'Pre-Wedding Shoots', 'Maternity Sessions', 'Baby Shoots', 'Customized Frames'];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-luxury-darker border-t border-luxury-border/40 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-luxury-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center overflow-hidden">
                <img src="/images/lk-logo.jpeg" alt="LK Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <span 
                  className="text-white text-lg tracking-wide"
                  style={{ fontFamily: 'Galmine', fontWeight: 'normal' }}
                >
                  LYTRO <span className="text-luxury-gold">KAPTURE</span>
                </span>
                <p className="text-luxury-muted text-[9px] tracking-[0.2em] uppercase">Fotography Studio</p>
              </div>
            </div>
            <p className="text-luxury-muted text-sm leading-relaxed mb-6">
              Lytro Kapture — capturing life's most precious moments with cinematic artistry. Follow us on Instagram @lytrokapture_fotography
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/lytrokapture_fotography', label: 'Instagram' },
                { icon: WhatsAppIcon, href: 'https://wa.me/919514362836', label: 'WhatsApp' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-luxury-border flex items-center justify-center text-luxury-muted hover:border-luxury-gold hover:text-luxury-gold transition-all duration-200"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="text-luxury-muted hover:text-luxury-gold text-sm transition-all duration-200 hover:translate-x-2 inline-flex items-center group relative"
                  >
                    <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-5">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map(service => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo('catalog')}
                    className="text-luxury-muted hover:text-luxury-gold text-sm transition-all duration-200 text-left hover:translate-x-2 inline-flex items-center group relative"
                  >
                    <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-5">Contact Us</h4>
            <ul className="space-y-3 mb-8">
              <li>
                <a href="tel:+919514362836" className="flex items-start gap-3 text-luxury-muted hover:text-luxury-gold text-sm transition-colors duration-200 group">
                  <Phone size={14} className="mt-0.5 flex-shrink-0 text-luxury-gold" />
                  +91 95143 62836
                </a>
              </li>
              <li>
                <a href="mailto:lytrokapture777@gmail.com" className="flex items-start gap-3 text-luxury-muted hover:text-luxury-gold text-sm transition-colors duration-200">
                  <Mail size={14} className="mt-0.5 flex-shrink-0 text-luxury-gold" />
                  lytrokapture777@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-luxury-muted text-sm">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0 text-luxury-gold" />
                  Karuppur, Salem · Tamil Nadu
                </div>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-luxury-subtle text-xs font-semibold uppercase tracking-wider mb-3">Stay Inspired</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-luxury-card border border-luxury-border text-white text-sm placeholder-luxury-muted px-3 py-2.5 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                />
                <button className="px-4 py-2.5 bg-luxury-gold text-luxury-dark text-sm font-bold rounded-lg hover:bg-luxury-gold-light transition-colors">
                  <Mail size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-luxury-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-luxury-muted text-sm">
            © 2024 Lytro Kapture. All rights reserved.
          </p>
          <p className="text-luxury-muted text-sm flex items-center gap-1.5">
            Crafted with <Heart size={13} className="text-luxury-gold fill-luxury-gold" /> by Lytro Kapture
          </p>
          <div className="flex items-center gap-4 text-luxury-muted text-xs">
            <button className="hover:text-luxury-gold transition-colors">Privacy Policy</button>
            <button className="hover:text-luxury-gold transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-6 w-12 h-12 bg-luxury-gold text-luxury-dark rounded-full flex items-center justify-center shadow-xl shadow-luxury-gold/30 z-40 hover:bg-luxury-gold-light transition-colors duration-200"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}
