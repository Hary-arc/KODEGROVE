'use client'
import React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import { 
  Calculator,
  X,
  Check,
  Sparkles,
  Zap,
  Crown,
  ArrowRight,
  DollarSign,
  Clock,
  Target,
  Star
} from 'lucide-react'

interface CalculatorFeature {
  id: string
  name: string
  description: string
  basePrice: number
  multiplier: number
  category: 'essential' | 'enhancement' | 'advanced'
  popular?: boolean
}

interface WebsiteCalculatorProps {
  isOpen: boolean
  onClose: () => void
}

const calculatorFeatures: CalculatorFeature[] = [
  // Essential Features
  {
    id: 'responsive-design',
    name: 'Responsive Design',
    description: 'Mobile, tablet, and desktop optimization',
    basePrice: 0,
    multiplier: 1,
    category: 'essential'
  },
  {
    id: 'ssl-hosting',
    name: 'SSL & Professional Hosting',
    description: 'Secure hosting with SSL certificate',
    basePrice: 0,
    multiplier: 1,
    category: 'essential'
  },
  {
    id: 'contact-forms',
    name: 'Contact Forms',
    description: 'Professional contact and inquiry forms',
    basePrice: 299,
    multiplier: 1,
    category: 'essential'
  },
  {
    id: 'seo-basic',
    name: 'Basic SEO Setup',
    description: 'Meta tags, sitemap, and search optimization',
    basePrice: 499,
    multiplier: 1,
    category: 'essential'
  },
  
  // Enhancement Features
  {
    id: 'cms',
    name: 'Content Management System',
    description: 'Easy content editing and management',
    basePrice: 799,
    multiplier: 1.2,
    category: 'enhancement',
    popular: true
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Functionality',
    description: 'Online store with payment processing',
    basePrice: 1499,
    multiplier: 1.5,
    category: 'enhancement',
    popular: true
  },
  {
    id: 'animations',
    name: 'Custom Animations',
    description: 'Smooth transitions and micro-interactions',
    basePrice: 699,
    multiplier: 1.1,
    category: 'enhancement'
  },
  {
    id: 'blog',
    name: 'Blog System',
    description: 'Full-featured blog with categories',
    basePrice: 599,
    multiplier: 1.1,
    category: 'enhancement'
  },
  
  // Advanced Features
  {
    id: 'custom-api',
    name: 'Custom API Integration',
    description: 'Third-party service integrations',
    basePrice: 999,
    multiplier: 1.3,
    category: 'advanced'
  },
  {
    id: 'user-auth',
    name: 'User Authentication',
    description: 'User accounts and login system',
    basePrice: 899,
    multiplier: 1.4,
    category: 'advanced'
  },
  {
    id: 'analytics',
    name: 'Advanced Analytics',
    description: 'Detailed visitor tracking and insights',
    basePrice: 399,
    multiplier: 1.1,
    category: 'advanced'
  },
  {
    id: 'multilingual',
    name: 'Multi-language Support',
    description: 'Multiple language versions',
    basePrice: 1299,
    multiplier: 1.6,
    category: 'advanced'
  }
]

