'use client';

import { motion } from 'framer-motion';
import {
  ShoppingCart,
  CreditCard,
  BarChart3,
  Users,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export function EcommercePopup() {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Advanced Shopping Cart',
      description: 'Smart cart with abandoned cart recovery, wishlist, and one-click checkout',
      stats: '+40% conversion rate',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Multiple payment gateways with fraud protection and PCI compliance',
      stats: '100% secure transactions',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time insights on sales, customers, and inventory management',
      stats: '+200% ROI visibility',
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'CRM integration with customer profiles, order history, and loyalty programs',
      stats: '+85% retention rate',
    },
  ];

  const platforms = [
    {
      name: 'Shopify Plus',
      description: 'Enterprise-grade Shopify stores with custom themes and advanced features',
      price: 'From $12,999',
      features: [
        'Custom Shopify theme development',
        'Advanced app integrations',
        'Multi-currency support',
        'Automated inventory management',
        'Advanced analytics dashboard',
      ],
      gradient: 'from-green-500 to-emerald-500',
      icon: '🛍️',
    },
    {
      name: 'Custom Platform',
      description: 'Fully custom e-commerce solution built with Next.js and modern tech stack',
      price: 'From $24,999',
      features: [
        '100% custom development',
        'Unlimited customization',
        'Advanced search & filters',
        'AI-powered recommendations',
        'Headless commerce architecture',
      ],
      gradient: 'from-purple-500 to-pink-500',
      icon: '⚡',
      popular: true,
    },
    {
      name: 'WooCommerce',
      description: 'WordPress-based stores with extensive plugin ecosystem',
      price: 'From $7,999',
      features: [
        'WordPress integration',
        'Extensive plugin support',
        'SEO optimization',
        'Content management',
        'Blog integration',
      ],
      gradient: 'from-blue-500 to-cyan-500',
      icon: '🔧',
    },
  ];

  const successStories = [
    {
      company: 'Fashion Boutique',
      industry: 'Fashion',
      results: '+320% Sales Growth',
      description: 'Luxury online boutique with immersive product galleries and AR try-on features',
      metrics: {
        sales: '+320%',
        conversion: '+85%',
        traffic: '+150%',
      },
    },
    {
      company: 'Tech Store',
      industry: 'Electronics',
      results: '+200% Conversion Rate',
      description: 'Electronics store with advanced product configurator and comparison tools',
      metrics: {
        sales: '+280%',
        conversion: '+200%',
        retention: '+90%',
      },
    },
  ];

  return (
    <div className="p-8">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-6 border border-white/20">
          <ShoppingCart className="w-5 h-5 text-green-400" />
          <span className="font-medium text-gray-200">E-Commerce Solutions</span>
        </div>

        <h1 className="font-outfit text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Stores That Sell
          </span>
          <br />
          <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            24/7 Automatically
          </span>
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          Transform browsers into buyers with luxury e-commerce experiences that drive sales and
          build customer loyalty.
        </p>

        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">avg. +250% sales</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">PCI Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">&lt;2s Load Time</span>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="glass border border-white/10 rounded-xl p-6 group hover:border-green-500/30 transition-all duration-300"
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-outfit text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 mb-3 leading-relaxed">{feature.description}</p>
                <div className="text-green-400 font-medium text-sm">{feature.stats}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Platform Options */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="text-center mb-10">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">Choose Your Platform</h2>
          <p className="text-gray-300 text-lg">Built for scale, designed for success</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              className={`relative glass border rounded-2xl p-8 ${
                platform.popular
                  ? 'border-purple-500/50 ring-2 ring-purple-500/20'
                  : 'border-white/10'
              } group hover:border-white/30 transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {platform.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Recommended
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{platform.icon}</div>
                <h3 className="font-outfit text-2xl font-bold text-white mb-2">{platform.name}</h3>
                <p className="text-gray-400 mb-4">{platform.description}</p>
                <div className="mb-6">
                  <span
                    className={`text-3xl font-bold bg-gradient-to-r ${platform.gradient} bg-clip-text text-transparent`}
                  >
                    {platform.price}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {platform.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full bg-gradient-to-r ${platform.gradient} hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300`}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Success Stories */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-center mb-10">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-gray-300 text-lg">Real results from real businesses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {successStories.map((story, index) => (
            <motion.div
              key={story.company}
              className="glass border border-white/10 rounded-xl p-6 group hover:border-green-500/30 transition-all duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-outfit text-xl font-bold text-white">{story.company}</h3>
                  <span className="text-green-400 text-sm font-medium px-3 py-1 rounded-full bg-green-500/10">
                    {story.industry}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">{story.description}</p>
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {story.results}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">{story.metrics.sales}</div>
                  <div className="text-xs text-gray-400">Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-400">
                    {story.metrics.conversion}
                  </div>
                  <div className="text-xs text-gray-400">Conversion</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-cyan-400">
                    {story.metrics.traffic || story.metrics.retention}
                  </div>
                  <div className="text-xs text-gray-400">
                    {story.metrics.traffic ? 'Traffic' : 'Retention'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="text-center glass border border-white/10 rounded-2xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h3 className="font-outfit text-2xl font-bold text-white mb-4">
          Ready to Launch Your Online Store?
        </h3>
        <p className="text-gray-300 mb-6 text-lg">
          Join successful businesses generating millions in online revenue with our e-commerce
          solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl">
            Start Your Store
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl"
          >
            View E-commerce Portfolio
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
