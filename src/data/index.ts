import type { PortfolioItem, InstagramPost } from '../types';

// ─── Catalog (actual Lytro Kapture services) ───────────────────────────
export const catalogItems = [
  {
    id: 'maternity',
    title: 'Maternity',
    subtitle: 'Celebrating New Beginnings',
    description: 'Tender, glowing maternity sessions that celebrate the beauty of motherhood. We capture the bond, the glow, and the anticipation — indoors or outdoors, on your terms.',
    imageUrl: '/images/services/maternity.jpeg',
    icon: 'Heart',
    badge: '',
  },
  {
    id: 'wedding',
    title: 'Wedding',
    subtitle: 'Full Wedding Day Coverage',
    description: 'From the sacred rituals to the candid dancing — every emotion of your wedding day documented with cinematic precision. Captured on premium equipment for breathtaking quality.',
    imageUrl: '/images/services/weding.jpeg',
    icon: 'Gem',
    badge: 'Popular',
  },
  {
    id: 'pre-wedding',
    title: 'Pre / Post Wedding Shoot',
    subtitle: 'Tailored to your needs',
    description: 'Romantic editorial-style pre or post wedding sessions across Tamil Nadu and beyond. Locations like Pondicherry, Yercaud Hills, and Vaiyappamalai. Personalised for your duration.',
    imageUrl: '/images/services/preweding.jpeg',
    icon: 'Camera',
    badge: '',
  },
  {
    id: 'baby',
    title: 'Baby Shoot',
    subtitle: 'Tailored to your needs',
    description: 'Customized photoshoot sessions that capture every smile, giggle, and tiny detail. Props, themes, and setups customised for your little one.',
    imageUrl: '/images/services/baby.jpeg',
    icon: 'Baby',
    badge: '',
  },
  {
    id: 'frame',
    title: 'Customized Frames & Gift Items',
    subtitle: 'Tailored to frame size & design',
    description: 'Premium wall frames and photo prints in multiple sizes and finishes — canvas, acrylic, wooden frames, and more. Enquire for a custom quote tailored to your needs.',
    imageUrl: '/images/services/customized.jpeg',
    icon: 'Frame',
    badge: '',
  },
  {
    id: 'birthday',
    title: 'Model',
    subtitle: 'Fashion is the art, I\'m the canvas.',
    description: 'Elevate your presence with professional fashion photography. Cinematic lighting, dynamic styling, and editorial precision to capture the essence of your brand.',
    imageUrl: '/images/services/model.jpeg',
    icon: 'Gift',
    badge: '',
  },
];

