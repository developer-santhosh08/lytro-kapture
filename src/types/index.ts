export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  startingPrice: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  category: 'wedding' | 'pre-wedding' | 'portrait' | 'events' | 'commercial' | 'drone' | 'traditional' | 'lifestyle' | 'baby';
  title: string;
  location: string;
  imageUrl: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  avatarUrl: string;
  eventType: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  duration: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  budget: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  location?: string;
  budget?: string;
  message?: string;
}
