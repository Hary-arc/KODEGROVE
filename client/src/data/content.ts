// General content and copy for the website

export interface HeroContent {
  badge: string;
  headline: string;
  subheadline: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface PageHeader {
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
}

export const heroContent: HeroContent = {
  badge: 'Trusted by 500+ Global Clients',
  headline: 'Digital Mastery Unleashed',
  subheadline: 'hypnotic digital experiences',
  description:
    'We create hypnotic digital experiences that mesmerize users and transform businesses into digital powerhouses.',
  ctaPrimary: 'Start Your Project',
  ctaSecondary: 'View Portfolio',
};

export const pageHeaders = {
  about: {
    badge: 'About CodeFlow',
    title: 'We Are Digital Innovators',
    description:
      'A passionate team of designers, developers, and strategists dedicated to creating digital experiences that mesmerize users and transform businesses into industry leaders.',
  },
  services: {
    badge: 'Our Services',
    title: 'Premium Digital Services That Transform',
    description:
      'From concept to launch, we provide comprehensive digital solutions that captivate audiences and accelerate business growth through innovative technology.',
  },
  portfolio: {
    badge: 'Our Work',
    title: 'Projects That Transform & Convert',
    description:
      'Discover our transformative digital solutions that have revolutionized businesses worldwide.',
  },
  contact: {
    badge: 'Get In Touch',
    title: "Let's Create Something Amazing Together",
    description:
      "Ready to transform your digital presence? We'd love to hear about your project and discuss how we can bring your vision to life.",
  },
};

export const ctaContent = {
  services: {
    title: 'Ready to Transform Your Digital Presence?',
    description:
      "Let's create extraordinary digital experiences that captivate your audience and accelerate your growth.",
    primaryButton: 'Start Your Project',
    secondaryButton: 'View Our Work',
  },
  about: {
    title: 'Ready to Build Something Amazing?',
    description:
      "Let's collaborate to transform your vision into a mesmerizing digital reality that captivates users and drives unprecedented growth.",
    primaryButton: 'Start the Journey',
    secondaryButton: null,
  },
  portfolio: {
    title: 'Ready to Create Your Success Story?',
    description:
      "Join our portfolio of successful digital transformations. Let's discuss how we can elevate your brand to new heights.",
    primaryButton: 'Start Your Project',
    secondaryButton: 'Schedule Consultation',
  },
};

export const featuresContent = {
  process: {
    title: 'Our Proven Process',
    description: 'A streamlined approach that delivers exceptional results every time.',
    steps: [
      {
        title: 'Discovery & Strategy',
        description:
          'We dive deep into your business, goals, and challenges to craft the perfect strategy.',
        icon: 'Search',
      },
      {
        title: 'Design & Prototype',
        description:
          'Our designers create stunning visuals and interactive prototypes that bring your vision to life.',
        icon: 'Palette',
      },
      {
        title: 'Development & Testing',
        description:
          'Expert developers build your solution with cutting-edge technology and rigorous testing.',
        icon: 'Code',
      },
      {
        title: 'Launch & Optimize',
        description:
          'We launch your project and continuously optimize for peak performance and growth.',
        icon: 'Rocket',
      },
    ],
  },
  benefits: {
    title: 'Why Choose CodeFlow',
    description: 'The advantages that set us apart from the competition.',
    items: [
      {
        title: 'Premium Quality',
        description:
          'Every project is crafted with meticulous attention to detail and cutting-edge technology.',
        icon: 'Award',
      },
      {
        title: 'Proven Results',
        description:
          'Our portfolio speaks for itself with measurable improvements across all key metrics.',
        icon: 'TrendingUp',
      },
      {
        title: 'Expert Team',
        description:
          'Work with industry leaders who bring years of experience and innovative thinking.',
        icon: 'Users',
      },
      {
        title: 'Ongoing Support',
        description:
          "We don't just deliver and disappear. We provide continued support and optimization.",
        icon: 'Shield',
      },
    ],
  },
};

export const videoContent = {
  title: 'Watch Our Story',
  description: 'See how we transform ideas into digital experiences that captivate and convert.',
  placeholder:
    'https://images.unsplash.com/photo-1652265540589-46f91535337b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB2aWRlbyUyMHByZXNlbnRhdGlvbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NjMyODY0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  duration: '2:34',
};
