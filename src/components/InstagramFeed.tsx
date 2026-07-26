import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, MessageCircle, Instagram, ExternalLink } from 'lucide-react';
import { instagramPosts } from '../data';

export default function InstagramFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding bg-luxury-darker relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="section-label mb-4">Follow the Journey</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
            <span className="text-gold-gradient">@lytrokapture_fotography</span>
          </h2>
          <p className="text-luxury-muted leading-relaxed">
            Daily inspiration, behind-the-scenes moments, and fresh work — follow us on Instagram.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 max-w-5xl mx-auto">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/lytrokapture_fotography"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="relative group block rounded-xl overflow-hidden aspect-square"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-luxury-dark/80 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Heart size={18} className="fill-white" />
                    <span className="text-sm font-semibold">{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={18} />
                    <span className="text-sm font-semibold">{post.comments}</span>
                  </div>
                </div>
                <ExternalLink size={20} className="text-luxury-gold" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/lytrokapture_fotography"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity duration-200 shadow-lg"
          >
            <Instagram size={20} />
            Follow @lytrokapture_fotography
          </a>
          <p className="text-luxury-muted text-sm mt-4">Follow us on Instagram for daily inspiration</p>
        </motion.div>
      </div>
    </section>
  );
}
