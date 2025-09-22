'use client'

import { motion } from 'framer-motion'
import { ResponsiveCard, ResponsiveCardHeader, ResponsiveCardContent, ResponsiveCardFooter, ResponsiveCardTitle } from './ui/responsive-card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Check, X, Star, Zap, Crown, Shield } from 'lucide-react'

interface PricingFeature {
  name: string
  included: boolean
  highlight?: boolean
  description?: string
}

interface PricingCardProps {
  plan: {
    id: string
    name: string
    description: string
    price: {
      monthly: number
      yearly: number
    }
    yearlyDiscount?: number
    icon: 'basic' | 'pro' | 'enterprise'
    popular?: boolean
    recommended?: boolean
    features: PricingFeature[]
    limits?: {
      projects?: number
      storage?: string
      users?: number
      support?: string
    }
    cta: string
    gradient: string
  }
  index: number
  billingCycle: 'monthly' | 'yearly'
  onSelectPlan?: (planId: string) => void
}

const iconMap = {
  basic: Shield,
  pro: Zap,
  enterprise: Crown
}

export function PricingCard({ plan, index, billingCycle, onSelectPlan }: PricingCardProps) {
  const Icon = iconMap[plan.icon]
  const currentPrice = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly
  const originalYearlyPrice = plan.price.monthly * 12
  const yearlyDiscount = plan.yearlyDiscount || Math.round(((originalYearlyPrice - plan.price.yearly) / originalYearlyPrice) * 100)

  return (
    <ResponsiveCard
      variant={plan.popular ? 'gradient' : 'glass'}
      size="lg"
      hover={true}
      animation={true}
      index={index}
      className={`group relative overflow-hidden ${plan.popular ? 'ring-2 ring-purple-400/50 scale-105' : ''} ${plan.recommended ? 'ring-2 ring-cyan-400/50' : ''}`}
    >
      {/* Popular/Recommended Badge */}
      {(plan.popular || plan.recommended) && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <Badge className={`${plan.popular ? 'gradient-electric' : 'bg-gradient-to-r from-cyan-500 to-blue-500'} text-white border-0 shadow-lg px-4 py-1`}>
            <Star className="w-3 h-3 mr-1" />
            {plan.popular ? 'Most Popular' : 'Recommended'}
          </Badge>
        </div>
      )}

      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

      <ResponsiveCardHeader responsive={true}>
        <div className="text-center space-y-4">
          {/* Icon */}
          <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          {/* Plan Name & Description */}
          <div>
            <ResponsiveCardTitle size="xl" className="text-white group-hover:text-purple-300 transition-colors duration-300 text-center">
              {plan.name}
            </ResponsiveCardTitle>
            <p className="text-sm sm:text-base text-gray-400 mt-2 leading-relaxed">
              {plan.description}
            </p>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-center space-x-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                ${currentPrice}
              </span>
              <span className="text-sm sm:text-base text-gray-400">
                /{billingCycle === 'yearly' ? 'year' : 'month'}
              </span>
            </div>

            {/* Yearly Discount */}
            {billingCycle === 'yearly' && yearlyDiscount > 0 && (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-gray-500 line-through">
                  ${plan.price.monthly}/month
                </span>
                <Badge variant="outline" className="border-green-400/50 text-green-400 bg-green-400/10 text-xs">
                  Save {yearlyDiscount}%
                </Badge>
              </div>
            )}
          </div>

          {/* Plan Limits */}
          {plan.limits && (
            <div className="grid grid-cols-2 gap-3 p-4 glass rounded-xl border border-white/10">
              {plan.limits.projects && (
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-white">
                    {plan.limits.projects === -1 ? '∞' : plan.limits.projects}
                  </div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
              )}
              {plan.limits.storage && (
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-white">
                    {plan.limits.storage}
                  </div>
                  <div className="text-xs text-gray-400">Storage</div>
                </div>
              )}
              {plan.limits.users && (
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-white">
                    {plan.limits.users === -1 ? '∞' : plan.limits.users}
                  </div>
                  <div className="text-xs text-gray-400">Users</div>
                </div>
              )}
              {plan.limits.support && (
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-white truncate" title={plan.limits.support}>
                    {plan.limits.support}
                  </div>
                  <div className="text-xs text-gray-400">Support</div>
                </div>
              )}
            </div>
          )}
        </div>
      </ResponsiveCardHeader>

      <ResponsiveCardContent spacing="lg">
        {/* Features List */}
        <div className="space-y-3 sm:space-y-4">
          <h4 className="text-base sm:text-lg font-semibold text-white text-center">
            Features Included:
          </h4>
          
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            {plan.features.map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.05 }}
                className={`flex items-start space-x-3 p-2 rounded-lg transition-all duration-300 ${
                  feature.highlight ? 'bg-purple-500/10 border border-purple-500/20' : ''
                } ${feature.included ? 'hover:bg-white/5' : ''}`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {feature.included ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  ) : (
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className={`text-sm sm:text-base leading-relaxed ${
                    feature.included ? 'text-gray-300' : 'text-gray-500 line-through'
                  } ${feature.highlight ? 'font-semibold text-purple-300' : ''}`}>
                    {feature.name}
                  </span>
                  {feature.description && feature.included && (
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ResponsiveCardContent>

      <ResponsiveCardFooter direction="column">
        <Button
          onClick={() => onSelectPlan?.(plan.id)}
          className={`w-full ${
            plan.popular || plan.recommended 
              ? 'gradient-electric hover:shadow-2xl hover:shadow-purple-500/30' 
              : 'bg-white/10 hover:bg-white/20 border border-white/20'
          } text-white px-6 py-3 sm:py-4 rounded-xl font-semibold relative overflow-hidden group/btn magnetic text-sm sm:text-base`}
        >
          <span className="relative z-10 flex items-center justify-center">
            {plan.cta}
          </span>
          {(plan.popular || plan.recommended) && (
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-3">
          No setup fees • Cancel anytime • 30-day money-back guarantee
        </p>
      </ResponsiveCardFooter>

      {/* Enhanced Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </ResponsiveCard>
  )
}

// Pricing Cards Grid Component
interface PricingCardsGridProps {
  plans: PricingCardProps['plan'][]
  billingCycle: 'monthly' | 'yearly'
  onSelectPlan?: (planId: string) => void
}

export function PricingCardsGrid({ plans, billingCycle, onSelectPlan }: PricingCardsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
      {plans.map((plan, index) => (
        <div key={plan.id} className={`${plan.popular ? 'md:order-2 lg:order-none' : ''}`}>
          <PricingCard
            plan={plan}
            index={index}
            billingCycle={billingCycle}
            onSelectPlan={onSelectPlan}
          />
        </div>
      ))}
    </div>
  )
}