// FAQ data for different pages

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type FAQData = {
  title: string;
  subtitle: string;
  faqs: FAQ[];
};

// Home Page FAQs
export const homeFAQs: FAQData = {
  title: "Frequently Asked Questions",
  subtitle: "Everything you need to know about working with CodeFlow",
  faqs: [
    {
      id: "01",
      question: "What services does CodeFlow offer?",
      answer: "CodeFlow specializes in web design and development, brand strategy, digital marketing, e-commerce solutions, mobile app development, and custom software solutions. We provide end-to-end digital services to transform your business and enhance your online presence.",
    },
    {
      id: "02",
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on scope and complexity. A simple website typically takes 4-6 weeks, while more complex web applications or e-commerce platforms may take 8-16 weeks. We provide detailed timelines during the initial consultation and keep you updated throughout the process.",
    },
    {
      id: "03",
      question: "What is your pricing structure?",
      answer: "We offer flexible pricing options including fixed-price projects, hourly rates, and monthly retainers. Our pricing depends on project scope, timeline, and requirements. We provide transparent quotes with no hidden fees. Visit our Pricing page or contact us for a custom quote.",
    },
    {
      id: "04",
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes! We offer comprehensive support and maintenance packages to ensure your website or application runs smoothly. Our support includes security updates, performance optimization, content updates, technical assistance, and regular backups.",
    },
    {
      id: "05",
      question: "Can you work with existing websites or applications?",
      answer: "Absolutely! We specialize in redesigns, migrations, and enhancements of existing digital products. Whether you need to modernize an outdated website, fix technical issues, or add new features, our team can help.",
    },
    {
      id: "06",
      question: "What technologies do you work with?",
      answer: "We work with modern technologies including React, Next.js, Node.js, TypeScript, Tailwind CSS, WordPress, Shopify, and more. We choose the best technology stack based on your specific needs, budget, and long-term goals.",
    },
    {
      id: "07",
      question: "Do you offer custom solutions or use templates?",
      answer: "We create custom, tailored solutions designed specifically for your business needs. While we may use proven frameworks and best practices, every project is unique and built from scratch to match your brand, goals, and requirements.",
    },
    {
      id: "08",
      question: "How do you handle project communication?",
      answer: "We maintain transparent communication through regular check-ins, progress updates, and dedicated project management tools. You'll have a dedicated account manager and direct access to our team via email, phone, or video calls throughout the project.",
    },
    {
      id: "09",
      question: "What makes CodeFlow different from other agencies?",
      answer: "CodeFlow combines creative excellence with technical expertise. We focus on delivering measurable results, not just beautiful designs. Our team stays ahead of industry trends, provides strategic guidance, and builds long-term partnerships with clients. We're committed to your success.",
    },
  ],
};

