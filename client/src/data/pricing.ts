// Pricing data structure

export interface PricingFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: {
    monthly: number;
    annually: number;
  };
  originalPrice?: {
    monthly: number;
    annually: number;
  };
  description: string;
  features: PricingFeature[];
  buttonText: string;
  popular?: boolean;
  enterprise?: boolean;
  gradient: string;
  icon: string;
}

export interface PricingAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Perfect for small projects',
    price: {
      monthly: 2499,
      annually: 24990,
    },
    description:
      'Ideal for startups and small businesses looking to establish their digital presence.',
    features: [
      { name: 'Up to 5 pages website', included: true },
      { name: 'Responsive design', included: true },
      { name: 'Basic SEO optimization', included: true },
      { name: 'Contact form integration', included: true },
      { name: '1 month support', included: true },
      { name: 'SSL certificate', included: true },
      { name: 'Analytics setup', included: true },
      { name: 'Content management', included: false },
      { name: 'E-commerce functionality', included: false },
      { name: 'Custom animations', included: false },
      { name: 'Advanced integrations', included: false },
      { name: 'Priority support', included: false },
    ],
    buttonText: 'Get Started',
    gradient: 'from-blue-500 to-purple-500',
    icon: 'Zap',
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Most popular choice',
    price: {
      monthly: 4999,
      annually: 49990,
    },
    originalPrice: {
      monthly: 6999,
      annually: 69990,
    },
    description: 'Perfect for growing businesses that need advanced features and ongoing support.',
    features: [
      { name: 'Up to 15 pages website', included: true },
      { name: 'Responsive design', included: true },
      { name: 'Advanced SEO optimization', included: true },
      { name: 'Contact form integration', included: true },
      { name: '3 months support', included: true },
      { name: 'SSL certificate', included: true },
      { name: 'Analytics setup', included: true },
      { name: 'Content management', included: true },
      { name: 'Basic e-commerce (up to 50 products)', included: true },
      { name: 'Custom animations', included: true },
      { name: 'Social media integration', included: true },
      { name: 'Performance optimization', included: true },
      { name: 'Advanced integrations', included: false },
      { name: 'Priority support', included: false },
    ],
    buttonText: 'Start Free Trial',
    popular: true,
    gradient: 'from-purple-500 to-pink-500',
    icon: 'Star',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For large-scale projects',
    price: {
      monthly: 9999,
      annually: 99990,
    },
    description:
      'Comprehensive solution for enterprises with complex requirements and high-traffic needs.',
    features: [
      { name: 'Unlimited pages', included: true },
      { name: 'Responsive design', included: true },
      { name: 'Enterprise SEO', included: true },
      { name: 'Advanced forms & automation', included: true },
      { name: '6 months support', included: true },
      { name: 'SSL certificate', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Full content management', included: true },
      { name: 'Full e-commerce solution', included: true },
      { name: 'Custom animations & interactions', included: true },
      { name: 'All integrations included', included: true },
      { name: 'Priority support', included: true },
      { name: 'Dedicated account manager', included: true },
      { name: 'Custom API development', included: true },
      { name: 'Performance monitoring', included: true },
    ],
    buttonText: 'Contact Sales',
    enterprise: true,
    gradient: 'from-cyan-500 to-blue-600',
    icon: 'Crown',
  },
];

export const pricingAddons: PricingAddon[] = [
  {
    id: 'extra-pages',
    name: 'Additional Pages',
    description: 'Add more pages to your website',
    price: 299,
    unit: 'per page',
    category: 'content',
  },
  {
    id: 'ecommerce-upgrade',
    name: 'E-commerce Upgrade',
    description: 'Add full e-commerce functionality',
    price: 1499,
    unit: 'one-time',
    category: 'functionality',
  },
  {
    id: 'mobile-app',
    name: 'Mobile App',
    description: 'Native iOS and Android app',
    price: 4999,
    unit: 'one-time',
    category: 'platform',
  },
  {
    id: 'advanced-seo',
    name: 'Advanced SEO Package',
    description: 'Comprehensive SEO optimization',
    price: 899,
    unit: 'monthly',
    category: 'marketing',
  },
  {
    id: 'maintenance',
    name: 'Monthly Maintenance',
    description: 'Ongoing updates and maintenance',
    price: 199,
    unit: 'monthly',
    category: 'support',
  },
  {
    id: 'custom-integration',
    name: 'Custom Integration',
    description: 'Connect with third-party services',
    price: 799,
    unit: 'per integration',
    category: 'functionality',
  },
];

