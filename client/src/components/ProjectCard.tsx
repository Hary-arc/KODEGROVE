'use client'

import { motion } from 'framer-motion'
import { Project, getStatusColor, getPriorityColor, formatCurrency, formatDate } from '../data/dashboard'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Avatar } from './ui/avatar'
import { ResponsiveCard, ResponsiveCardHeader, ResponsiveCardContent, ResponsiveCardFooter } from './ui/responsive-card'
import { 
  Calendar, 
  DollarSign, 
  Users, 
  AlertCircle,
  CheckCircle,
  Clock,
  Pause,
  Play,
  Target
} from 'lucide-react'
import React from 'react'

interface ProjectCardProps {
  project: Project
  index: number
}

const getStatusIcon = (status: string) => {
  const icons = {
    planning: Target,
    development: Play,
    testing: AlertCircle,
    deployment: Clock,
    completed: CheckCircle,
    'on-hold': Pause
  }
  return icons[status as keyof typeof icons] || Target
}

const getTypeColor = (type: string) => {
  const colors = {
    website: 'from-blue-500 to-cyan-500',
    mobile: 'from-green-500 to-emerald-500',
    ecommerce: 'from-purple-500 to-pink-500',
    saas: 'from-orange-500 to-red-500',
    consulting: 'from-indigo-500 to-purple-500'
  }
  return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-600'
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const StatusIcon = getStatusIcon(project.status)
  const progressColor = project.progress >= 75 ? 'bg-green-500' : project.progress >= 50 ? 'bg-yellow-500' : 'bg-blue-500'
  const isOverBudget = project.spent > project.budget * 0.9
  const daysRemaining = Math.ceil((new Date(project.expectedCompletion).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <ResponsiveCard
      variant="glass"
      size="md"
      hover={true}
      animation={true}
      index={index}
      className="group w-full max-w-full min-w-0"
    >
      {/* Header */}
      <ResponsiveCardHeader responsive={true}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r ${getTypeColor(project.type)} flex-shrink-0`}></div>
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 truncate">
              {project.name}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-row sm:flex-col items-start sm:items-end space-x-2 sm:space-x-0 sm:space-y-2 flex-shrink-0">
          <Badge variant="outline" className={`${getStatusColor(project.status)} border-current bg-current/10 text-xs`}>
            <StatusIcon className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
            <span className="hidden sm:inline">{project.status.replace('-', ' ')}</span>
            <span className="sm:hidden">{project.status.charAt(0).toUpperCase()}</span>
          </Badge>
          <Badge variant="outline" className={`${getPriorityColor(project.priority)} border-current bg-current/10 text-xs`}>
            <span className="hidden sm:inline">{project.priority}</span>
            <span className="sm:hidden">{project.priority.charAt(0)}</span>
          </Badge>
        </div>
      </ResponsiveCardHeader>

      <ResponsiveCardContent spacing="md">
        {/* Progress */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-gray-300">Progress</span>
            <span className="text-xs sm:text-sm font-bold text-white">{project.progress}%</span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-1.5 sm:h-2 rounded-full ${progressColor} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse-glow"></div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Details Grid - Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Budget */}
          <div className="space-y-1 min-w-0">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-400">Budget</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white truncate" title={formatCurrency(project.budget)}>
                {formatCurrency(project.budget)}
              </p>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-xs text-gray-400">Spent:</span>
                <span className={`text-xs font-medium truncate ${isOverBudget ? 'text-red-400' : 'text-green-400'}`}>
                  {formatCurrency(project.spent)}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-1 min-w-0">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-400">Deadline</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white truncate" title={formatDate(project.expectedCompletion)}>
                {formatDate(project.expectedCompletion)}
              </p>
              <p className={`text-xs truncate ${daysRemaining < 7 ? 'text-red-400' : daysRemaining < 30 ? 'text-yellow-400' : 'text-green-400'}`}>
                {daysRemaining > 0 ? `${daysRemaining} days left` : `${Math.abs(daysRemaining)} days overdue`}
              </p>
            </div>
          </div>
        </div>
      </ResponsiveCardContent>

      <ResponsiveCardFooter direction="responsive">
        {/* Team */}
        <div className="flex items-center space-x-2 min-w-0">
          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
          <span className="text-xs font-medium text-gray-400">Team</span>
        </div>
        
        <div className="flex -space-x-1 sm:-space-x-2 flex-shrink-0">
          {project.team.slice(0, 3).map((member, i) => (
            <div
              key={member}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white ring-1 sm:ring-2 ring-slate-900 hover:scale-110 transition-transform duration-200 flex-shrink-0"
              title={member}
            >
              {member.split(' ').map(n => n[0]).join('')}
            </div>
          ))}
          {project.team.length > 3 && (
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-300 ring-1 sm:ring-2 ring-slate-900 flex-shrink-0">
              +{project.team.length - 3}
            </div>
          )}
        </div>

        {/* Last Update - Hidden on small screens, shown on larger */}
        <div className="hidden sm:block w-full mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-gray-400">
            Last updated: <span className="text-gray-300">{formatDate(project.lastUpdate)}</span>
          </p>
        </div>
      </ResponsiveCardFooter>
    </ResponsiveCard>
  )
}