// Services Page FAQs
export const servicesFAQs: FAQData = {
  title: "Service Questions",
  subtitle: "Common questions about our web development and design services",
  faqs: [
    {
      id: "01",
      question: "What's included in your web design service?",
      answer: "Our web design service includes user research, wireframing, UI/UX design, responsive layouts, prototyping, brand integration, and design system creation. We ensure your website is visually stunning, user-friendly, and optimized for conversions.",
    },
    {
      id: "02",
      question: "Do you build mobile-responsive websites?",
      answer: "Yes, all our websites are fully responsive and optimized for mobile, tablet, and desktop devices. We use a mobile-first approach to ensure excellent user experience across all screen sizes and devices.",
    },
    {
      id: "03",
      question: "Can you integrate third-party services and APIs?",
      answer: "Absolutely! We have extensive experience integrating payment gateways, CRM systems, marketing automation tools, analytics platforms, social media APIs, and custom third-party services into websites and applications.",
    },
    {
      id: "04",
      question: "Do you provide SEO services?",
      answer: "Yes, we implement SEO best practices including technical SEO, on-page optimization, performance optimization, schema markup, and content strategy. We can also provide ongoing SEO consulting and digital marketing services.",
    },
    {
      id: "05",
      question: "What's your process for custom development projects?",
      answer: "Our process includes: Discovery & Planning → Design & Prototyping → Development & Testing → Launch & Deployment → Support & Optimization. We follow agile methodologies with regular sprints and client feedback sessions.",
    },
    {
      id: "06",
      question: "Can you help with branding and logo design?",
      answer: "Yes! Our brand strategy service includes logo design, brand identity, color palettes, typography, brand guidelines, and marketing collateral. We create cohesive brand experiences that resonate with your target audience.",
    },
    {
      id: "07",
      question: "Do you offer e-commerce solutions?",
      answer: "We build custom e-commerce platforms using Shopify, WooCommerce, or custom solutions. Services include product catalog setup, payment integration, inventory management, shipping configuration, and marketing automation.",
    },
    {
      id: "08",
      question: "What's the difference between a website and web application?",
      answer: "A website typically displays information and content, while a web application provides interactive functionality and user-specific features. Web apps are more complex, often involving user authentication, databases, and dynamic content. We specialize in both.",
    },
  ],
};

// Portfolio Page FAQs
export const portfolioFAQs: FAQData = {
  title: "Portfolio & Work Questions",
  subtitle: "Learn more about our projects and case studies",
  faqs: [
    {
      id: "01",
      question: "Can I see examples of similar projects you've done?",
      answer: "Yes! Our portfolio showcases a diverse range of projects across different industries. We can provide case studies and examples specific to your industry or project type during our consultation call.",
    },
    {
      id: "02",
      question: "Do you have experience in my industry?",
      answer: "We've worked with clients across healthcare, finance, e-commerce, technology, education, hospitality, and many other industries. Our team quickly adapts to industry-specific requirements and regulations.",
    },
    {
      id: "03",
      question: "Can you provide client references?",
      answer: "Absolutely! We're happy to connect you with past clients who can speak to their experience working with CodeFlow. We also have testimonials and case studies available on our website.",
    },
    {
      id: "04",
      question: "What results have you achieved for clients?",
      answer: "Our clients have seen significant improvements including increased conversion rates (up to 300%), improved user engagement, higher search rankings, reduced bounce rates, and increased revenue. Specific results vary by project and are detailed in our case studies.",
    },
    {
      id: "05",
      question: "Do you work with startups or only established businesses?",
      answer: "We work with both! We've helped numerous startups launch their MVPs and grow their digital presence, while also partnering with established enterprises on complex digital transformation projects.",
    },
  ],
};

// Pricing Page FAQs
export const pricingFAQs: FAQData = {
  title: "Pricing Questions",
  subtitle: "Transparent answers about our pricing and packages",
  faqs: [
    {
      id: "01",
      question: "How do you calculate project costs?",
      answer: "We calculate costs based on project scope, complexity, timeline, features required, and resources needed. We provide detailed quotes that break down costs by phase and deliverable, ensuring complete transparency.",
    },
    {
      id: "02",
      question: "Do you require a deposit or upfront payment?",
      answer: "Yes, we typically require a 50% deposit to begin work, with the remaining balance due upon project completion. For larger projects, we offer milestone-based payment plans to spread costs throughout the project timeline.",
    },
    {
      id: "03",
      question: "Are there any hidden fees?",
      answer: "No hidden fees, ever. Our quotes include all development, design, and project management costs. Additional costs like domain registration, hosting, third-party services, or premium plugins are clearly outlined and require your approval.",
    },
    {
      id: "04",
      question: "Do you offer payment plans?",
      answer: "Yes! We offer flexible payment plans for larger projects, allowing you to spread costs over the project duration. We can customize payment schedules based on project milestones and your budget requirements.",
    },
    {
      id: "05",
      question: "What's included in your monthly retainer packages?",
      answer: "Retainer packages include ongoing support, maintenance, updates, performance monitoring, security patches, content updates, analytics reporting, and priority support. Specific hours and services vary by package tier.",
    },
    {
      id: "06",
      question: "Can I upgrade or downgrade my package later?",
      answer: "Yes! Our packages are flexible. You can upgrade to add features or downgrade if your needs change. We'll work with you to adjust the scope and pricing accordingly while ensuring project continuity.",
    },
  ],
};

