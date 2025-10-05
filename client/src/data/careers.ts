export interface JobPosition {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  location: string;
  remote: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  benefits: string[];
  featured: boolean;
}

export interface CompanyPerk {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'wellness' | 'growth' | 'work-life' | 'financial';
}

export interface CultureImage {
  id: string;
  url: string;
  alt: string;
  title: string;
  description: string;
  category: 'office' | 'team' | 'events' | 'workspace';
}

export const jobPositions: JobPosition[] = [
  {
    id: 'senior-frontend-developer',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'San Francisco, CA',
    remote: true,
    description:
      "Join our elite frontend team to create mesmerizing user experiences that captivate and engage. You'll work on cutting-edge projects using the latest technologies to build interfaces that are both beautiful and performant.",
    responsibilities: [
      'Develop and maintain high-quality React applications with TypeScript',
      'Collaborate with design teams to implement pixel-perfect, responsive interfaces',
      'Optimize applications for maximum speed and scalability',
      'Mentor junior developers and contribute to code reviews',
      'Stay up-to-date with emerging frontend technologies and best practices',
      'Work closely with backend teams to integrate APIs and services',
    ],
    requirements: [
      '5+ years of experience in frontend development',
      'Expert knowledge of React, TypeScript, and modern JavaScript',
      'Strong experience with CSS frameworks (Tailwind CSS preferred)',
      'Experience with state management libraries (Redux, Zustand)',
      'Familiarity with build tools and bundlers (Vite, Webpack)',
      'Strong understanding of web performance optimization',
      'Experience with testing frameworks (Jest, React Testing Library)',
      'Excellent communication and collaboration skills',
    ],
    niceToHave: [
      'Experience with Next.js and server-side rendering',
      'Knowledge of motion libraries (Framer Motion, GSAP)',
      'Experience with 3D graphics (Three.js, React Three Fiber)',
      'Backend development experience with Node.js',
      'Experience with design tools (Figma, Adobe Creative Suite)',
      'Contributions to open-source projects',
    ],
    salary: {
      min: 140000,
      max: 180000,
      currency: 'USD',
    },
    benefits: [
      'Competitive salary with equity options',
      'Comprehensive health, dental, and vision insurance',
      'Unlimited PTO and flexible working hours',
      'Professional development budget ($5,000/year)',
      'Latest MacBook Pro and equipment allowance',
      'Catered meals and premium coffee',
    ],
    featured: true,
  },
  {
    id: 'ui-ux-designer',
    title: 'Senior UI/UX Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'San Francisco, CA',
    remote: true,
    description:
      "Create extraordinary digital experiences that push the boundaries of design. You'll lead the design of innovative interfaces that not only look stunning but also provide intuitive and delightful user journeys.",
    responsibilities: [
      'Design user-centered interfaces for web and mobile applications',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with developers to ensure design implementation',
      'Maintain and evolve our design system',
      'Present design concepts to stakeholders and clients',
    ],
    requirements: [
      '4+ years of experience in UI/UX design',
      'Expert proficiency in Figma and Adobe Creative Suite',
      'Strong portfolio demonstrating design thinking and process',
      'Experience with user research and testing methodologies',
      'Understanding of frontend development principles',
      'Knowledge of accessibility standards and best practices',
      'Excellent visual design skills with attention to detail',
    ],
    niceToHave: [
      'Experience with motion design and micro-interactions',
      'Knowledge of HTML/CSS and basic JavaScript',
      'Experience with design systems and component libraries',
      'Background in branding and identity design',
      'Experience with AR/VR interface design',
      'Illustration and graphic design skills',
    ],
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD',
    },
    benefits: [
      'Competitive salary with equity options',
      'Comprehensive health, dental, and vision insurance',
      'Unlimited PTO and flexible working hours',
      'Design conference budget ($3,000/year)',
      'Latest design tools and software licenses',
      'Ergonomic workspace setup allowance',
    ],
    featured: true,
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'San Francisco, CA',
    remote: true,
    description:
      "Build the robust, scalable infrastructure that powers our innovative digital solutions. You'll work on high-performance systems that handle millions of requests while maintaining security and reliability.",
    responsibilities: [
      'Design and develop scalable backend services and APIs',
      'Optimize database performance and implement caching strategies',
      'Ensure security best practices and data protection',
      'Collaborate with frontend teams on API design and integration',
      'Monitor system performance and troubleshoot issues',
      'Participate in architecture decisions and technical planning',
    ],
    requirements: [
      '3+ years of backend development experience',
      'Strong knowledge of Node.js, Python, or Go',
      'Experience with relational and NoSQL databases',
      'Familiarity with cloud platforms (AWS, GCP, Azure)',
      'Understanding of microservices architecture',
      'Experience with containerization (Docker, Kubernetes)',
      'Knowledge of API design and RESTful services',
    ],
    niceToHave: [
      'Experience with GraphQL and real-time technologies',
      'Knowledge of DevOps practices and CI/CD pipelines',
      'Experience with message queues and event-driven architecture',
      'Understanding of machine learning and AI integration',
      'Experience with blockchain technologies',
      'Contributions to open-source projects',
    ],
    salary: {
      min: 130000,
      max: 170000,
      currency: 'USD',
    },
    benefits: [
      'Competitive salary with equity options',
      'Comprehensive health, dental, and vision insurance',
      'Unlimited PTO and flexible working hours',
      'Technical conference budget ($4,000/year)',
      'Home office setup allowance',
      'Professional development opportunities',
    ],
    featured: false,
  },
  {
    id: 'product-manager',
    title: 'Senior Product Manager',
    department: 'Product',
    type: 'Full-time',
    location: 'San Francisco, CA',
    remote: false,
    description:
      "Drive product strategy and execution for our most innovative digital solutions. You'll work closely with cross-functional teams to bring groundbreaking products to market that delight users and drive business growth.",
    responsibilities: [
      'Define product vision, strategy, and roadmap',
      'Conduct market research and competitive analysis',
      'Gather and prioritize product requirements',
      'Work with engineering and design teams to deliver features',
      'Analyze product metrics and user feedback',
      'Communicate product updates to stakeholders',
    ],
    requirements: [
      '5+ years of product management experience',
      'Strong analytical and data-driven decision making skills',
      'Experience with product management tools (Jira, Notion, Figma)',
      'Understanding of software development lifecycle',
      'Excellent communication and leadership skills',
      'Experience with user research and testing',
      "Bachelor's degree in Business, Engineering, or related field",
    ],
    niceToHave: [
      'MBA or advanced degree',
      'Experience in digital agency or consulting environment',
      'Technical background with coding experience',
      'Experience with B2B and enterprise products',
      'Knowledge of design thinking methodologies',
      'Experience with international product launches',
    ],
    salary: {
      min: 150000,
      max: 200000,
      currency: 'USD',
    },
    benefits: [
      'Competitive salary with equity options',
      'Comprehensive health, dental, and vision insurance',
      'Unlimited PTO and flexible working hours',
      'Product conference budget ($5,000/year)',
      'Leadership development programs',
      'Stock option plan',
    ],
    featured: false,
  },
  {
    id: 'design-intern',
    title: 'Design Intern',
    department: 'Design',
    type: 'Internship',
    location: 'San Francisco, CA',
    remote: false,
    description:
      'Kickstart your design career at CodeFlow! This internship offers hands-on experience working on real client projects while learning from our senior design team. Perfect for students or recent graduates passionate about digital design.',
    responsibilities: [
      'Assist in creating wireframes and visual designs',
      'Support user research and testing activities',
      'Help maintain and update design system components',
      'Participate in design critiques and team meetings',
      'Shadow senior designers on client projects',
      'Create design deliverables under supervision',
    ],
    requirements: [
      'Currently pursuing or recently completed degree in Design, HCI, or related field',
      'Basic proficiency in Figma and Adobe Creative Suite',
      'Strong visual design sense and attention to detail',
      'Eagerness to learn and take feedback',
      'Good communication and collaboration skills',
      'Portfolio demonstrating design projects and process',
    ],
    niceToHave: [
      'Internship or work experience in design',
      'Knowledge of HTML/CSS basics',
      'Experience with user research methods',
      'Understanding of accessibility principles',
      'Motion design or animation skills',
      'Illustration or graphic design background',
    ],
    salary: {
      min: 25,
      max: 30,
      currency: 'USD',
    },
    benefits: [
      'Hourly compensation',
      'Mentorship from senior designers',
      'Access to design tools and resources',
      'Networking opportunities',
      'Potential for full-time offer',
      'Portfolio development support',
    ],
    featured: false,
  },
];

