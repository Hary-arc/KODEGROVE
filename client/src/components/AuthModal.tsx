'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail,
  LogIn,
  UserPlus,
  Shield,
  Zap
} from 'lucide-react'

interface AuthModalProps {
  children: React.ReactNode
  onLogin?: (email: string, password: string) => void
  onSignup?: (name: string, email: string, password: string) => void
}

export function AuthModal({ children, onLogin, onSignup }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password }

      const response = await fetch(`http://localhost:5001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (data.success) {
        // Store token in localStorage
        if (data.token) {
          localStorage.setItem('auth-token', data.token)
          localStorage.setItem('user-data', JSON.stringify(data.user))
        }
        
        if (isLogin) {
          onLogin?.(formData.email, formData.password)
        } else {
          onSignup?.(formData.name, formData.email, formData.password)
        }

        setIsOpen(false)
        window.location.hash = '/dashboard'
      } else {
        console.error('Auth error:', data.message)
        alert(data.message || 'Authentication failed')
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-slate-900/95 backdrop-blur-sm border border-white/10">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isLogin 
              ? 'Sign in to access your client dashboard' 
              : 'Join CodeFlow for premium digital solutions'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {!isLogin && (
                <div className="form-field">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-300 mb-2 block">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="form-field">
                <Label htmlFor="email" className="text-sm font-medium text-gray-300 mb-2 block">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <Label htmlFor="password" className="text-sm font-medium text-gray-300 mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Please wait...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              </div>
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </form>

        {!isLogin && (
          <div className="mt-6 p-4 glass rounded-lg border border-purple-500/30">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-5 h-5 text-purple-400" />
              <h4 className="font-medium text-white">Premium Benefits</h4>
            </div>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Priority project support & faster response times</li>
              <li>• Dedicated project manager & team</li>
              <li>• Advanced analytics & detailed reporting</li>
              <li>• Exclusive access to beta features</li>
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}