// ─── Portfolio (real Instagram photos) ────────────────────────────────
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'p0',
    category: 'wedding',
    title: 'A Timeless Union',
    location: 'Tamil Nadu',
    imageUrl: '/images/herobanner/26.webp',
    featured: true,
  },
  { id: 'pw1', category: 'pre-wedding', title: 'Pre-Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/preweding/001.jpg', featured: true },
  { id: 'pw2', category: 'pre-wedding', title: 'Pre-Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/preweding/005.jpg' },
  { id: 'pw3', category: 'pre-wedding', title: 'Pre-Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/preweding/009.jpg', featured: true },
  { id: 'pw4', category: 'pre-wedding', title: 'Pre-Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/preweding/01 (1).jpg' },
  { id: 'pw5', category: 'pre-wedding', title: 'Pre-Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/preweding/11 (1).jpg' },
  { id: 'pw6', category: 'pre-wedding', title: 'Pre-Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/preweding/29.JPG' },
  { id: 'pw7', category: 'pre-wedding', title: 'Pre-Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/preweding/29a (1).jpg' },
  { id: 'pw8', category: 'pre-wedding', title: 'Pre-Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/preweding/29a (2).jpg' },
  { id: 'pw9', category: 'pre-wedding', title: 'Pre-Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/preweding/34.jpg' },
  { id: 'pw10', category: 'pre-wedding', title: 'Pre-Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/preweding/LK_00156.JPG' },
  { id: 'w1', category: 'wedding', title: 'Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/weding/37.JPG', featured: true },
  { id: 'w2', category: 'wedding', title: 'Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/weding/24 (1).jpg' },
  { id: 'w3', category: 'wedding', title: 'Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/weding/30 E.jpg' },
  { id: 'w4', category: 'wedding', title: 'Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/weding/30.JPG' },
  { id: 'w5', category: 'wedding', title: 'Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/weding/33.JPG' },
  { id: 'w6', category: 'wedding', title: 'Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/weding/34 (1).JPG' },
  { id: 'w7', category: 'wedding', title: 'Wedding', location: 'Tamil Nadu', imageUrl: '/images/portfolio/weding/22.jpg' },
  { id: 'm1', category: 'portrait', title: 'Maternity', location: 'Tamil Nadu', imageUrl: '/images/portfolio/maternity/39.JPG', featured: true },
  { id: 'm2', category: 'portrait', title: 'Maternity', location: 'Tamil Nadu', imageUrl: '/images/portfolio/maternity/30 b.jpg' },
  { id: 'm3', category: 'portrait', title: 'Maternity', location: 'Tamil Nadu', imageUrl: '/images/portfolio/maternity/30 A.jpg' },
  { id: 'm4', category: 'portrait', title: 'Maternity', location: 'Tamil Nadu', imageUrl: '/images/portfolio/maternity/40.JPG' },
  { id: 'l1', category: 'lifestyle', title: 'Lifestyle', location: 'Tamil Nadu', imageUrl: '/images/portfolio/lifestyle/about-001.jpg', featured: true },
  { id: 'l2', category: 'lifestyle', title: 'Lifestyle', location: 'Tamil Nadu', imageUrl: '/images/portfolio/lifestyle/08.jpg' },
  { id: 'l3', category: 'lifestyle', title: 'Lifestyle', location: 'Tamil Nadu', imageUrl: '/images/portfolio/lifestyle/ Frames.JPG' },
  {
    id: 'p13',
    category: 'baby',
    title: 'Baby Shoot 01',
    location: 'Salem, Tamil Nadu',
    imageUrl: '/images/portfolio/baby/01.JPG',
  },
  {
    id: 'p14',
    category: 'baby',
    title: 'Baby Shoot 07',
    location: 'Salem, Tamil Nadu',
    imageUrl: '/images/portfolio/baby/07.JPG',
  },
  {
    id: 'p15',
    category: 'baby',
    title: 'Baby Shoot 09',
    location: 'Salem, Tamil Nadu',
    imageUrl: '/images/portfolio/baby/09.JPG',
  },
  {
    id: 'p16',
    category: 'baby',
    title: 'Baby Shoot 11',
    location: 'Salem, Tamil Nadu',
    imageUrl: '/images/portfolio/baby/11.JPG',
  },
  {
    id: 'p17',
    category: 'baby',
    title: 'Baby Shoot 14',
    location: 'Salem, Tamil Nadu',
    imageUrl: '/images/portfolio/baby/14.JPG',
  },
  {
    id: 'p18',
    category: 'baby',
    title: 'Baby Shoot 15',
    location: 'Salem, Tamil Nadu',
    imageUrl: '/images/portfolio/baby/15.JPG',
  },
  {
    id: 'p19',
    category: 'baby',
    title: 'Baby Shoot 16',
    location: 'Salem, Tamil Nadu',
    imageUrl: '/images/portfolio/baby/16.JPG',
  },
  {
    id: 'p20',
    category: 'baby',
    title: 'Baby Shoot 17',
    location: 'Salem, Tamil Nadu',
    imageUrl: '/images/portfolio/baby/17.JPG',
  },
  {
    id: 'p21',
    category: 'baby',
    title: 'Baby Shoot 18',
    location: 'Salem, Tamil Nadu',
    imageUrl: '/images/portfolio/baby/18.JPG',
  },
  {
    id: 'p22',
    category: 'baby',
    title: 'Baby Shoot 19',
    location: 'Salem, Tamil Nadu',
    imageUrl: '/images/portfolio/baby/19.JPG',
  },
];

// ─── Hero slideshow ────────────────────────────────────────────────────
export const heroImages = [
  { url: '/images/hero-2.webp', label: 'Pre-Wedding · Yercaud Hills' },
  { url: '/images/hero-3.webp', label: 'Portrait · Salem' },
  { url: '/images/hero-4.webp', label: 'Pre-Wedding · Vaiyappamalai' },
];

export const stats = [
  { value: 3, label: 'Years Experience', suffix: '+' },
  { value: 400, label: 'Shoots Completed', suffix: '+' },
  { value: 250, label: 'Happy Clients', suffix: '+' },
  { value: 12, label: 'Locations Covered', suffix: '+' },
];

