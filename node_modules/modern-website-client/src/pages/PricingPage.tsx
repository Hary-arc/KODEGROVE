'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { 
  pricingPlans, 
  pricingAddons, 
  pricingFAQs, 
  pricingStats,
  testimonialHighlights,
  comparisonFeatures,
  formatPrice,
  calculateSavings,
  type PricingPlan 
} from '../data/pricing'
import { siteConfig } from '../data/site-config'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Switch } from '../components/ui/switch'
import { Progress } from '../components/ui/progress'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion'
import {
  Check,
  X,
  Star,
  Zap,
  Crown,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Users,
  TrendingUp,
  Award,
  Phone,
  Mail,
  MessageCircle,
  ChevronRight,
  Info
} from 'lucide-react'

export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [expandedAddon, setExpandedAddon] = useState<string | null>(null)

  const heroRef = useRef(null)
  const plansRef = useRef(null)
  const comparisonRef = useRef(null)
  const faqRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const isPlansInView = useInView(plansRef, { once: true, amount: 0.1 })
  const isComparisonInView = useInView(comparisonRef, { once: true, amount: 0.1 })
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.1 })

  const getIcon = (iconName: string) => {
    const icons = { Zap, Star, Crown }
    return icons[iconName as keyof typeof icons] || Star
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    // In a real app, this would trigger the checkout process
    console.log(`Selected plan: ${planId}`)
  }

  const getPrice = (plan: PricingPlan) => {
    return isAnnual ? plan.price.annually : plan.price.monthly
  }

  const getOriginalPrice = (plan: PricingPlan) => {
    if (!plan.originalPrice) return null
    return isAnnual ? plan.originalPrice.annually : plan.originalPrice.monthly
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-900 to-cyan-900/30" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Animated background orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -25, 25, 0],
            y: [0, 25, -25, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={isHeroInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-3 glass rounded-full px-8 py-4 mb-12 border border-white/20 hover:border-purple-400/50 transition-all duration-500"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
            </motion.div>
            <span className="font-medium text-gray-200">Transparent Pricing</span>
          </motion.div>

          {/* Hero Headlines */}
          <motion.h1 
            className="font-outfit text-5xl lg:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Simple Pricing,
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Extraordinary Results
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Choose the perfect plan for your business. No hidden fees, no surprises. 
            Just premium digital solutions that drive real results.
          </motion.p>

          {/* Pricing Toggle */}
          <motion.div
            className="flex items-center justify-center space-x-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <span className={`font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <div className="relative">
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-cyan-500"
              />
            </div>
            <span className={`font-medium ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual
            </span>
            <Badge className="gradient-electric text-white border-0 ml-2">
              Save {calculateSavings(pricingPlans[1].price.monthly, pricingPlans[1].price.annually)}%
            </Badge>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {[
              { icon: Users, label: 'Happy Clients', value: pricingStats.projectsDelivered },
              { icon: TrendingUp, label: 'Average ROI', value: pricingStats.avgROI },
              { icon: Award, label: 'Projects Done', value: pricingStats.projectsDelivered },
              { icon: Star, label: 'Satisfaction', value: pricingStats.satisfactionRate }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center glass rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 gradient-electric rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-outfit text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section ref={plansRef} className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isPlansInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-outfit text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Choose Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              All plans include our signature premium design, cutting-edge technology, and exceptional support.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {pricingPlans.map((plan, index) => {
              const PlanIcon = getIcon(plan.icon)
              const currentPrice = getPrice(plan)
              const originalPrice = getOriginalPrice(plan)
              const savings = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0

              return (
                <motion.div
                  key={plan.id}
                  className={`relative ${plan.popular ? 'lg:-mt-8 lg:mb-8' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isPlansInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className={`relative h-full overflow-hidden transition-all duration-500 ${
                    plan.popular 
                      ? 'glass border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20 scale-105 hover:scale-110' 
                      : 'glass border border-white/10 hover:border-white/30 hover:scale-105'
                  }`}>
                    {plan.popular && (
                      <div className="absolute top-0 inset-x-0">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-center py-2">
                          <span className="text-white font-semibold text-sm">Most Popular</span>
                        </div>
                      </div>
                    )}

                    <CardContent className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                      {/* Plan Header */}
                      <div className="text-center mb-8">
                        <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center`}>
                          <PlanIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-outfit text-2xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-purple-300 font-medium mb-4">{plan.tagline}</p>

                        {/* Price */}
                        <div className="mb-4">
                          {originalPrice && (
                            <div className="flex items-center justify-center space-x-2 mb-2">
                              <span className="text-gray-400 line-through text-lg">
                                {formatPrice(originalPrice)}
                              </span>
                              <Badge className="bg-red-500 text-white text-xs">
                                Save {savings}%
                              </Badge>
                            </div>
                          )}
                          <div className="flex items-baseline justify-center space-x-1">
                            <span className={`text-4xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                              {formatPrice(currentPrice)}
                            </span>
                            <span className="text-gray-400">
                              /{isAnnual ? 'year' : 'month'}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed">
                          {plan.description}
                        </p>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isPlansInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: 0.8 + index * 0.1 + featureIndex * 0.05 }}
                          >
                            {feature.included ? (
                              <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                <X className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                            <span className={`text-sm ${feature.included ? 'text-white' : 'text-gray-400'}`}>
                              {feature.name}
                            </span>
                            {feature.tooltip && (
                              <Info className="w-4 h-4 text-gray-400 hover:text-white cursor-help" />
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Button
                        onClick={() => handlePlanSelect(plan.id)}
                        className={`w-full py-4 font-semibold transition-all duration-300 ${
                          plan.popular
                            ? `bg-gradient-to-r ${plan.gradient} hover:shadow-xl hover:shadow-purple-500/30 text-white`
                            : plan.enterprise
                            ? `bg-gradient-to-r ${plan.gradient} hover:shadow-xl hover:shadow-cyan-500/30 text-white`
                            : `glass border border-white/20 text-white hover:bg-white/10 hover:border-white/40`
                        }`}
                        size="lg"
                      >
                        {plan.buttonText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Addons Section */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isPlansInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center mb-12">
              <h3 className="font-outfit text-3xl font-bold text-white mb-4">
                Enhance Your Experience
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Add powerful features to supercharge your digital presence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingAddons.map((addon, index) => (
                <motion.div
                  key={addon.id}
                  className="glass rounded-2xl border border-white/10 p-6 hover:border-purple-400/30 transition-all duration-500 hover:scale-105"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isPlansInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">{addon.name}</h4>
                    <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                      {addon.category}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{addon.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {formatPrice(addon.price)}
                    </div>
                    <span className="text-gray-400 text-sm">{addon.unit}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isPlansInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center mb-12">
              <h3 className="font-outfit text-3xl font-bold text-white mb-4">
                What Our Clients Say
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonialHighlights.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-2xl border border-white/10 p-6 text-center hover:border-purple-400/30 transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isPlansInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.2 }}
                >
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section ref={comparisonRef} className="relative py-20 bg-gradient-to-b from-slate-950 to-purple-950/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isComparisonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-outfit text-4xl font-bold text-white mb-4">
              Feature Comparison
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See exactly what's included in each plan
            </p>
          </motion.div>

          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isComparisonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="min-w-full glass rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-4 gap-px bg-white/5">
                {/* Header */}
                <div className="bg-slate-950 p-6">
                  <h3 className="font-semibold text-white">Features</h3>
                </div>
                {pricingPlans.map((plan) => (
                  <div key={plan.id} className="bg-slate-950 p-6 text-center">
                    <h3 className="font-semibold text-white mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-400">{formatPrice(getPrice(plan))}</p>
                  </div>
                ))}

                {/* Feature Rows */}
                {comparisonFeatures.map((feature, index) => (
                  <div key={feature} className="contents">
                    <div className="bg-slate-950 p-4 border-t border-white/5">
                      <span className="text-gray-300">{feature}</span>
                    </div>
                    {pricingPlans.map((plan) => {
                      const planFeature = plan.features.find(f => f.name.toLowerCase().includes(feature.toLowerCase()))
                      const isIncluded = planFeature?.included || 
                        (feature === 'Custom Design' && true) ||
                        (feature === 'Responsive Layout' && true) ||
                        (feature === 'SSL Certificate' && true)

                      return (
                        <div key={`${plan.id}-${feature}`} className="bg-slate-950 p-4 border-t border-white/5 text-center">
                          {isIncluded ? (
                            <Check className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 mx-auto" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-outfit text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300">
              Everything you need to know about our pricing and services
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {pricingFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="glass border border-white/10 rounded-2xl px-6 hover:border-purple-400/30 transition-all duration-300"
                  >
                    <AccordionTrigger className="hover:no-underline text-left py-6">
                      <span className="font-semibold text-white">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            className="glass rounded-3xl p-16 border border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />
            
            <div className="relative z-10">
              <h3 className="font-outfit text-4xl font-bold text-white mb-6">
                Ready to Transform Your{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Digital Presence?
                </span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of successful businesses who trust CodeFlow to deliver 
                extraordinary digital experiences.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white px-12 py-6 rounded-2xl font-semibold magnetic relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <Sparkles className="w-6 h-6" />
                    <span>Start Your Project</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="px-12 py-6 glass border-white/20 text-white hover:bg-white/10 rounded-2xl font-semibold magnetic"
                >
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Schedule Consultation
                </Button>
              </div>

              <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>Premium support included</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}