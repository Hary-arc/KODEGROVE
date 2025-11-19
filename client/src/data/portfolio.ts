// Portfolio projects data structure

export interface ProjectMetrics {
  increase: string;
  metric: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  metrics: ProjectMetrics;
  featured?: boolean;
  link?: string;
  demoLink?: string;
  client?: string;
  year?: string;
  duration?: string;
  challenges?: string[];
  results?: string[];
  // Enhanced case study fields
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  timeline?: string;
  team?: string[];
  testimonial?: ProjectTestimonial;
  gallery?: string[];
  videoUrl?: string;
}

export interface PortfolioTab {
  name: string;
  icon: string;
  count: number;
}

export const portfolioTabs: PortfolioTab[] = [
  { name: 'Featured', icon: 'Award', count: 8 },
  { name: 'B2B', icon: 'Building', count: 12 },
  { name: 'B2C', icon: 'Users', count: 15 },
  { name: 'eCommerce', icon: 'ShoppingCart', count: 10 },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Hypnotic E-Commerce Platform',
    category: 'Featured',
    description: 'Revolutionary shopping experience with AI-powered recommendations',
    demoLink: 'https://www.shopify.com/examples',
    image:
      'https://images.unsplash.com/photo-1642132652860-471b4228023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NjI0MDQ4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    technologies: ['Next.js', 'Three.js', 'Shopify Plus', 'AI/ML', 'WebGL', 'Stripe'],
    metrics: { increase: '+320%', metric: 'Sales' },
    featured: true,
    client: 'TechStyle Fashion',
    year: '2024',
    duration: '6 months',
    challenges: [
      'Complex product visualization requirements',
      'Real-time inventory synchronization',
      'Performance optimization for mobile',
    ],
    results: [
      '320% increase in online sales',
      '65% reduction in cart abandonment',
      '4.8/5 user satisfaction rating',
    ],
    // Enhanced case study data
    fullDescription:
      'This revolutionary e-commerce platform reimagines online shopping through cutting-edge AI recommendations, immersive 3D product visualization, and hypnotic micro-interactions that guide users seamlessly from discovery to purchase.',
    challenge:
      'Traditional e-commerce platforms suffer from high bounce rates, poor conversion, and lack of personalization. Users struggle to visualize products and often abandon carts due to uncertainty and friction in the buying process.',
    solution:
      'We developed an AI-powered platform with 3D product visualization, personalized recommendation engine, and frictionless checkout flow. The interface features mesmerizing animations and intuitive navigation that guides users naturally toward conversion.',
    outcome:
      'The platform achieved a 320% increase in sales within the first quarter, with user engagement time increasing by 400% and cart abandonment dropping to just 11% - industry-leading metrics.',
    timeline: '6 months',
    team: [
      'UX/UI Designer',
      'Frontend Developer',
      '3D Artist',
      'AI Engineer',
      'Backend Developer',
      'DevOps Engineer',
    ],
    testimonial: {
      quote:
        "Kodegrove transformed our vision into a reality that exceeded every expectation. The platform is not just functional—it's absolutely mesmerizing.",
      author: 'Sarah Chen',
      role: 'CEO',
      company: 'TechStyle Fashion',
    },
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVza3RvcHxlbnwxfHx8fDE3NTYwOTk2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzU2MDU3NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1642132652860-471b4228023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NjA5OTYzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1667422380246-3bed910ffae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwd2ViJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc1NjE1MjQ4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    videoUrl: 'https://www.canva.com/design/DAGojsoZZ_c/rJzedsgVwma62h_iDiL6jQ/watch',
  },
  {
    id: 2,
    title: 'FinTech Mobile Revolution',
    category: 'Featured',
    description: 'Next-gen banking with biometric security and fluid UX',
    demoLink: 'https://www.shopify.com/examples',
    image:
      'https://images.unsplash.com/photo-1678667720699-5c0fc04ac166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzU2MjcyODk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    technologies: ['React Native', 'Blockchain', 'ML', 'Biometrics API', 'Node.js', 'PostgreSQL'],
    metrics: { increase: '2M+', metric: 'Downloads' },
    featured: true,
    client: 'NeoBank Solutions',
    year: '2024',
    duration: '8 months',
    challenges: [
      'Advanced biometric authentication integration',
      'Real-time transaction processing',
      'Regulatory compliance requirements',
    ],
    results: [
      '2M+ app downloads in first quarter',
      '99.9% security compliance rating',
      '45% faster transaction processing',
    ],
    // Enhanced case study data
    fullDescription:
      'A revolutionary mobile banking application that combines cutting-edge biometric security with an intuitive, fluid user experience. The app redefines digital banking through advanced AI-powered insights and seamless transaction processing.',
    challenge:
      'Traditional banking apps suffer from poor user experience, security vulnerabilities, and slow transaction processing. Users demand faster, more secure, and intuitive banking solutions that can compete with modern fintech standards.',
    solution:
      'We developed a comprehensive mobile banking platform featuring advanced biometric authentication, real-time transaction processing, AI-powered financial insights, and a fluid, intuitive interface designed for the modern user.',
    outcome:
      'The app achieved 2M+ downloads in the first quarter, maintained 99.9% security compliance rating, and reduced transaction processing time by 45%, setting new industry standards for mobile banking.',
    timeline: '8 months',
    team: [
      'Mobile Developer',
      'Security Engineer',
      'UX/UI Designer',
      'Backend Developer',
      'QA Engineer',
      'Compliance Officer',
    ],
    testimonial: {
      quote:
        'CodeFlow delivered a mobile banking solution that not only met our security requirements but exceeded our user experience expectations. The app has revolutionized how our customers interact with banking.',
      author: 'Michael Rodriguez',
      role: 'CTO',
      company: 'NeoBank Solutions',
    },
    gallery: [
      'https://images.unsplash.com/photo-1678667720699-5c0fc04ac166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzU2MjcyODk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzU2MDU3NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1559526324-593bc073d938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwYXBwJTIwbW9ja3VwfGVufDF8fHx8MTc1NjMxODQyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
  },
  {
    id: 3,
    title: 'Enterprise Analytics Hub',
    category: 'B2B',
    description: 'Real-time business intelligence with stunning visualizations',
    demoLink: 'https://www.shopify.com/examples',
    image:
      'https://images.unsplash.com/photo-1728598909887-2d983a8889b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTYzMTg0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    technologies: ['React', 'D3.js', 'Python', 'Apache Kafka', 'PostgreSQL', 'Docker', 'AWS'],
    metrics: { increase: '+400%', metric: 'Efficiency' },
    featured: true,
    client: 'DataCorp Industries',
    year: '2023',
    duration: '10 months',
    challenges: [
      'Complex data visualization requirements',
      'Real-time data processing at scale',
      'Multi-tenant architecture design',
    ],
    results: [
      '400% increase in decision-making efficiency',
      '60% reduction in report generation time',
      '95% user adoption rate across organization',
    ],
    // Enhanced case study data
    fullDescription:
      'An enterprise-grade analytics platform that transforms complex data into actionable insights through stunning visualizations and real-time processing. The system empowers organizations to make data-driven decisions with unprecedented speed and accuracy.',
    challenge:
      'Enterprise organizations struggled with fragmented data sources, slow reporting processes, and complex analytics tools that required specialized expertise. Decision-makers needed faster access to accurate insights without technical barriers.',
    solution:
      'We created a comprehensive analytics hub featuring real-time data processing, interactive visualizations, automated reporting, and an intuitive interface that makes complex analytics accessible to all organizational levels.',
    outcome:
      'The platform delivered a 400% increase in decision-making efficiency, reduced report generation time by 60%, and achieved 95% user adoption across the organization, transforming how the company leverages data.',
    timeline: '10 months',
    team: [
      'Data Engineer',
      'Frontend Developer',
      'UX Designer',
      'Backend Developer',
      'DevOps Engineer',
      'Data Scientist',
    ],
    testimonial: {
      quote:
        'The analytics platform CodeFlow built for us has revolutionized our decision-making process. What used to take weeks now takes minutes, and the insights are crystal clear.',
      author: 'Jennifer Park',
      role: 'Chief Data Officer',
      company: 'DataCorp Industries',
    },
    gallery: [
      'https://images.unsplash.com/photo-1728598909887-2d983a8889b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTYzMTg0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1642132652860-471b4228023e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NjA5OTYzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NTYzMTg0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
  },
  {
    id: 4,
    title: 'Healthcare Platform Revolution',
    category: 'B2B',
    description: 'HIPAA-compliant telemedicine platform with AI diagnostics',
    demoLink: 'https://www.shopify.com/examples',
    image:
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTYzMjkzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    technologies: [
      'Vue.js',
      'Node.js',
      'AI/ML',
      'WebRTC',
      'HIPAA Compliance',
      'AWS HealthLake',
      'Socket.io',
    ],
    metrics: { increase: '+250%', metric: 'Patient Reach' },
    client: 'MedConnect Pro',
    year: '2023',
    duration: '12 months',
    challenges: [
      'HIPAA compliance and security',
      'Real-time video consultation quality',
      'AI diagnostic integration',
    ],
    results: [
      '250% increase in patient reach',
      '40% reduction in consultation time',
      '98% patient satisfaction score',
    ],
    // Enhanced case study data
    fullDescription:
      'A comprehensive telemedicine platform that revolutionizes healthcare delivery through secure video consultations, AI-powered diagnostics, and seamless patient management, all while maintaining strict HIPAA compliance.',
    challenge:
      'Healthcare providers struggled with limited patient reach, inefficient consultation processes, and the need for secure, compliant digital solutions. The COVID-19 pandemic accelerated demand for remote healthcare delivery while maintaining the highest security standards.',
    solution:
      'We developed a complete telemedicine ecosystem featuring HD video consultations, AI diagnostic assistance, electronic health records integration, prescription management, and real-time patient monitoring - all built with enterprise-grade security.',
    outcome:
      'The platform expanded patient reach by 250%, reduced consultation times by 40%, and achieved 98% patient satisfaction while maintaining perfect HIPAA compliance across 50+ healthcare facilities.',
    timeline: '12 months',
    team: [
      'Healthcare UX Designer',
      'Security Engineer',
      'AI/ML Engineer',
      'Backend Developer',
      'Compliance Specialist',
      'DevOps Engineer',
      'QA Engineer',
    ],
    testimonial: {
      quote:
        "This platform has transformed our practice. We can now serve patients across multiple states while maintaining the personal touch that's so important in healthcare.",
      author: 'Dr. Maria Santos',
      role: 'Chief Medical Officer',
      company: 'MedConnect Pro',
    },
    gallery: [
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTYzMjkzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlbWVkaWNpbmV8ZW58MXx8fHwxNzU2MzI5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NjMyOTMwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
  },
  {
    id: 5,
    title: 'Social Commerce App',
    category: 'B2C',
    description: 'Instagram-style shopping experience with social features',
    demoLink: 'https://www.shopify.com/examples',
    image:
      'https://images.unsplash.com/photo-1611078176655-91d4c7b3a589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGFwcHxlbnwxfHx8fDE3NTYzMjkyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    technologies: [
      'Flutter',
      'Firebase',
      'Stripe',
      'Socket.io',
      'Push Notifications',
      'ML Recommendations',
    ],
    metrics: { increase: '+500%', metric: 'Engagement' },
    client: 'SocialShop Inc',
    year: '2024',
    duration: '5 months',
    challenges: [
      'Social feature integration',
      'Real-time chat and notifications',
      'Payment processing optimization',
    ],
    results: [
      '500% increase in user engagement',
      '75% conversion rate from browse to buy',
      '4.9/5 app store rating',
    ],
    // Enhanced case study data
    fullDescription:
      'A revolutionary social commerce platform that combines Instagram-style social features with seamless shopping experiences. Users can discover, share, and purchase products through an engaging social interface.',
    challenge:
      'Traditional e-commerce apps lack social engagement, making shopping feel isolated and transactional. Users wanted to share experiences, get recommendations from friends, and shop in a more interactive, social environment.',
    solution:
      'We developed a hybrid social-commerce platform featuring Instagram-style feeds, real-time chat, social sharing, influencer integration, and one-tap purchasing, creating a community-driven shopping experience.',
    outcome:
      'The app achieved 500% increase in user engagement, 75% conversion rate from browse to buy, and maintained a 4.9/5 app store rating, proving that social commerce is the future of online shopping.',
    timeline: '5 months',
    team: [
      'Mobile Developer',
      'Social Media Expert',
      'UX Designer',
      'Backend Developer',
      'Payment Integration Specialist',
    ],
    testimonial: {
      quote:
        "CodeFlow created more than just an app - they built a community. Our users are not just customers, they're brand ambassadors who actively share and engage.",
      author: 'Alex Thompson',
      role: 'Founder',
      company: 'SocialShop Inc',
    },
    gallery: [
      'https://images.unsplash.com/photo-1611078176655-91d4c7b3a589?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGFwcHxlbnwxfHx8fDE3NTYzMjkyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzU2MDU3NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1592179900205-8d4bea7c4774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NTYzMjkyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
  },
  {
    id: 6,
    title: 'Luxury Lifestyle Platform',
    category: 'eCommerce',
    description: 'Premium e-commerce experience for luxury brands',
    demoLink: 'https://www.shopify.com/examples',
    image:
      'https://images.unsplash.com/photo-1590735213920-68192a487bc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlY29tbWVyY2V8ZW58MXx8fHwxNzU2MzI5Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    technologies: [
      'Next.js',
      'Headless Commerce',
      'Prisma',
      'Stripe Connect',
      'Cloudinary',
      'Redis',
    ],
    metrics: { increase: '+180%', metric: 'AOV' },
    client: 'Luxe Brands Collective',
    year: '2023',
    duration: '7 months',
    challenges: [
      'Premium brand presentation',
      'Complex inventory management',
      'VIP customer experience',
    ],
    results: [
      '180% increase in average order value',
      '90% customer retention rate',
      '300% growth in VIP membership',
    ],
    // Enhanced case study data
    fullDescription:
      'An ultra-premium e-commerce platform designed for luxury brands, featuring exclusive collections, personalized shopping experiences, and white-glove customer service that reflects the sophistication of high-end retail.',
    challenge:
      "Luxury brands needed a digital presence that matched their physical boutique experience. Standard e-commerce platforms couldn't deliver the exclusivity, personalization, and premium service that luxury customers expect.",
    solution:
      'We created a bespoke platform featuring curated collections, personal shopping assistants, exclusive member access, premium packaging options, and concierge-level customer service, all wrapped in an elegant, minimalist design.',
    outcome:
      'The platform increased average order value by 180%, achieved 90% customer retention, and grew VIP membership by 300%, establishing a new standard for luxury e-commerce experiences.',
    timeline: '7 months',
    team: [
      'Luxury UX Designer',
      'Frontend Developer',
      'E-commerce Specialist',
      'Backend Developer',
      'Brand Consultant',
      'QA Engineer',
    ],
    testimonial: {
      quote:
        "kodeGrove understood that luxury isn't just about products - it's about the entire experience. They've created a platform that truly reflects our brand's sophistication.",
      author: 'Isabella Rossi',
      role: 'Brand Director',
      company: 'Luxe Brands Collective',
    },
    gallery: [
      'https://images.unsplash.com/photo-1590735213920-68192a487bc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlY29tbWVyY2V8ZW58MXx8fHwxNzU2MzI5Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZWNvbW1lcmNlfGVufDF8fHx8MTc1NjMyOTI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVza3RvcHxlbnwxfHx8fDE3NTYwOTk2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
  },
  {
    id: 7,
    title: 'EdTech Learning Platform',
    category: 'B2C',
    description: 'Interactive learning platform with gamification',
    demoLink: 'https://www.shopify.com/examples',
    image:
      'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjMyOTI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    technologies: ['React', 'WebGL', 'Node.js', 'Three.js', 'AI/ML', 'WebRTC', 'MongoDB'],
    metrics: { increase: '+600%', metric: 'Completion Rate' },
    featured: true,
    client: 'EduFuture Academy',
    year: '2024',
    duration: '6 months',
    challenges: [
      'Interactive content delivery',
      'Progress tracking system',
      'Gamification mechanics',
    ],
    results: [
      '600% increase in course completion',
      '85% student engagement score',
      '50% reduction in learning time',
    ],
    // Enhanced case study data
    fullDescription:
      'A next-generation educational platform that transforms learning through immersive 3D environments, AI-powered personalization, and game-like mechanics that make complex subjects engaging and accessible for all learning styles.',
    challenge:
      'Traditional e-learning platforms suffered from poor engagement, high dropout rates, and one-size-fits-all approaches. Students needed more interactive, personalized, and engaging ways to learn complex subjects.',
    solution:
      'We built an immersive learning environment featuring 3D visualizations, adaptive AI tutoring, gamified progression systems, peer collaboration tools, and real-time performance analytics to create truly personalized learning experiences.',
    outcome:
      'The platform achieved a remarkable 600% increase in course completion rates, 85% student engagement scores, and reduced average learning time by 50%, revolutionizing how students interact with educational content.',
    timeline: '6 months',
    team: [
      'EdTech UX Designer',
      '3D Developer',
      'AI/ML Engineer',
      'Frontend Developer',
      'Educational Consultant',
      'Backend Developer',
    ],
    testimonial: {
      quote:
        "Our students are now genuinely excited about learning. The platform has transformed education from a chore into an adventure that students can't wait to continue.",
      author: 'Dr. James Mitchell',
      role: 'Dean of Digital Learning',
      company: 'EduFuture Academy',
    },
    gallery: [
      'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjMyOTI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZ3xlbnwxfHx8fDE3NTYzMjkyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nfGVufDF8fHx8MTc1NjMyOTI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
  },
  {
    id: 8,
    title: 'Sustainable Fashion Marketplace',
    category: 'eCommerce',
    description: 'Eco-friendly fashion platform with sustainability tracking',

    demoLink: 'https://www.shopify.com/examples',
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZWNvbW1lcmNlfGVufDF8fHx8MTc1NjMyOTI5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    technologies: ['Svelte', 'Supabase', 'Sustainability APIs'],
    metrics: { increase: '+300%', metric: 'Brand Awareness' },
    client: 'Green Fashion Co',
    year: '2024',
    duration: '4 months',
    challenges: [
      'Sustainability metrics integration',
      'Vendor verification system',
      'Carbon footprint calculation',
    ],
    results: [
      '300% increase in brand awareness',
      '70% of customers became repeat buyers',
      '25% reduction in return rates',
    ],
  },
];

// Filter projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'Featured') {
    return projects.filter(project => project.featured);
  }
  return projects.filter(project => project.category === category);
};

// Get featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured).slice(0, 3);
};
