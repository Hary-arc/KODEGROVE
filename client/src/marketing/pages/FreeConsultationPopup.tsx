'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, Clock, Video, CheckCircle, User, Mail, Phone, MessageCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'

export function FreeConsultationPopup() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    details: '',
    preferredDate: '',
    preferredTime: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Consultation request:', formData)
    setIsSubmitting(false)
    setStep(3)
  }

  const projectTypes = [
    'Website Development',
    'Mobile App',
    'E-commerce Store',
    'Brand Identity',
    'Digital Marketing',
    'Custom Software',
    'Other'
  ]

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
  ]

  if (step === 3) {
    return (
      <div className="p-8">
        <motion.div
          className="text-center py-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Calendar className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="font-outfit text-3xl font-bold text-white mb-4">
            Consultation Booked! 🎉
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Your free consultation has been scheduled. We'll send you a calendar invite shortly.
          </p>

          <div className="glass border border-white/10 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-white mb-4 text-center">Consultation Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Name:</span>
                <span className="text-white font-medium">{formData.name}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Email:</span>
                <span className="text-white font-medium">{formData.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Date:</span>
                <span className="text-white font-medium">{formData.preferredDate}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-400">Time:</span>
                <span className="text-white font-medium">{formData.preferredTime}</span>
              </div>
            </div>
          </div>

          <div className="glass border border-white/10 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold text-white mb-4">What to Prepare:</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">
                  Brief overview of your project goals and objectives
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">
                  Examples of websites/apps you like (if available)
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">
                  Any specific features or requirements you have in mind
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">
                  Questions about our process or previous work
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => window.open('https://meet.google.com', '_blank')}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white"
            >
              <Video className="w-5 h-5 mr-2" />
              Add to Calendar
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
              onClick={() => setStep(1)}
            >
              Book Another
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className={`flex items-center ${step >= 1 ? 'text-cyan-400' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-cyan-400 bg-cyan-400/20' : 'border-gray-500'}`}>
                {step > 1 ? <CheckCircle className="w-6 h-6" /> : '1'}
              </div>
              <span className="ml-2 hidden sm:inline">Your Info</span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-cyan-400' : 'bg-gray-600'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-cyan-400' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-cyan-400 bg-cyan-400/20' : 'border-gray-500'}`}>
                {step > 2 ? <CheckCircle className="w-6 h-6" /> : '2'}
              </div>
              <span className="ml-2 hidden sm:inline">Schedule</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-8">
              <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 mb-6 border border-white/20">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-200">Free 30-Minute Call</span>
              </div>

              <h2 className="font-outfit text-3xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Book Your Free
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Consultation
                </span>
              </h2>

              <p className="text-gray-300 mb-8 leading-relaxed">
                Schedule a complimentary 30-minute strategy session with our experts to discuss your project.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Video Call</h4>
                    <p className="text-sm text-gray-400">
                      Face-to-face meeting via Zoom or Google Meet
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">30 Minutes</h4>
                    <p className="text-sm text-gray-400">
                      Focused discussion on your project needs
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Expert Advice</h4>
                    <p className="text-sm text-gray-400">
                      Get professional recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass border border-white/10 rounded-2xl p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-outfit text-2xl font-bold text-white mb-2">
                      Tell Us About Yourself
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Help us understand your needs better
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Full Name *</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Email *</label>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Phone</label>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Company</label>
                      <Input
                        type="text"
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Project Type *</label>
                    <select
                      aria-label="Select project type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:border-cyan-500/50 focus:outline-none"
                      required
                    >
                      <option value="" className="bg-slate-900">Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-slate-900">{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Project Details</label>
                    <Textarea
                      placeholder="Tell us about your project, goals, and challenges..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl"
                  >
                    Continue to Schedule
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-outfit text-2xl font-bold text-white mb-2">
                      Choose Your Time
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Select your preferred date and time
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Preferred Date *</label>
                    <Input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="bg-white/5 border-white/10 text-white focus:border-cyan-500/50 rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Preferred Time *</label>
                    <select
                      aria-label="Select time slot"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:border-cyan-500/50 focus:outline-none"
                      required
                    >
                      <option value="" className="bg-slate-900">Select time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-slate-900">{slot}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400 mt-2">All times in PST timezone</p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Booking...
                        </span>
                      ) : (
                        'Confirm Booking'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
