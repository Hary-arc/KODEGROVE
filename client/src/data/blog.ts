export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured: boolean;
  image: string;
  slug: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'development',
    name: 'Development',
    description: 'Latest in web development and software engineering',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'design',
    name: 'Design',
    description: 'UI/UX trends and design methodologies',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'tech-trends',
    name: 'Tech Trends',
    description: 'Emerging technologies and industry insights',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'case-studies',
    name: 'Case Studies',
    description: 'Real project breakdowns and lessons learned',
    color: 'from-orange-500 to-red-500',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development: AI-Powered Code Generation',
    excerpt:
      'Exploring how artificial intelligence is revolutionizing the way we write, test, and deploy code in modern web applications.',
    content: `
      <p>Artificial Intelligence is fundamentally changing how we approach web development. From automated code generation to intelligent debugging, AI tools are becoming indispensable in the modern developer's toolkit.</p>
      
      <h2>The Rise of AI-Powered Development</h2>
      <p>In recent years, we've witnessed an unprecedented surge in AI-powered development tools. GitHub Copilot, OpenAI Codex, and similar platforms are not just autocomplete tools—they're intelligent programming partners that understand context, patterns, and best practices.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li><strong>Increased Productivity:</strong> Developers report 30-50% faster coding speeds</li>
        <li><strong>Reduced Errors:</strong> AI can catch common mistakes before they reach production</li>
        <li><strong>Learning Acceleration:</strong> New developers can learn patterns from AI suggestions</li>
      </ul>
      
      <h2>Implementation Strategies</h2>
      <p>To effectively integrate AI into your development workflow, consider these approaches:</p>
      <p>Start with small, non-critical projects to understand AI capabilities and limitations. Gradually expand usage as comfort and confidence grow.</p>
      
      <h2>Looking Forward</h2>
      <p>The future of web development will likely see even deeper AI integration, with tools that can understand entire codebases, suggest architectural improvements, and even generate comprehensive test suites automatically.</p>
    `,
    author: {
      name: 'Alex Rivera',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      role: 'Lead Developer',
    },
    category: 'development',
    tags: ['AI', 'Web Development', 'Automation', 'Future Tech'],
    publishedAt: '2025-01-15',
    readTime: 8,
    featured: true,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    slug: 'future-of-web-development-ai-powered-code-generation',
  },
  {
    id: '2',
    title: 'Designing for Accessibility: A Complete Guide',
    excerpt:
      'Learn how to create inclusive digital experiences that work for everyone, regardless of their abilities or circumstances.',
    content: `
      <p>Accessibility isn't just a nice-to-have feature—it's a fundamental requirement for creating inclusive digital experiences. In this comprehensive guide, we'll explore the principles, techniques, and tools needed to build accessible applications.</p>
      
      <h2>Understanding Web Accessibility</h2>
      <p>Web accessibility means ensuring that websites and applications can be used by everyone, including people with disabilities. This includes visual, auditory, physical, speech, cognitive, and neurological disabilities.</p>
      
      <h2>The WCAG Guidelines</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) provide a comprehensive framework for accessibility. The four main principles are:</p>
      <ul>
        <li><strong>Perceivable:</strong> Information must be presentable in ways users can perceive</li>
        <li><strong>Operable:</strong> Interface components must be operable by all users</li>
        <li><strong>Understandable:</strong> Information and UI operation must be understandable</li>
        <li><strong>Robust:</strong> Content must be robust enough for various assistive technologies</li>
      </ul>
      
      <h2>Practical Implementation</h2>
      <p>Implementing accessibility features requires attention to detail in both design and development phases. Key considerations include proper color contrast, keyboard navigation, screen reader compatibility, and semantic HTML structure.</p>
    `,
    author: {
      name: 'Sarah Chen',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b9da8e3e?w=100&h=100&fit=crop&crop=face',
      role: 'UX Designer',
    },
    category: 'design',
    tags: ['Accessibility', 'UX Design', 'Inclusive Design', 'WCAG'],
    publishedAt: '2025-01-12',
    readTime: 12,
    featured: true,
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop',
    slug: 'designing-for-accessibility-complete-guide',
  },
  {
    id: '3',
    title: 'Microservices Architecture: When and How to Implement',
    excerpt:
      'A deep dive into microservices architecture, exploring when it makes sense and how to implement it effectively in your projects.',
    content: `
      <p>Microservices architecture has become increasingly popular, but it's not always the right solution. This article explores when microservices make sense and how to implement them effectively.</p>
      
      <h2>What Are Microservices?</h2>
      <p>Microservices are an architectural approach where applications are built as a collection of small, independent services that communicate over well-defined APIs.</p>
      
      <h2>Benefits and Challenges</h2>
      <p>While microservices offer benefits like scalability and technology diversity, they also introduce complexity in deployment, monitoring, and data consistency.</p>
    `,
    author: {
      name: 'Marcus Johnson',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      role: 'Solutions Architect',
    },
    category: 'development',
    tags: ['Microservices', 'Architecture', 'Scalability', 'Backend'],
    publishedAt: '2025-01-10',
    readTime: 15,
    featured: false,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    slug: 'microservices-architecture-when-how-implement',
  },
  {
    id: '4',
    title: 'The Psychology of Color in Digital Design',
    excerpt:
      'Understanding how color choices impact user behavior and emotion in digital interfaces.',
    content: `
      <p>Color is one of the most powerful tools in a designer's arsenal. It can evoke emotions, guide attention, and influence user behavior in profound ways.</p>
      
      <h2>Color Psychology Basics</h2>
      <p>Different colors trigger different psychological responses. Understanding these associations helps create more effective designs.</p>
    `,
    author: {
      name: 'Emma Williams',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      role: 'Creative Director',
    },
    category: 'design',
    tags: ['Color Theory', 'Psychology', 'UI Design', 'Branding'],
    publishedAt: '2025-01-08',
    readTime: 6,
    featured: false,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=400&fit=crop',
    slug: 'psychology-of-color-digital-design',
  },
  {
    id: '5',
    title: 'Blockchain Technology: Beyond Cryptocurrency',
    excerpt:
      'Exploring practical applications of blockchain technology in enterprise solutions and web development.',
    content: `
      <p>While cryptocurrency grabbed headlines, blockchain technology offers numerous practical applications beyond digital currency.</p>
      
      <h2>Real-World Applications</h2>
      <p>From supply chain management to digital identity verification, blockchain is solving real business problems.</p>
    `,
    author: {
      name: 'David Park',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      role: 'Blockchain Developer',
    },
    category: 'tech-trends',
    tags: ['Blockchain', 'Enterprise', 'Innovation', 'Security'],
    publishedAt: '2025-01-05',
    readTime: 10,
    featured: false,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
    slug: 'blockchain-technology-beyond-cryptocurrency',
  },
  {
    id: '6',
    title: 'Case Study: Scaling a Startup to 1M Users',
    excerpt:
      'How we helped a fintech startup scale their platform from 10K to 1M users while maintaining performance and security.',
    content: `
      <p>This case study examines how we successfully scaled a fintech platform from 10,000 to over 1 million users in just 18 months.</p>
      
      <h2>The Challenge</h2>
      <p>The client faced significant performance issues as their user base grew rapidly, with page load times exceeding 5 seconds during peak hours.</p>
    `,
    author: {
      name: 'Lisa Thompson',
      avatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      role: 'Project Manager',
    },
    category: 'case-studies',
    tags: ['Case Study', 'Scaling', 'Performance', 'Fintech'],
    publishedAt: '2025-01-03',
    readTime: 18,
    featured: false,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
    slug: 'case-study-scaling-startup-1m-users',
  },
];

export const featuredPosts = blogPosts.filter(post => post.featured);
export const recentPosts = blogPosts.slice(0, 6);

export function getPostsByCategory(categoryId: string) {
  return blogPosts.filter(post => post.category === categoryId);
}

export function getPostBySlug(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentPostId: string, category: string, limit: number = 3) {
  return blogPosts
    .filter(post => post.id !== currentPostId && post.category === category)
    .slice(0, limit);
}