export const companyPerks: CompanyPerk[] = [
  {
    id: 'health-wellness',
    title: 'Premium Health Coverage',
    description: 'Comprehensive health, dental, and vision insurance for you and your family',
    icon: '🏥',
    category: 'wellness',
  },
  {
    id: 'unlimited-pto',
    title: 'Unlimited PTO',
    description: 'Take the time you need to recharge and maintain work-life balance',
    icon: '🏖️',
    category: 'work-life',
  },
  {
    id: 'learning-budget',
    title: 'Learning & Development',
    description: '$5,000 annual budget for courses, conferences, and professional growth',
    icon: '📚',
    category: 'growth',
  },
  {
    id: 'equity-options',
    title: 'Equity Participation',
    description: 'Share in our success with stock options and equity programs',
    icon: '📈',
    category: 'financial',
  },
  {
    id: 'remote-flexibility',
    title: 'Remote-First Culture',
    description: 'Work from anywhere with flexible hours and modern collaboration tools',
    icon: '🌍',
    category: 'work-life',
  },
  {
    id: 'premium-equipment',
    title: 'Top-Tier Equipment',
    description: 'Latest MacBook Pro, 4K monitors, and any tools you need to excel',
    icon: '💻',
    category: 'work-life',
  },
  {
    id: 'mental-health',
    title: 'Mental Health Support',
    description: 'Access to therapy, meditation apps, and wellness programs',
    icon: '🧠',
    category: 'wellness',
  },
  {
    id: 'team-retreats',
    title: 'Team Retreats',
    description: 'Quarterly team building events and annual company retreats',
    icon: '✈️',
    category: 'work-life',
  },
  {
    id: 'innovation-time',
    title: '20% Innovation Time',
    description: 'Dedicate time to passion projects and experimental ideas',
    icon: '💡',
    category: 'growth',
  },
  {
    id: 'parental-leave',
    title: 'Generous Parental Leave',
    description: '16 weeks paid leave for new parents with gradual return options',
    icon: '👶',
    category: 'wellness',
  },
  {
    id: 'commuter-benefits',
    title: 'Commuter Benefits',
    description: 'Pre-tax commuter benefits or home office setup allowance',
    icon: '🚇',
    category: 'financial',
  },
  {
    id: 'food-beverages',
    title: 'Catered Meals',
    description: 'Daily catered lunch, premium coffee, and healthy snacks',
    icon: '🍽️',
    category: 'wellness',
  },
];

