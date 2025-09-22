'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  mockUser, 
  mockProjects, 
  mockInvoices, 
  mockSupportTickets, 
  mockNotifications,
  mockStats,
  formatCurrency,
  formatDate,
  getStatusColor,
  type Notification
} from '../data/dashboard'
import { DashboardStats } from '../components/DashboardStats'
import { ProjectCard } from '../components/ProjectCard'
import { DashboardNotifications } from '../components/DashboardNotifications'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { 
  User, 
  Settings, 
  LogOut, 
  Download,
  CreditCard,
  MessageCircle,
  TrendingUp,
  Calendar,
  FileText,
  Zap,
  Shield,
  Crown,
  ExternalLink
} from 'lucide-react'
import { authUtils } from '../utils/auth'

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState(mockUser)
  const [projects] = useState(mockProjects)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [invoices] = useState(mockInvoices)
  const [tickets] = useState(mockSupportTickets)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Check if user is authenticated
    if (!authUtils.isAuthenticated()) {
      window.location.hash = '/'
      return
    }

    // Get user data from localStorage
    const userData = authUtils.getUser()
    if (userData) {
      setUser({
        ...mockUser,
        name: userData.name,
        email: userData.email,
        id: userData.id,
        role: userData.role || 'Premium',
        tier: 'Premium',
        avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=8b5cf6&color=fff`,
        createdAt: userData.createdAt || new Date().toISOString()
      })
    }
  }, [])


  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const handleActionClick = (notification: Notification) => {
    if (notification.action?.url) {
      // In a real app, this would navigate to the URL
      console.log('Navigating to:', notification.action.url)
    }
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const activeProjects = mockProjects.filter(p => p.status !== 'completed')
  const recentInvoices = mockInvoices.slice(0, 3)
  const openTickets = mockSupportTickets.filter(t => t.status !== 'closed')

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Header */}
      <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-lg font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {getGreeting()}, {user.name.split(' ')[0]}! 
                </h1>
                <p className="text-sm text-gray-400">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} • Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 glass rounded-lg border border-white/10">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">{user.tier}</span>
              </div>

              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>

              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
                onClick={() => {
                  authUtils.logout()
                  window.dispatchEvent(new Event('auth-changed'))
                }}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 mt-6">
        {/* Stats Overview */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
            <p className="text-gray-400">Track your projects, billing, and account metrics</p>
          </div>
          <DashboardStats stats={mockStats} />
        </motion.section>

        {/* Next Milestone Alert */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="glass rounded-2xl p-6 border border-purple-500/30 bg-purple-500/5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">Upcoming Milestone</h3>
                <p className="text-purple-300">{mockStats.nextMilestone}</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Calendar className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Projects & Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Projects */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Active Projects</h2>
                <Button variant="ghost" className="text-purple-400 hover:text-white">
                  View All <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="grid gap-6">
                {activeProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </motion.section>

            {/* Quick Actions */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Button 
                  className="h-20 glass border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 flex-col"
                  variant="ghost"
                >
                  <MessageCircle className="w-6 h-6 mb-2 text-purple-400" />
                  <span>Contact Support</span>
                </Button>

                <Button 
                  className="h-20 glass border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 flex-col"
                  variant="ghost"
                >
                  <Download className="w-6 h-6 mb-2 text-green-400" />
                  <span>Download Reports</span>
                </Button>

                <Button 
                  className="h-20 glass border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 flex-col"
                  variant="ghost"
                >
                  <CreditCard className="w-6 h-6 mb-2 text-blue-400" />
                  <span>View Billing</span>
                </Button>
              </div>
            </motion.section>
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="space-y-8">
            {/* Notifications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <DashboardNotifications
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onDismiss={handleDismissNotification}
                onActionClick={handleActionClick}
              />
            </motion.section>

            {/* Recent Invoices */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="glass rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Recent Invoices</h3>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-white">
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {recentInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors duration-200">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {formatCurrency(invoice.amount)}
                        </p>
                        <p className="text-xs text-gray-400">
                          Due: {formatDate(invoice.dueDate)}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(invoice.status)} border-current bg-current/10`}
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Support Tickets */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="glass rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Support Tickets</h3>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-white">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {openTickets.map((ticket) => (
                    <div key={ticket.id} className="p-3 rounded-lg hover:bg-white/5 transition-colors duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-white line-clamp-1">
                          {ticket.title}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(ticket.status)} border-current bg-current/10 text-xs`}
                        >
                          {ticket.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{ticket.category}</span>
                        <span>{ticket.messages} messages</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Account Health */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="glass rounded-2xl border border-white/10 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Account Health</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Project Success Rate</span>
                      <span className="text-sm font-semibold text-green-400">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Payment Status</span>
                      <span className="text-sm font-semibold text-green-400">Excellent</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Response Time</span>
                      <span className="text-sm font-semibold text-yellow-400">&lt; 2 hours</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  )
}