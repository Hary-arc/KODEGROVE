'use client';

import { motion } from 'framer-motion';
import {
  Smartphone,
  Apple,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export function MobileAppPopup() {
  const platforms = [
    {
      icon: Apple,
      name: 'iOS Development',
      description: 'Native Swift apps for iPhone and iPad with premium user experience',
      features: [
        'SwiftUI Framework',
        'App Store Optimization',
        'Push Notifications',
        'In-App Purchases',
      ],
      gradient: 'from-gray-600 to-gray-800',
    },
    {
      icon: Users,
      name: 'Android Development',
      description: 'Kotlin-based apps optimized for Google Play Store success',
      features: [
        'Material Design',
        'Google Play Console',
        'Firebase Integration',
        'Multi-device Support',
      ],
      gradient: 'from-green-500 to-green-700',
    },
    {
      icon: Smartphone,
      name: 'Cross-Platform',
      description: 'React Native apps that work seamlessly on both platforms',
      features: ['Code Reusability', 'Faster Development', 'Native Performance', 'Single Codebase'],
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const stats = [
    { icon: '📱', value: '50+', label: 'Apps Launched' },
    { icon: '⭐', value: '4.8', label: 'Average Rating' },
    { icon: '📈', value: '2k+', label: 'Downloads' },
    { icon: '🚀', value: '95%', label: 'Success Rate' },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery & Strategy',
      description:
        'We analyze your business goals and target audience to create the perfect app strategy.',
      duration: '1-2 weeks',
    },
    {
      step: '02',
      title: 'Design & Prototype',
      description: 'Create stunning UI/UX designs and interactive prototypes for validation.',
      duration: '2-3 weeks',
    },
    {
      step: '03',
      title: 'Development',
      description: 'Build your app with clean code, robust architecture, and premium features.',
      duration: '6-12 weeks',
    },
    {
      step: '04',
      title: 'Launch & Support',
      description: 'Deploy to app stores and provide ongoing maintenance and updates.',
      duration: 'Ongoing',
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
          <Smartphone className="w-5 h-5 text-purple-400" />
          <span className="font-medium text-gray-200">Mobile App Development</span>
        </div>

        <h1 className="font-outfit text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Apps That Users
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Can't Put Down
          </span>
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          Create mobile experiences that keep users engaged with fluid animations, intuitive design,
          and powerful functionality.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center glass border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.05 }}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
              {stat.value}
            </div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
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
          <p className="text-gray-300 text-lg">Native performance on every device</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              className="glass border border-white/10 rounded-xl p-6 group hover:border-white/30 transition-all duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${platform.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <platform.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="font-outfit text-xl font-bold text-white mb-3">{platform.name}</h3>

              <p className="text-gray-300 mb-6 leading-relaxed">{platform.description}</p>

              <div className="space-y-3">
                {platform.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${platform.gradient}`} />
                    <span className="text-gray-400 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Development Process */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-center mb-10">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">
            Our Development Process
          </h2>
          <p className="text-gray-300 text-lg">From concept to app store in record time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, index) => (
            <motion.div
              key={step.step}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
            >
              {/* Connection Line */}
              {index < process.length - 1 && (
                <div className="hidden lg:block absolute top-6 -right-3 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
              )}

              <div className="glass border border-white/10 rounded-xl p-6 text-center group hover:border-purple-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">{step.step}</span>
                </div>

                <h3 className="font-outfit text-lg font-bold text-white mb-3">{step.title}</h3>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{step.description}</p>

                <div className="text-purple-400 text-xs font-medium uppercase tracking-wide">
                  {step.duration}
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
          Ready to Launch Your App Idea?
        </h3>
        <p className="text-gray-300 mb-6 text-lg">
          Join hundreds of satisfied clients who've transformed their business with our mobile apps.
        </p>

        <div className="flex items-center justify-center space-x-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
          <span className="text-gray-300 ml-2">4.9/5 from 200+ reviews</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl">
            Start Your Project
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl"
          >
            View App Portfolio
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
