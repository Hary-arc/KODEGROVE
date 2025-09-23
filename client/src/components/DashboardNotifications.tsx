'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Notification } from '../data/dashboard'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  XCircle,
  X,
  ExternalLink,
  Clock
} from 'lucide-react'
import React from 'react'
interface DashboardNotificationsProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
  onActionClick: (notification: Notification) => void
}

const getNotificationIcon = (type: string) => {
  const icons = {
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle,
    info: Info
  }
  return icons[type as keyof typeof icons] || Info
}

const getNotificationColor = (type: string) => {
  const colors = {
    success: 'text-green-400 bg-green-500/10 border-green-500/20',
    warning: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    error: 'text-red-400 bg-red-500/10 border-red-500/20',
    info: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
  }
  return colors[type as keyof typeof colors] || colors.info
}

const formatTimeAgo = (timestamp: string): string => {
  const now = new Date()
  const time = new Date(timestamp)
  const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  return time.toLocaleDateString()
}

export function DashboardNotifications({ 
  notifications, 
  onMarkAsRead, 
  onDismiss,
  onActionClick 
}: DashboardNotificationsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const unreadCount = notifications.filter(n => !n.read).length
  const displayNotifications = isExpanded ? notifications : notifications.slice(0, 3)

  return (
    <div className="glass rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-purple-400" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{unreadCount}</span>
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold text-white">Notifications</h3>
          </div>
          
          {notifications.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-purple-400 hover:text-white hover:bg-purple-500/20"
            >
              {isExpanded ? 'Show Less' : `View All (${notifications.length})`}
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {displayNotifications.map((notification, index) => {
            const IconComponent = getNotificationIcon(notification.type)
            const colorClasses = getNotificationColor(notification.type)
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative border-b border-white/5 hover:bg-white/5 transition-all duration-200 ${
                  !notification.read ? 'bg-white/2' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`font-medium ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                          {notification.title}
                        </h4>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onMarkAsRead(notification.id)}
                              className="text-xs text-purple-400 hover:text-white hover:bg-purple-500/20 p-1 h-auto"
                            >
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDismiss(notification.id)}
                            className="text-xs text-gray-400 hover:text-red-400 hover:bg-red-500/20 p-1 h-auto"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-3 leading-relaxed">
                        {notification.message}
                      </p>
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(notification.timestamp)}</span>
                        </div>
                        
                        {notification.action && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onActionClick(notification)}
                            className="text-xs text-purple-400 hover:text-white hover:bg-purple-500/20 px-3 py-1 h-auto"
                          >
                            {notification.action.label}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="p-12 text-center">
          <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-400 mb-2">No notifications</h4>
          <p className="text-sm text-gray-500">You're all caught up!</p>
        </div>
      )}
    </div>
  )
}