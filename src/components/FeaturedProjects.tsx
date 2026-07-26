import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';

const featured = [
  {
    id: 'fp1',
    title: 'Meera & Rohan',
    subtitle: 'A Palace Wedding in Rajasthan',
    category: 'Wedding Film',
    year: '2024',
    location: 'City Palace, Udaipur',
    description: 'Three days of opulent celebration at Udaipur\'s City Palace. A 400-guest affair blending Rajput grandeur with modern romance, culminating in a lakeside ceremony at sunset.',
    imageUrl: '/images/premium-portrait.png',
    stats: ['3 Days Coverage', '1,200+ Images', '8-Min Film'],
  },
  {
    id: 'fp2',
    title: 'Love in Santorini',
    subtitle: 'Priya & Karan Pre-Wedding',
    category: 'Destination Shoot',
    year: '2024',
    location: 'Oia, Santorini, Greece',
    description: 'Chasing golden light across the whitewashed caldera cliffs of Santorini. A 2-day editorial shoot that graced the pages of Vogue India\'s wedding issue.',
    imageUrl: '/images/premium-maternity.png',
    stats: ['2 Locations', '400+ Images', 'Vogue Feature'],
  },
  {
    id: 'fp3',
    title: 'Luxe Heritage',
    subtitle: 'Brand Campaign for The Taj Collection',
    category: 'Commercial',
    year: '2023',
    location: 'Delhi, Mumbai, Jaipur',
    description: 'A pan-India brand story for The Taj Collection spanning three iconic properties. Architecture, interiors, and lifestyle imagery crafted to inspire the world\'s most discerning travellers.',
    imageUrl: '/images/premium-prewedding.png',
    stats: ['3 Properties', '800+ Images', 'Global Campaign'],
  },
];

function FeaturedCard({ project, index }: { project: typeof featured[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden group ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-72 lg:h-auto min-h-[400px]">
        <motion.img
          style={{ y: imgY }}
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-[115%] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-luxury-dark/30 group-hover:bg-luxury-dark/10 transition-all duration-500" />

        {/* Category pill */}
        <div className="absolute top-6 left-6">
          <span className="px-3 py-1.5 rounded-full bg-luxury-gold text-luxury-dark text-xs font-bold uppercase tracking-widest">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-luxury-card p-8 md:p-12 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-luxury-gold" />
          <span className="text-luxury-muted text-xs tracking-widest uppercase">{project.year}</span>
        </div>

        <h3 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight mb-2">
          {project.title}
        </h3>
        <p className="text-luxury-gold font-medium mb-2">{project.subtitle}</p>
        <div className="flex items-center gap-1.5 text-luxury-muted text-sm mb-6">
          <MapPin size={13} className="text-luxury-gold" />
          {project.location}
        </div>

        <p className="text-luxury-subtle leading-relaxed mb-8">{project.description}</p>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-8">
          {project.stats.map(stat => (
            <span key={stat} className="px-3 py-1.5 rounded-lg bg-luxury-dark/50 border border-luxury-border text-luxury-subtle text-xs font-medium">
              {stat}
            </span>
          ))}
        </div>

        <button className="group/btn inline-flex items-center gap-2 text-luxury-gold font-semibold hover:gap-4 transition-all duration-300">
          View Full Story
          <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding bg-luxury-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Case Studies</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Featured <span className="text-gold-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {featured.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