export const pricingFAQs: FAQ[] = [
  {
    question: "What's included in the pricing?",
    answer:
      'All plans include responsive design, SSL certificate, basic analytics setup, and ongoing support during the specified period. Higher-tier plans include additional features like e-commerce, advanced animations, and priority support.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll only pay the prorated difference. When downgrading, the change will take effect at your next billing cycle.",
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "We offer a 30-day money-back guarantee for all new projects. If you're not completely satisfied with our work within the first 30 days, we'll provide a full refund.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise clients. All payments are processed securely through Stripe.',
  },
  {
    question: 'How long does it take to complete a project?',
    answer:
      'Project timelines vary based on complexity and scope. Starter projects typically take 2-3 weeks, Professional projects take 4-6 weeks, and Enterprise projects can take 8-12 weeks or more depending on requirements.',
  },
  {
    question: 'Do you provide ongoing maintenance?',
    answer:
      'Yes, we offer ongoing maintenance and support packages. All plans include initial support (1-6 months depending on the plan), and you can purchase extended maintenance packages as needed.',
  },
  {
    question: 'Can you work with my existing website?',
    answer:
      "Absolutely! We can redesign, rebuild, or enhance your existing website. We'll evaluate your current site and recommend the best approach to achieve your goals.",
  },
  {
    question: 'Do you offer custom solutions?',
    answer:
      'Yes, we specialize in custom solutions tailored to your specific needs. Our Enterprise plan includes custom API development, and we can create completely bespoke solutions for unique requirements.',
  },
  {
    question: 'What technologies do you use?',
    answer:
      'We use modern, cutting-edge technologies including React, Next.js, Node.js, and various cloud platforms. We always choose the best technology stack for your specific project requirements.',
  },
  {
    question: 'Is there a setup fee?',
    answer:
      'No, there are no hidden setup fees. The price you see is the price you pay. All initial setup, configuration, and deployment costs are included in the quoted price.',
  },
];

export const pricingStats = {
  clientsSaved: '2.5k+',
  avgROI: '320%',
  projectsDelivered: '500+',
  satisfactionRate: '98%',
};

export const testimonialHighlights = [
  {
    quote: 'CodeFlow transformed our digital presence and increased our revenue by 300%.',
    author: 'Sarah Chen',
    company: 'TechStart Inc.',
    rating: 5,
  },
  {
    quote: "The ROI on our investment was incredible. Best decision we've made for our business.",
    author: 'Michael Rodriguez',
    company: 'Growth Ventures',
    rating: 5,
  },
  {
    quote: 'Professional, reliable, and delivered exactly what they promised. Highly recommend!',
    author: 'Jessica Thompson',
    company: 'Bloom Marketing',
    rating: 5,
  },
];

export const comparisonFeatures = [
  'Custom Design',
  'Responsive Layout',
  'SEO Optimization',
  'Analytics Integration',
  'SSL Certificate',
  'Contact Forms',
  'Content Management',
  'E-commerce Ready',
  'Custom Animations',
  'Priority Support',
  'API Integrations',
  'Performance Monitoring',
  'Dedicated Manager',
  'Custom Development',
];

export const formatPrice = (price: number): string => {
  if (price < 1000) {
    return `$${price}`;
  }
  return `$${(price / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const calculateSavings = (monthly: number, annually: number): number => {
  const monthlyTotal = monthly * 12;
  const savings = ((monthlyTotal - annually) / monthlyTotal) * 100;
  return Math.round(savings);
};