// ─── Instagram posts ───────────────────────────────────────────────────
export const instagramPosts: InstagramPost[] = [
  { id: 'i1', imageUrl: '/images/premium-prewedding.png', likes: 30, comments: 0, caption: 'The best thing to hold onto 🦋 #LytroKapture' },
  { id: 'i2', imageUrl: '/images/premium-wedding.png', likes: 83, comments: 4, caption: 'Two hearts, one rhythm ✨ #prewedding' },
  { id: 'i3', imageUrl: '/images/premium-portrait.png', likes: 72, comments: 1, caption: 'Vaisakh ✨ Shruthi #LytroKapture' },
  { id: 'i4', imageUrl: '/images/premium-maternity.png', likes: 57, comments: 0, caption: 'Whatever our souls are made of 🦋' },
  { id: 'i5', imageUrl: '/images/premium-prewedding.png', likes: 23, comments: 0, caption: 'Grace is the only beauty that never fades 🤍' },
  { id: 'i6', imageUrl: '/images/premium-wedding.png', likes: 30, comments: 0, caption: 'Relationship is an art ❤️ Navin & Kavya' },
  { id: 'i7', imageUrl: '/images/premium-portrait.png', likes: 37, comments: 0, caption: 'Love Begins ❤️ #LytroKapture' },
  { id: 'i8', imageUrl: '/images/premium-maternity.png', likes: 50, comments: 0, caption: 'Infinite love — Yercaud Hills 🌿' },
  { id: 'i9', imageUrl: '/images/premium-prewedding.png', likes: 236, comments: 32, caption: 'Rollin up my sleeves 🔥 #traditionalphotography' },
];

// ─── Services (Lucide Icons) ─────────────────────────────────────────
export const services = [
  {
    id: 'wedding',
    icon: 'Ring',
    title: 'Wedding Photography',
    description: 'Full day coverage from preparations to the final send-off.',
    startingPrice: '₹40,000',
    features: ['Pre-wedding consultation', '2 Photographers', 'High-res edited photos']
  },
  {
    id: 'pre-wedding',
    icon: 'Heart',
    title: 'Pre-Wedding Shoots',
    description: 'Romantic outdoor sessions before your big day.',
    startingPrice: '₹15,000',
    features: ['Multiple locations', 'Outfit changes', 'Cinematic video teaser']
  },
  {
    id: 'portrait',
    icon: 'User',
    title: 'Portrait Sessions',
    description: 'Professional portraits for individuals and families.',
    startingPrice: '₹8,000',
    features: ['Studio or location', 'Retouched photos', 'Online gallery']
  },
  {
    id: 'event',
    icon: 'PartyPopper',
    title: 'Event Coverage',
    description: 'Birthdays, corporate events, and parties.',
    startingPrice: '₹10,000',
    features: ['Candid moments', 'Quick delivery', 'Digital album']
  }
];

export const pricingPackages = [
  {
    id: 'basic',
    name: 'Basic Collection',
    price: '₹25,000',
    duration: '4 Hours',
    popular: false,
    features: ['1 Photographer', '100 Edited Photos', 'Online Gallery'],
    cta: 'Book Basic'
  },
  {
    id: 'standard',
    name: 'Standard Collection',
    price: '₹45,000',
    duration: '8 Hours',
    popular: true,
    features: ['2 Photographers', '250 Edited Photos', 'Printed Album', 'Highlight Video'],
    cta: 'Book Standard'
  }
];

export const faqItems = [
  {
    id: 'faq1',
    question: 'How long does it take to get our photos?',
    answer: 'You will receive a sneak peek within 48 hours, and the full edited gallery within 2-3 weeks.'
  },
  {
    id: 'faq2',
    question: 'Do you travel for weddings?',
    answer: 'Yes! We love destination weddings. Travel and accommodation fees apply outside Tamil Nadu.'
  }
];

export const processSteps = [
  {
    id: 'step1',
    number: '01',
    title: 'Consultation',
    description: 'We meet to discuss your vision, style, and timeline.',
    icon: 'MessageCircle'
  },
  {
    id: 'step2',
    number: '02',
    title: 'The Shoot',
    description: 'We capture your special moments with cinematic precision.',
    icon: 'Camera'
  }
];

export const testimonials = [
  {
    id: 't1',
    name: 'Shruthi & Vaisakh',
    role: 'Bride & Groom',
    location: 'Tamil Nadu',
    rating: 5,
    text: 'Lytro Kapture made our wedding day unforgettable! The photos are absolutely stunning.',
    avatarUrl: '/images/premium-wedding.png',
    eventType: 'Wedding'
  }
];
