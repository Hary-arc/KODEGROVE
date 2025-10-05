'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notification } from '../data/dashboard';
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  X,
  Eye,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface DashboardNotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
  onActionClick: (notification: Notification) => void;
}

const getNotificationIcon = (type: string) => {
  const icons = {
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle,
    info: Info,
  };
  return icons[type as keyof typeof icons] || Info;
};

const getNotificationColor = (type: string) => {
  const colors = {
    success: 'text-green-400 bg-green-500/10 border-green-500/20',
    warning: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    error: 'text-red-400 bg-red-500/10 border-red-500/20',
    info: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  };
  return colors[type as keyof typeof colors] || colors.info;
};

const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return time.toLocaleDateString();
};

export function DashboardNotifications({
  notifications,
  onMarkAsRead,
  onDismiss,
  onActionClick,
}: DashboardNotificationsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const displayNotifications = isExpanded ? notifications : notifications.slice(0, 3);

  return (
    <div className="glass rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Bell className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <Badge
              variant="outline"
              className="bg-purple-500/20 text-purple-300 border-purple-500/30"
            >
              {unreadCount} new
            </Badge>
          )}
        </div>

        {notifications.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-400 hover:text-white"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show All ({notifications.length})
              </>
            )}
          </Button>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {displayNotifications.length > 0 ? (
          <div className="space-y-3">
            {displayNotifications.map((notification, index) => {
              const IconComponent = getNotificationIcon(notification.type);
              const colorClasses = getNotificationColor(notification.type);

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`relative p-4 rounded-xl border transition-all duration-200 hover:border-white/20 ${
                    notification.read
                      ? 'bg-white/5 border-white/10'
                      : `${colorClasses} border-current`
                  }`}
                >
                  {!notification.read && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full"></div>
                  )}

                  <div className="flex items-start space-x-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                        notification.read ? 'bg-white/10' : 'bg-current/20'
                      }`}
                    >
                      <IconComponent
                        className={`w-4 h-4 ${
                          notification.read ? 'text-gray-400' : 'text-current'
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4
                          className={`text-sm font-medium line-clamp-1 ${
                            notification.read ? 'text-gray-300' : 'text-white'
                          }`}
                        >
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                      </div>

                      <p
                        className={`text-sm line-clamp-2 mb-2 ${
                          notification.read ? 'text-gray-400' : 'text-gray-300'
                        }`}
                      >
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onMarkAsRead(notification.id)}
                              className="h-6 px-2 text-xs text-purple-400 hover:text-white hover:bg-purple-500/20"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Mark as read
                            </Button>
                          )}

                          {notification.action && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onActionClick(notification)}
                              className="h-6 px-2 text-xs text-blue-400 hover:text-white hover:bg-blue-500/20"
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDismiss(notification.id)}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-red-500/20"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-500/20 flex items-center justify-center mx-auto mb-3">
              <Bell className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm">No notifications yet</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