// About Page FAQs
export const aboutFAQs: FAQData = {
  title: "About CodeFlow",
  subtitle: "Learn more about our team, culture, and values",
  faqs: [
    {
      id: "01",
      question: "How long has CodeFlow been in business?",
      answer: "CodeFlow was founded in 2018 and has been delivering exceptional digital solutions for over 5 years. Our team has decades of combined experience in web development, design, and digital strategy.",
    },
    {
      id: "02",
      question: "Where is CodeFlow located?",
      answer: "We're headquartered in San Francisco, CA, with team members across the United States. We work with clients globally and are equipped to handle projects in any timezone with flexible communication schedules.",
    },
    {
      id: "03",
      question: "What's your company culture like?",
      answer: "We foster a collaborative, innovative, and inclusive culture that values continuous learning, creativity, and work-life balance. Our team is passionate about technology and dedicated to delivering exceptional results for our clients.",
    },
    {
      id: "04",
      question: "Do you work remotely or in-office?",
      answer: "We operate as a hybrid team with both remote and in-office options. This flexibility allows us to attract top talent from anywhere while maintaining strong team collaboration and client communication.",
    },
    {
      id: "05",
      question: "Are you hiring?",
      answer: "We're always looking for talented designers, developers, and strategists to join our team! Check our Careers page for current openings and submit your application. We value diversity and welcome applicants from all backgrounds.",
    },
  ],
};

// Contact Page FAQs
export const contactFAQs: FAQData = {
  title: "Getting Started",
  subtitle: "Questions about contacting us and starting your project",
  faqs: [
    {
      id: "01",
      question: "How do I get started with CodeFlow?",
      answer: "Simply fill out our contact form, schedule a call, or email us at hello@codeflow.com. We'll schedule a free consultation to discuss your project, goals, timeline, and budget. From there, we'll provide a detailed proposal and timeline.",
    },
    {
      id: "02",
      question: "What information do you need for a quote?",
      answer: "To provide an accurate quote, we need to understand your project goals, target audience, desired features, timeline, budget range, and any existing materials (branding, content, etc.). The more details you provide, the more accurate our estimate will be.",
    },
    {
      id: "03",
      question: "How quickly can you start my project?",
      answer: "Our availability varies based on current workload. For new projects, we typically can start within 1-2 weeks after contract signing. Rush projects may be accommodated for an additional fee. Contact us to discuss your timeline.",
    },
    {
      id: "04",
      question: "Do you sign NDAs?",
      answer: "Yes, we're happy to sign non-disclosure agreements (NDAs) to protect your confidential information. We take data security and client confidentiality very seriously and have standard NDAs ready to execute.",
    },
    {
      id: "05",
      question: "What happens after I submit the contact form?",
      answer: "You'll receive an automated confirmation email immediately. Our team will review your inquiry and respond within 24 business hours to schedule a discovery call. During the call, we'll discuss your needs and determine if we're a good fit.",
    },
    {
      id: "06",
      question: "Do you offer free consultations?",
      answer: "Yes! We offer complimentary 30-minute discovery calls to discuss your project, answer questions, and provide initial recommendations. There's no obligation, and we're happy to share our expertise even if you're just exploring options.",
    },
  ],
};

// Export all FAQs
export const allFAQs = {
  home: homeFAQs,
  services: servicesFAQs,
  portfolio: portfolioFAQs,
  pricing: pricingFAQs,
  about: aboutFAQs,
  contact: contactFAQs,
};
