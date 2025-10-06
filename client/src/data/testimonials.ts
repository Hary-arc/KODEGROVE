// Client testimonials and reviews data structure

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  project?: string;
  industry?: string;
  featured?: boolean;
  metrics?: {
    time?: string;
    roi?: string;
    engagement?: string;
  };
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Jennifer Park',
    role: 'CEO',
    company: 'TechStyle Fashion',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b3e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwQ0VPfGVufDF8fHx8MTc1NjMyOTI5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content:
      'CodeFlow transformed our e-commerce platform into a mesmerizing experience that increased our sales by 320%. Their attention to detail and innovative approach exceeded all expectations.',
    rating: 5,
    project: 'Hypnotic E-Commerce Platform',
    industry: 'Fashion & Retail',
    featured: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    company: 'NeoBank Solutions',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMCUyMENUT3xlbnwxfHx8fDE3NTYzMjkyOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content:
      "The mobile banking app KodeGrove created for us has revolutionized our customer experience. With 2M+ downloads and 99.9% security compliance, they've proven their expertise in fintech.",
    rating: 5,
    project: 'FinTech Mobile Revolution',
    industry: 'Financial Technology',
    featured: true,
  },
  {
    id: 3,
    name: 'Sarah Williams',
    role: 'Marketing Director',
    company: 'DataCorp Industries',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBkaXJlY3RvciUyMHdvbWFufGVufDF8fHx8MTc1NjMyOTMwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content:
      "Our enterprise analytics platform increased decision-making efficiency by 400%. KodeGrove's data visualization expertise helped us unlock insights we never knew existed.",
    rating: 5,
    project: 'Enterprise Analytics Hub',
    industry: 'Data & Analytics',
    featured: true,
  },
  {
    id: 4,
    name: 'David Rodriguez',
    role: 'Founder',
    company: 'SocialShop Inc',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGZvdW5kZXIlMjBtYW58ZW58MXx8fHwxNzU2MzI5MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content:
      'The social commerce app they built achieved 500% increase in user engagement. KodeGrove understands how to create addictive user experiences that drive real business results.',
    rating: 5,
    project: 'Social Commerce App',
    industry: 'Social Commerce',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Brand Manager',
    company: 'Luxe Brands Collective',
    avatar:
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhicmFuZCUyMG1hbmFnZXIlMjB3b21hbnxlbnwxfHx8fDE3NTYzMjkzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content:
      'KodeGrove elevated our luxury brand presence with a 180% increase in average order value. Their understanding of premium user experience is unmatched.',
    rating: 5,
    project: 'Luxury Lifestyle Platform',
    industry: 'Luxury Retail',
  },
  {
    id: 6,
    name: 'Robert Kim',
    role: 'Head of Digital',
    company: 'MedConnect Pro',
    avatar:
      'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwZXhlY3V0aXZlfGVufDF8fHx8MTc1NjMyOTMwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content:
      'Our HIPAA-compliant telemedicine platform reached 250% more patients while maintaining 98% satisfaction. KodeGrove delivered beyond our wildest expectations.',
    rating: 5,
    project: 'Healthcare Platform Revolution',
    industry: 'Healthcare Technology',
  },
  {
    id: 7,
    name: 'Amanda Foster',
    role: 'VP Product',
    company: 'EduFuture Academy',
    avatar:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBleGVjdXRpdmUlMjB3b21hbnxlbnwxfHx8fDE3NTYzMjkzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content:
      "The interactive learning platform achieved 600% higher completion rates. KodeGrove's gamification approach made learning truly engaging for our students.",
    rating: 5,
    project: 'EdTech Learning Platform',
    industry: 'Education Technology',
  },
  {
    id: 8,
    name: 'James Wilson',
    role: 'CEO',
    company: 'Green Fashion Co',
    avatar:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBDRU98ZW58MXx8fHwxNzU2MzI5MzAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    content:
      'KodeGrove created our sustainable fashion marketplace with innovative carbon tracking. We saw 300% brand awareness growth and 70% repeat customer rate.',
    rating: 5,
    project: 'Sustainable Fashion Marketplace',
    industry: 'Sustainable Fashion',
  },
];

export const getFeaturedTestimonials = (): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.featured);
};

export const getTestimonialsByIndustry = (industry: string): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.industry === industry);
};

export const getAverageRating = (): number => {
  const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
  return totalRating / testimonials.length;
};
