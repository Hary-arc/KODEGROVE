
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { 
  Settings, 
  LogOut, 
  Crown,
  User as UserIcon
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { authUtils } from '../../utils/auth'

interface DashboardLayoutProps {
  children: React.ReactNode
  user?: {
    name: string
    email: string
    avatar?: string
    tier: string
    createdAt: string
  }
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <UserIcon className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">Loading user data...</p>
        </div>
      </div>
    )
  }

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
                  {new Date().toLocaleDateString('en-US', { 
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 mt-6">
        {children}
      </main>
    </div>
  )
}
