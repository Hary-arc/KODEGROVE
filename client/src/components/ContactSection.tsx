'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import React from 'react';
export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    budget: '',
    timeline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      info: 'hello@codeflow.dev',
      description: 'Drop us a line anytime',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Phone,
      title: 'Phone',
      info: '+1 (555) 123-4567',
      description: '24/7 support available',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MapPin,
      title: 'Studio',
      info: 'San Francisco, CA',
      description: 'Where magic happens',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const services = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'E-Commerce',
    'Backend Development',
    'DevOps & Security',
    'Digital Strategy',
    'Complete Digital Transformation',
  ];

  const budgets = [
    'Under $25K',
    '$25K - $50K',
    '$50K - $100K',
    '$100K - $250K',
    'Over $250K',
    "Let's Discuss",
  ];

  const timelines = ['ASAP', '1-3 months', '3-6 months', '6+ months', 'Just exploring ideas'];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
        budget: '',
        timeline: '',
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.15),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MessageCircle className="w-5 h-5 text-cyan-400" />
            <span className="font-medium text-gray-200">Let's Connect</span>
          </motion.div>

          <h2 className="font-outfit text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Create
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Something Mesmerizing?
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Let's transform your vision into a hypnotic digital experience that captivates users and
            revolutionizes your business. The magic starts here.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-12"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Contact Methods */}
            <div>
              <h3 className="font-outfit text-2xl font-bold text-white mb-8">Get in Touch</h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="group relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-start space-x-4 p-6 glass rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 relative overflow-hidden">
                      <div
                        className={`w-12 h-12 gradient-electric rounded-xl flex items-center justify-center relative overflow-hidden`}
                      >
                        <info.icon className="w-6 h-6 text-white relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{info.title}</h4>
                        <p className="text-lg text-cyan-400 font-medium mb-1">{info.info}</p>
                        <p className="text-sm text-gray-400">{info.description}</p>
                      </div>

                      <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Response Promise */}
            <motion.div
              className="glass rounded-2xl border border-white/10 p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5" />

              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 gradient-electric rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Lightning Response</h4>
                    <p className="text-sm text-gray-400">We value your time</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  We respond to all inquiries within 2 hours during business hours. For urgent
                  projects, we're available 24/7.
                </p>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <h4 className="font-semibold text-white mb-4">Why Choose CodeFlow?</h4>
              <div className="space-y-3">
                {[
                  'Free strategy consultation',
                  'Transparent fixed pricing',
                  'Hypnotic design guarantee',
                  'Lifetime support included',
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Card className="glass border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5" />

              <CardContent className="p-10 relative z-10">
                {!isSubmitted ? (
                  <>
                    <div className="mb-8">
                      <h3 className="font-outfit text-3xl font-bold text-white mb-2">
                        Start Your{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                          Digital Journey
                        </span>
                      </h3>
                      <p className="text-gray-300">
                        Tell us about your vision and we'll make it mesmerizing.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white font-medium">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="glass border-white/20 focus:border-cyan-400 text-white placeholder:text-gray-400 h-12"
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white font-medium">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="glass border-white/20 focus:border-cyan-400 text-white placeholder:text-gray-400 h-12"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-white font-medium">
                          Company
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="glass border-white/20 focus:border-cyan-400 text-white placeholder:text-gray-400 h-12"
                          placeholder="Your Amazing Company"
                        />
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="service" className="text-white font-medium">
                            Service Needed
                          </Label>
                          <select
                            aria-label="Select service needed"
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            className="w-full h-12 px-3 glass border border-white/20 rounded-lg focus:border-cyan-400 text-white bg-transparent"
                          >
                            <option value="" className="bg-slate-900">
                              Select a service
                            </option>
                            {services.map(service => (
                              <option key={service} value={service} className="bg-slate-900">
                                {service}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="budget" className="text-white font-medium">
                            Project Budget
                          </Label>
                          <select
                            aria-label="Select project budget"
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full h-12 px-3 glass border border-white/20 rounded-lg focus:border-cyan-400 text-white bg-transparent"
                          >
                            <option value="" className="bg-slate-900">
                              Select budget range
                            </option>
                            {budgets.map(budget => (
                              <option key={budget} value={budget} className="bg-slate-900">
                                {budget}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeline" className="text-white font-medium">
                          Timeline
                        </Label>
                        <select
                          aria-label="Select project timeline"
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full h-12 px-3 glass border border-white/20 rounded-lg focus:border-cyan-400 text-white bg-transparent"
                        >
                          <option value="" className="bg-slate-900">
                            When do you need this completed?
                          </option>
                          {timelines.map(timeline => (
                            <option key={timeline} value={timeline} className="bg-slate-900">
                              {timeline}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white font-medium">
                          Project Vision *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="glass border-white/20 focus:border-cyan-400 text-white placeholder:text-gray-400 resize-none"
                          placeholder="Describe your vision, goals, target audience, and what makes your project special. The more details, the better we can craft your digital magic..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full gradient-electric text-white font-semibold py-4 text-lg relative overflow-hidden group"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-3">
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </div>
                        )}
                      </Button>

                      <div className="text-center mt-4">
                        <Button
                          onClick={() => (window.location.hash = '/quotation')}
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          Or Get Instant Quotation
                          <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>

                      <p className="text-sm text-gray-400 text-center">
                        🔒 Your information is secure and will never be shared.
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      className="w-20 h-20 gradient-electric rounded-full flex items-center justify-center mx-auto mb-8"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="font-outfit text-4xl font-bold text-white mb-4">
                      Magic in Motion! ✨
                    </h3>
                    <p className="text-xl text-gray-300 mb-6">
                      Your message has been sent. We'll get back to you within 2 hours with some
                      digital magic.
                    </p>
                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Response within 2h</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4" />
                        <span>Free consultation included</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