export const cultureImages: CultureImage[] = [
  {
    id: 'office-space',
    url: 'https://images.unsplash.com/photo-1594892342285-9b86df3ad47a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtfGVufDF8fHx8MTc1NjQ3MTg0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Modern office workspace',
    title: 'Our Creative Workspace',
    description: 'A modern, open office designed to inspire creativity and collaboration',
    category: 'office',
  },
  {
    id: 'team-meeting',
    url: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzU2NTIxNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Team collaboration session',
    title: 'Collaborative Culture',
    description: 'Cross-functional teams working together on innovative solutions',
    category: 'team',
  },
  {
    id: 'hackathon',
    url: 'https://images.unsplash.com/photo-1731160807880-daf859b64420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwaGFja2F0aG9uJTIwY29kaW5nJTIwZXZlbnR8ZW58MXx8fHwxNzU2NTYzNDQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Company hackathon event',
    title: 'Innovation Events',
    description: 'Quarterly hackathons where creativity meets cutting-edge technology',
    category: 'events',
  },
  {
    id: 'coffee-chat',
    url: 'https://images.unsplash.com/photo-1722407348647-de76f66f3b94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBicmVhayUyMG9mZmljZSUyMGNhc3VhbHxlbnwxfHx8fDE3NTY1NjM0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Casual coffee break',
    title: 'Coffee Connections',
    description: 'Informal conversations that spark the best ideas',
    category: 'workspace',
  },
  {
    id: 'presentation',
    url: 'https://images.unsplash.com/photo-1750768145390-f0ad18d3e65b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwcHJlc2VudGF0aW9uJTIwbWVldGluZyUyMHJvb218ZW58MXx8fHwxNzU2NTYzNDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Team presentation',
    title: 'Knowledge Sharing',
    description: 'Regular tech talks and knowledge sharing sessions',
    category: 'team',
  },
  {
    id: 'outdoor-meeting',
    url: 'https://images.unsplash.com/photo-1637580680563-abfa3f1cf0e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwd29ya3NwYWNlJTIwbWVldGluZ3xlbnwxfHx8fDE3NTY1NjM0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Outdoor team meeting',
    title: 'Flexible Workspaces',
    description: 'Beautiful outdoor spaces for fresh air and fresh thinking',
    category: 'workspace',
  },
  {
    id: 'celebration',
    url: 'https://images.unsplash.com/photo-1744891470331-c660191721b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY2VsZWJyYXRpb24lMjBvZmZpY2UlMjBwYXJ0eXxlbnwxfHx8fDE3NTY1NjM0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Team celebration',
    title: 'Celebrating Success',
    description: 'We celebrate every milestone and achievement together',
    category: 'events',
  },
  {
    id: 'focus-zone',
    url: 'https://images.unsplash.com/photo-1753613648109-791ed9c85b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlldCUyMGZvY3VzJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NjU2MzQ1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Quiet focus area',
    title: 'Focus Zones',
    description: 'Dedicated quiet spaces for deep work and concentration',
    category: 'workspace',
  },
];

export const careerStats = {
  employeeCount: 127,
  averageTenure: '3.2 years',
  diversityPercentage: 68,
  remoteEmployees: 85,
  promotionRate: '23%',
  learningHours: 156,
};

export const missionStatement = {
  title: 'Crafting Digital Experiences That Mesmerize',
  subtitle: 'Our Mission',
  description:
    "At CodeFlow, we believe that exceptional digital experiences have the power to transform businesses and captivate users. Our mission is to push the boundaries of what's possible in web and mobile development, creating solutions that are not just functional, but truly mesmerizing.",
  values: [
    {
      title: 'Innovation First',
      description:
        'We embrace cutting-edge technologies and creative approaches to solve complex challenges.',
    },
    {
      title: 'User-Centric Design',
      description:
        'Every decision we make is driven by creating exceptional experiences for end users.',
    },
    {
      title: 'Collaborative Excellence',
      description:
        'We believe the best solutions emerge from diverse perspectives and collaborative thinking.',
    },
    {
      title: 'Continuous Growth',
      description:
        "We invest in our team's development and foster a culture of continuous learning.",
    },
  ],
};