export function WebsiteCalculator({ isOpen, onClose }: WebsiteCalculatorProps) {
  const [pages, setPages] = useState([5])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['responsive-design', 'ssl-hosting'])
  const [timeline, setTimeline] = useState([4]) // weeks
  const [projectType, setProjectType] = useState<'standard' | 'premium' | 'enterprise'>('standard')

  const basePricePerPage = 299
  const basePrice = 1999

  const toggleFeature = (featureId: string) => {
    if (featureId === 'responsive-design' || featureId === 'ssl-hosting') return // Always included
    
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  const calculatePrice = () => {
    let total = basePrice
    
    // Add page cost
    const pageCount = pages[0]
    if (pageCount > 5) {
      total += (pageCount - 5) * basePricePerPage
    }
    
    // Add features cost
    const featuresTotal = selectedFeatures.reduce((sum, featureId) => {
      const feature = calculatorFeatures.find(f => f.id === featureId)
      if (!feature) return sum
      
      const featureCost = feature.basePrice * feature.multiplier
      return sum + featureCost
    }, 0)
    
    total += featuresTotal
    
    // Apply project type multiplier
    const multipliers = {
      standard: 1,
      premium: 1.3,
      enterprise: 1.6
    }
    
    total *= multipliers[projectType]
    
    // Apply timeline urgency multiplier
    const timelineWeeks = timeline[0]
    if (timelineWeeks <= 2) total *= 1.5 // Rush job
    else if (timelineWeeks <= 3) total *= 1.2 // Fast turnaround
    
    return Math.round(total)
  }

  const getSelectedFeatures = () => {
    return calculatorFeatures.filter(feature => 
      selectedFeatures.includes(feature.id)
    )
  }

  const getEstimatedTimeline = () => {
    const baseWeeks = 4
    const pageMultiplier = Math.ceil(pages[0] / 5)
    const featureMultiplier = selectedFeatures.length * 0.5
    const complexity = {
      standard: 1,
      premium: 1.3,
      enterprise: 1.6
    }
    
    return Math.ceil((baseWeeks + featureMultiplier) * complexity[projectType] * pageMultiplier)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'essential': return Target
      case 'enhancement': return Sparkles
      case 'advanced': return Crown
      default: return Zap
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'essential': return 'from-green-500 to-emerald-500'
      case 'enhancement': return 'from-purple-500 to-pink-500'
      case 'advanced': return 'from-blue-500 to-cyan-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const finalPrice = calculatePrice()
  const estimatedWeeks = getEstimatedTimeline()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="glass border border-white/20 bg-slate-950/95">
                <CardHeader className="border-b border-white/10 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 gradient-electric rounded-xl flex items-center justify-center">
                        <Calculator className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">Website Cost Calculator</CardTitle>
                        <p className="text-gray-400 mt-1">Get an instant estimate for your project</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Configuration Panel */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Project Type */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Project Type</h3>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { id: 'standard', name: 'Standard', desc: 'Clean, professional website', multiplier: '1x' },
                            { id: 'premium', name: 'Premium', desc: 'Advanced features & design', multiplier: '1.3x' },
                            { id: 'enterprise', name: 'Enterprise', desc: 'Custom solutions & integrations', multiplier: '1.6x' }
                          ].map((type) => (
                            <motion.button
                              key={type.id}
                              onClick={() => setProjectType(type.id as any)}
                              className={`p-4 rounded-xl border transition-all duration-300 ${
                                projectType === type.id
                                  ? 'glass border-purple-500 bg-purple-500/10'
                                  : 'glass border-white/10 hover:border-white/30'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="text-center">
                                <div className="text-lg font-semibold text-white">{type.name}</div>
                                <div className="text-sm text-gray-400 mt-1">{type.desc}</div>
                                <Badge className="mt-2 bg-gradient-to-r from-purple-400 to-cyan-400">
                                  {type.multiplier}
                                </Badge>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Page Count */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Number of Pages</h3>
                        <div className="glass rounded-xl p-6 border border-white/10">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-300">Pages: {pages[0]}</span>
                            <span className="text-purple-400 font-semibold">
                              +${pages[0] > 5 ? (pages[0] - 5) * basePricePerPage : 0}
                            </span>
                          </div>
                          <Slider
                            value={pages}
                            onValueChange={setPages}
                            max={20}
                            min={3}
                            step={1}
                            className="mb-2"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>3 pages</span>
                            <span>20+ pages</span>
                          </div>
                          <p className="text-sm text-gray-400 mt-3">
                            First 5 pages included. Additional pages: ${basePricePerPage} each
                          </p>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Timeline</h3>
                        <div className="glass rounded-xl p-6 border border-white/10">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-300">Desired Timeline: {timeline[0]} weeks</span>
                            <span className={`font-semibold ${timeline[0] <= 3 ? 'text-orange-400' : 'text-green-400'}`}>
                              {timeline[0] <= 2 ? '+50%' : timeline[0] <= 3 ? '+20%' : 'Standard Rate'}
                            </span>
                          </div>
                          <Slider
                            value={timeline}
                            onValueChange={setTimeline}
                            max={12}
                            min={2}
                            step={1}
                            className="mb-2"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>2 weeks (Rush)</span>
                            <span>12+ weeks</span>
                          </div>
                          <p className="text-sm text-gray-400 mt-3">
                            Rush projects (≤3 weeks) include urgency fees
                          </p>
                        </div>
                      </div>

                      {/* Features Selection */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Features & Add-ons</h3>
                        <div className="space-y-4">
                          {Object.entries(
                            calculatorFeatures.reduce((acc, feature) => {
                              if (!acc[feature.category]) acc[feature.category] = []
                              acc[feature.category].push(feature)
                              return acc
                            }, {} as Record<string, CalculatorFeature[]>)
                          ).map(([category, features]) => {
                            const CategoryIcon = getCategoryIcon(category)
                            const categoryColor = getCategoryColor(category)
                            
                            return (
                              <div key={category}>
                                <div className="flex items-center space-x-2 mb-3">
                                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${categoryColor} flex items-center justify-center`}>
                                    <CategoryIcon className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="font-semibold text-white capitalize">
                                    {category} Features
                                  </span>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-3 mb-6">
                                  {features.map((feature) => {
                                    const isSelected = selectedFeatures.includes(feature.id)
                                    const isRequired = feature.id === 'responsive-design' || feature.id === 'ssl-hosting'
                                    
                                    return (
                                      <motion.div
                                        key={feature.id}
                                        className={`relative glass rounded-lg p-4 border transition-all duration-300 cursor-pointer ${
                                          isSelected 
                                            ? 'border-purple-500 bg-purple-500/10' 
                                            : 'border-white/10 hover:border-white/30'
                                        } ${isRequired ? 'opacity-75' : ''}`}
                                        onClick={() => !isRequired && toggleFeature(feature.id)}
                                        whileHover={!isRequired ? { scale: 1.02 } : {}}
                                      >
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                              <h4 className="font-medium text-white">{feature.name}</h4>
                                              {feature.popular && (
                                                <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                                                  Popular
                                                </Badge>
                                              )}
                                              {isRequired && (
                                                <Badge className="text-xs bg-gradient-to-r from-green-400 to-emerald-400 text-black">
                                                  Included
                                                </Badge>
                                              )}
                                            </div>
                                            <p className="text-sm text-gray-400 mb-2">{feature.description}</p>
                                            <div className="text-lg font-semibold text-purple-400">
                                              {feature.basePrice === 0 ? 'Included' : `$${feature.basePrice}`}
                                            </div>
                                          </div>
                                          
                                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                            isSelected
                                              ? 'bg-purple-500 border-purple-500'
                                              : 'border-gray-400'
                                          }`}>
                                            {isSelected && <Check className="w-4 h-4 text-white" />}
                                          </div>
                                        </div>
                                      </motion.div>
                                    )
                                  })}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-6">
                      {/* Price Display */}
                      <div className="glass rounded-xl p-6 border border-white/10 sticky top-4">
                        <div className="text-center mb-6">
                          <div className="text-sm text-gray-400 mb-2">Estimated Investment</div>
                          <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                            ${finalPrice.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-400 mt-2">
                            Timeline: ~{estimatedWeeks} weeks
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Base Package</span>
                            <span className="text-white">${basePrice}</span>
                          </div>
                          
                          {pages[0] > 5 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Additional Pages ({pages[0] - 5})</span>
                              <span className="text-white">${(pages[0] - 5) * basePricePerPage}</span>
                            </div>
                          )}
                          
                          {getSelectedFeatures()
                            .filter(f => f.basePrice > 0)
                            .map(feature => (
                              <div key={feature.id} className="flex justify-between text-sm">
                                <span className="text-gray-400">{feature.name}</span>
                                <span className="text-white">${feature.basePrice}</span>
                              </div>
                            ))}
                          
                          {projectType !== 'standard' && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">{projectType.charAt(0).toUpperCase() + projectType.slice(1)} Upgrade</span>
                              <span className="text-purple-400">×{projectType === 'premium' ? '1.3' : '1.6'}</span>
                            </div>
                          )}

                          {timeline[0] <= 3 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Rush Timeline</span>
                              <span className="text-orange-400">+{timeline[0] <= 2 ? '50%' : '20%'}</span>
                            </div>
                          )}
                          
                          <div className="border-t border-white/10 pt-3">
                            <div className="flex justify-between font-semibold">
                              <span className="text-white">Total</span>
                              <span className="text-purple-400">${finalPrice.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Button 
                            className="w-full gradient-electric text-white font-semibold py-3"
                            onClick={() => {
                              // Handle quote request
                              window.location.href = `#/contact?quote=${encodeURIComponent(JSON.stringify({
                                pages: pages[0],
                                features: getSelectedFeatures().map(f => f.name),
                                type: projectType,
                                timeline: timeline[0],
                                estimatedPrice: finalPrice
                              }))}`
                              onClose()
                            }}
                          >
                            <DollarSign className="w-4 h-4 mr-2" />
                            Get Detailed Quote
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full glass border-white/20 text-white hover:bg-white/10"
                            onClick={() => {
                              // Schedule consultation
                              window.open('https://calendly.com/codeflow-consultation', '_blank')
                              onClose()
                            }}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Schedule Consultation
                          </Button>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/10">
                          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>Free consultation included</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Check className="w-4 h-4 text-green-400" />
                            <span>30-day money-back guarantee</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}