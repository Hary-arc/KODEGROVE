
'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Download, 
  FileText, 
  Calculator,
  Sparkles,
  Check,
  Mail,
  Phone,
  Building,
  Globe,
  User,
  Calendar,
  DollarSign,
  Clock,
  Target
} from 'lucide-react'

interface QuotationFormData {
  projectName: string
  clientName: string
  company: string
  email: string
  phone: string
  website: string
  projectType: string
  budget: string
  timeline: string
  description: string
  features: string[]
}

const projectTypes = [
  { id: 'website', name: 'Website Development', basePrice: 5000 },
  { id: 'mobile', name: 'Mobile App', basePrice: 15000 },
  { id: 'ecommerce', name: 'E-commerce Platform', basePrice: 10000 },
  { id: 'saas', name: 'SaaS Application', basePrice: 25000 },
  { id: 'custom', name: 'Custom Software', basePrice: 20000 }
]

const features = [
  { id: 'responsive', name: 'Responsive Design', price: 0 },
  { id: 'cms', name: 'Content Management System', price: 2000 },
  { id: 'ecommerce', name: 'E-commerce Integration', price: 3000 },
  { id: 'api', name: 'API Development', price: 2500 },
  { id: 'authentication', name: 'User Authentication', price: 1500 },
  { id: 'analytics', name: 'Analytics Integration', price: 1000 },
  { id: 'seo', name: 'SEO Optimization', price: 1500 },
  { id: 'performance', name: 'Performance Optimization', price: 2000 },
  { id: 'security', name: 'Security Implementation', price: 2500 },
  { id: 'maintenance', name: '6 Month Maintenance', price: 3000 }
]

const budgetRanges = [
  { id: 'small', name: 'Under $10,000', multiplier: 0.8 },
  { id: 'medium', name: '$10,000 - $50,000', multiplier: 1.0 },
  { id: 'large', name: '$50,000 - $100,000', multiplier: 1.2 },
  { id: 'enterprise', name: 'Over $100,000', multiplier: 1.5 }
]

export function QuotationPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formData, setFormData] = useState<QuotationFormData>({
    projectName: '',
    clientName: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    features: []
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [quotationGenerated, setQuotationGenerated] = useState(false)

  const handleInputChange = (field: keyof QuotationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }))
  }

  const calculateEstimate = () => {
    const selectedProjectType = projectTypes.find(p => p.id === formData.projectType)
    if (!selectedProjectType) return 0

    const basePrice = selectedProjectType.basePrice
    const featuresPrice = formData.features.reduce((total, featureId) => {
      const feature = features.find(f => f.id === featureId)
      return total + (feature ? feature.price : 0)
    }, 0)

    const budgetRange = budgetRanges.find(b => b.id === formData.budget)
    const multiplier = budgetRange ? budgetRange.multiplier : 1

    return Math.round((basePrice + featuresPrice) * multiplier)
  }

  const generateQuotation = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setQuotationGenerated(true)
  }

  const downloadQuotation = () => {
    const estimate = calculateEstimate()
    const selectedProjectType = projectTypes.find(p => p.id === formData.projectType)
    const selectedFeatures = features.filter(f => formData.features.includes(f.id))

    const quotationData = {
      projectName: formData.projectName,
      clientName: formData.clientName,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      projectType: selectedProjectType?.name,
      budget: budgetRanges.find(b => b.id === formData.budget)?.name,
      timeline: formData.timeline,
      description: formData.description,
      features: selectedFeatures.map(f => f.name),
      estimatedCost: estimate,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toDateString()
    }

    const content = `
CODEFLOW - PROJECT QUOTATION
============================

Project Details:
----------------
Project Name: ${quotationData.projectName}
Client: ${quotationData.clientName}
Company: ${quotationData.company}
Email: ${quotationData.email}
Phone: ${quotationData.phone}

Project Requirements:
--------------------
Type: ${quotationData.projectType}
Budget Range: ${quotationData.budget}
Timeline: ${quotationData.timeline}
Description: ${quotationData.description}

Selected Features:
------------------
${quotationData.features.map(f => `• ${f}`).join('\n')}

Estimated Cost: $${quotationData.estimatedCost.toLocaleString()}
Valid Until: ${quotationData.validUntil}

Note: This is a preliminary estimate. Final pricing may vary based on detailed requirements analysis.

Contact us at hello@codeflow.dev for more information.
    `

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `CodeFlow-Quotation-${formData.projectName.replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const estimate = calculateEstimate()

  return (
    <div className="min-h-screen bg-slate-950 text-white" ref={ref}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_50%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Badge className="gradient-electric text-white border-0 mb-6">
              <Calculator className="w-4 h-4 mr-2" />
              Project Quotation
            </Badge>
            
            <h1 className="font-outfit text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Get Your Project
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Quotation
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Fill out the form below to receive a detailed quotation for your project. 
              Get instant estimates and download your personalized quotation.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="glass border border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-purple-400" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectName" className="text-gray-300">Project Name</Label>
                    <Input
                      id="projectName"
                      placeholder="Enter project name"
                      value={formData.projectName}
                      onChange={(e) => handleInputChange('projectName', e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientName" className="text-gray-300">Your Name</Label>
                    <Input
                      id="clientName"
                      placeholder="Enter your full name"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company" className="text-gray-300">Company</Label>
                    <Input
                      id="company"
                      placeholder="Enter company name"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <Label className="text-gray-300 mb-3 block">Project Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {projectTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => handleInputChange('projectType', type.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          formData.projectType === type.id
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <div className="text-white font-medium">{type.name}</div>
                        <div className="text-gray-400 text-sm">Starting from ${type.basePrice.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <Label className="text-gray-300 mb-3 block">Additional Features</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {features.map((feature) => (
                      <div
                        key={feature.id}
                        onClick={() => handleFeatureToggle(feature.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                          formData.features.includes(feature.id)
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <div>
                          <div className="text-white text-sm font-medium">{feature.name}</div>
                          {feature.price > 0 && (
                            <div className="text-gray-400 text-xs">+${feature.price.toLocaleString()}</div>
                          )}
                        </div>
                        {formData.features.includes(feature.id) && (
                          <Check className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 mb-3 block">Budget Range</Label>
                    <div className="space-y-2">
                      {budgetRanges.map((budget) => (
                        <div
                          key={budget.id}
                          onClick={() => handleInputChange('budget', budget.id)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            formData.budget === budget.id
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-white/10 bg-white/5 hover:border-white/30'
                          }`}
                        >
                          <div className="text-white text-sm">{budget.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="timeline" className="text-gray-300">Timeline</Label>
                    <Input
                      id="timeline"
                      placeholder="e.g., 3 months"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-gray-300">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project requirements..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estimate Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="glass border border-white/10 mb-6">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                    Estimated Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      ${estimate.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm mb-6">
                      Preliminary estimate
                    </div>
                    
                    {!quotationGenerated ? (
                      <Button
                        onClick={generateQuotation}
                        disabled={!formData.projectName || !formData.clientName || !formData.email || !formData.projectType || isGenerating}
                        className="w-full gradient-electric text-white"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Calculator className="w-4 h-4 mr-2" />
                            Generate Quotation
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        onClick={downloadQuotation}
                        className="w-full gradient-electric text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Quotation
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {quotationGenerated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-xl p-6 border border-white/10"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Quotation Ready!</h3>
                    <p className="text-gray-400 text-sm">
                      Your personalized quotation has been generated and is ready for download.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
