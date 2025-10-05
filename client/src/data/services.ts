// Services data structure

export interface ServiceFeature {
  title: string;
  description?: string;
}

export interface CaseStudy {
  title: string;
  description: string;
  image: string;
  metrics: string;
  tech: string[];
  link?: string;
}

export interface Service {
  id: string;
  title: string;
  shortTitle?: string;
  icon: string;
  description: string;
  gradient: string;
  features: string[];
  caseStudies: CaseStudy[];
  pricing?: {
    starting: string;
    description: string;
  };
}

export const services: Service[] = [
  {
    id: 'web-design',
    title: 'Web Design & Development',
    shortTitle: 'Web Design',
    icon: 'Monitor',
    description: 'Create stunning, responsive websites that captivate users and drive conversions',
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      'Custom Website Design',
      'Responsive Development',
      'Performance Optimization',
      'SEO Integration',
      'Content Management Systems',
      'E-commerce Solutions',
    ],
    caseStudies: [
      {
        title: 'FinTech Revolution Platform',
        description: 'Next-generation banking platform with advanced UX',
        image:
          'https://images.unsplash.com/photo-1545361367-3202270671e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZmludGVjaCUyMGFwcHxlbnwxfHx8fDE3NTYzMjkyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        metrics: '+450% User Engagement',
        tech: ['React', 'Node.js', 'PostgreSQL'],
      },
      {
        title: 'E-commerce Masterpiece',
        description: 'Revolutionary shopping experience with AI recommendations',
        image:
          'https://images.unsplash.com/photo-1642132652860-471b4228023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NjI0MDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        metrics: '+320% Sales Growth',
        tech: ['Next.js', 'Shopify', 'AI/ML'],
      },
    ],
    pricing: {
      starting: '$15,000',
      description: 'Full-stack web development projects',
    },
  },
  {
    id: 'branding',
    title: 'Brand Identity & Design',
    shortTitle: 'Branding',
    icon: 'Palette',
    description: 'Craft memorable brand experiences that resonate with your target audience',
    gradient: 'from-purple-500 to-pink-500',
    features: [
      'Logo Design & Brand Guidelines',
      'Visual Identity Systems',
      'Marketing Collateral',
      'Brand Strategy Consulting',
      'Packaging Design',
      'Digital Brand Assets',
    ],
    caseStudies: [
      {
        title: 'Tech Startup Rebrand',
        description: 'Complete brand transformation for emerging tech company',
        image:
          'https://images.unsplash.com/photo-1733826544831-ad71d05c8423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMGJyYW5kaW5nfGVufDF8fHx8MTc1NjMxOTY5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        metrics: '+280% Brand Recognition',
        tech: ['Adobe Creative Suite', 'Figma', 'Brand Strategy'],
      },
      {
        title: 'Luxury Brand Identity',
        description: 'Premium brand system for high-end lifestyle company',
        image:
          'https://images.unsplash.com/photo-1633533446213-a438ff5f0629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc1NjMwMzg2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        metrics: '+200% Market Presence',
        tech: ['Brand Strategy', 'Print Design', 'Digital Assets'],
      },
    ],
    pricing: {
      starting: '$8,000',
      description: 'Complete brand identity packages',
    },
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    shortTitle: 'Digital Marketing',
    icon: 'TrendingUp',
    description: 'Drive explosive growth with data-driven marketing strategies and campaigns',
    gradient: 'from-orange-500 to-red-500',
    features: [
      'Digital Strategy & Planning',
      'Social Media Marketing',
      'Content Marketing',
      'PPC & Ad Campaigns',
      'SEO & Analytics',
      'Email Marketing Automation',
    ],
    caseStudies: [
      {
        title: 'Social Media Revolution',
        description: 'Viral marketing campaign that transformed brand reach',
        image:
          'https://images.unsplash.com/photo-1607968565043-36af90dde238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNhbXBhaWdufGVufDF8fHx8MTc1NjMyOTI5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        metrics: '10M+ Impressions',
        tech: ['Social Strategy', 'Content Creation', 'Analytics'],
      },
      {
        title: 'Performance Marketing Hub',
        description: 'Advanced analytics dashboard for marketing optimization',
        image:
          'https://images.unsplash.com/photo-1599658880436-c61792e70672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc1NjMyNDc5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        metrics: '+500% ROI Increase',
        tech: ['Google Analytics', 'Facebook Ads', 'Automation Tools'],
      },
    ],
    pricing: {
      starting: '$5,000',
      description: 'Monthly digital marketing campaigns',
    },
  },
  {
    id: 'development',
    title: 'Custom Software Development',
    shortTitle: 'Development',
    icon: 'Code',
    description: 'Build scalable, robust applications that power your business growth',
    gradient: 'from-emerald-500 to-teal-500',
    features: [
      'Custom Web Applications',
      'Mobile App Development',
      'API Development & Integration',
      'Database Design & Optimization',
      'Cloud Infrastructure',
      'DevOps & Deployment',
    ],
    caseStudies: [
      {
        title: 'Enterprise SaaS Platform',
        description: 'Scalable business management system for enterprises',
        image:
          'https://images.unsplash.com/photo-1735399976112-17508533c97a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBpbnRlcmZhY2UlMjBtb2NrdXB8ZW58MXx8fHwxNzU2MzAyNjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        metrics: '99.9% Uptime',
        tech: ['React', 'Node.js', 'AWS', 'Docker'],
      },
      {
        title: 'Mobile Banking App',
        description: 'Secure mobile banking solution with biometric authentication',
        image:
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTYzMTUyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        metrics: '2M+ Downloads',
        tech: ['React Native', 'Blockchain', 'Biometric APIs'],
      },
    ],
    pricing: {
      starting: '$5,000',
      description: 'Custom software development projects',
    },
  },
];

export const serviceStats = [
  { icon: 'Award', number: '50+', label: 'Projects' },
  { icon: 'Users', number: '250+', label: 'Clients' },
  { icon: 'Star', number: '98%', label: 'Satisfaction' },
  { icon: 'TrendingUp', number: '300%', label: 'Avg Growth' },
];
