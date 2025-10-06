// Team and company data structure

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface CompanyValue {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
  achievements: string[];
}

export interface CompanyStat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const team: TeamMember[] = [
  {
    name: 'Alex Rodriguez',
    role: 'CEO & Founder',
    image:
      'https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0JTIwQ0VPfGVufDF8fHx8MTc1NjMyNzg5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Visionary leader with 15+ years in digital innovation.',
    specialties: ['Strategy', 'Innovation', 'Leadership'],
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Sarah Chen',
    role: 'Chief Technology Officer',
    image:
      'https://images.unsplash.com/photo-1754298949882-216a1c92dbb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhidXNpbmVzcyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MzIyMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Tech evangelist driving our cutting-edge development.',
    specialties: ['Architecture', 'AI/ML', 'Cloud'],
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Marcus Johnson',
    role: 'Lead Developer',
    image:
      'https://images.unsplash.com/photo-1731951039706-0e793240bb32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZGV2ZWxvcGVyJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU2MzI3ODk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Full-stack wizard crafting scalable solutions.',
    specialties: ['React', 'Node.js', 'DevOps'],
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Emily Rodriguez',
    role: 'Creative Director',
    image:
      'https://images.unsplash.com/photo-1564518534518-e79657852a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGNyZWF0aXZlJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MzI3ODk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bio: 'Design visionary creating mesmerizing user experiences.',
    specialties: ['UI/UX', 'Branding', 'Animation'],
    social: { linkedin: '#', twitter: '#' },
  },
];

export const companyValues: CompanyValue[] = [
  {
    icon: 'Lightbulb',
    title: 'Innovation First',
    description:
      'We push boundaries and challenge conventions to create truly revolutionary digital experiences.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: 'Users',
    title: 'Client Partnership',
    description:
      'Your success is our mission. We build lasting relationships through transparent collaboration.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'Target',
    title: 'Excellence Driven',
    description:
      'Every pixel, every interaction, every line of code is crafted with meticulous attention to detail.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: 'Rocket',
    title: 'Future Ready',
    description:
      "We build solutions that scale and adapt, keeping you ahead of tomorrow's challenges.",
    gradient: 'from-green-500 to-emerald-500',
  },
];

export const companyTimeline: TimelineItem[] = [
  {
    year: '2019',
    title: 'The Genesis',
    description: 'CodeFlow was born from a vision to revolutionize digital experiences.',
    icon: 'Sparkles',
    achievements: ['Founded in San Francisco', 'First 5 team members', 'Mission defined'],
  },
  {
    year: '2020',
    title: 'Rapid Growth',
    description: 'Expanded our team and delivered groundbreaking projects for startups.',
    icon: 'TrendingUp',
    achievements: ['50+ projects completed', 'Team grew to 15', 'First major awards'],
  },
  {
    year: '2021',
    title: 'Global Recognition',
    description: 'Won industry awards and expanded to serve enterprise clients worldwide.',
    icon: 'Trophy',
    achievements: ['Global client base', '100+ projects', 'Industry recognition'],
  },
  {
    year: '2022',
    title: 'Innovation Hub',
    description: 'Launched our innovation lab focusing on AI and immersive technologies.',
    icon: 'Zap',
    achievements: ['Innovation lab', 'AI integration', 'Advanced R&D'],
  },
  {
    year: '2023',
    title: 'Market Leadership',
    description:
      'Became the go-to partner for Fortune 500 companies seeking digital transformation.',
    icon: 'Crown',
    achievements: ['Fortune 500 clients', 'Market leadership', 'Team of 50+'],
  },
  {
    year: '2024',
    title: 'Future Vision',
    description: 'Expanding our impact with sustainable tech and cutting-edge solutions.',
    icon: 'Globe',
    achievements: ['Sustainable tech', 'Global impact', 'Next-gen solutions'],
  },
];

export const companyStats: CompanyStat[] = [
  {
    icon: 'Rocket',
    value: 50,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Successful digital transformations',
  },
  {
    icon: 'Users',
    value: 250,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Across 25+ countries',
  },
  {
    icon: 'Calendar',
    value: 6,
    suffix: '',
    label: 'Years of Excellence',
    description: 'Continuous innovation',
  },
  {
    icon: 'Award',
    value: 99,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Measured by project success',
  },
];

export const companyMission = {
  title: 'Our Mission',
  description:
    "To create mesmerizing digital experiences that don't just meet expectations—they shatter them. We believe every interaction should feel magical, every interface should tell a story, and every project should transform businesses into digital powerhouses.",
};
