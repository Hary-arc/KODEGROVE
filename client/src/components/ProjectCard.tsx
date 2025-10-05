'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Project,
  getStatusColor,
  getPriorityColor,
  formatCurrency,
  formatDate,
} from '../data/dashboard';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  ResponsiveCard,
  ResponsiveCardHeader,
  ResponsiveCardContent,
  ResponsiveCardFooter,
} from './ui/responsive-card';
import {
  Calendar,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  Pause,
  Play,
  Target,
  ExternalLink,
} from 'lucide-react';
import { Button } from './ui/button';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const getStatusIcon = (status: string) => {
  const icons = {
    planning: Target,
    development: Play,
    testing: AlertCircle,
    deployment: CheckCircle,
    completed: CheckCircle,
    'on-hold': Pause,
  };
  return icons[status as keyof typeof icons] || Clock;
};

const getTypeIcon = (type: string) => {
  const icons = {
    website: '🌐',
    mobile: '📱',
    ecommerce: '🛒',
    saas: '💼',
    consulting: '💡',
  };
  return icons[type as keyof typeof icons] || '💼';
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const StatusIcon = getStatusIcon(project.status);
  const statusColor = getStatusColor(project.status);
  const priorityColor = getPriorityColor(project.priority);
  const typeIcon = getTypeIcon(project.type);

  // Ensure team is always an array
  const team = Array.isArray(project.team) ? project.team : [];

  const progressPercentage = Math.min(100, Math.max(0, project.progress));
  const budgetUsed = (project.spent / project.budget) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <ResponsiveCard variant="glass" size="lg" hover={true} className="group overflow-hidden">
        <ResponsiveCardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                {typeIcon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-400 capitalize">
                  {project.type.replace('-', ' ')} Project
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className={`${priorityColor} border-current bg-current/10 text-xs`}
              >
                {project.priority}
              </Badge>
              <Badge variant="outline" className={`${statusColor} border-current bg-current/10`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {project.status.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </ResponsiveCardHeader>

        <ResponsiveCardContent>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

          {/* Progress Section */}
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Progress</span>
                <span className="text-sm font-semibold text-white">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Budget Used</span>
                <span className="text-sm font-semibold text-white">{budgetUsed.toFixed(1)}%</span>
              </div>
              <Progress value={budgetUsed} className="h-2" />
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-xs text-gray-400">Due Date</p>
                <p className="text-sm font-medium text-white">
                  {formatDate(project.expectedCompletion)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">Budget</p>
                <p className="text-sm font-medium text-white">{formatCurrency(project.budget)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Team Size</p>
                <p className="text-sm font-medium text-white">{team.length} members</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <div>
                <p className="text-xs text-gray-400">Last Update</p>
                <p className="text-sm font-medium text-white">{formatDate(project.lastUpdate)}</p>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2">Team Members</p>
            <div className="flex items-center space-x-2">
              {team.length > 0 ? (
                <>
                  {team.slice(0, 3).map((member, idx) => {
                    // Ensure member is a string
                    const memberName = typeof member === 'string' ? member : 'Unknown';
                    return (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-medium"
                        title={memberName}
                      >
                        {memberName
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </div>
                    );
                  })}
                  {team.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs">
                      +{team.length - 3}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs">
                  TBD
                </div>
              )}
            </div>
          </div>

          {/* Budget Breakdown */}
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Spent</p>
                <p className="text-sm font-semibold text-white">{formatCurrency(project.spent)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Remaining</p>
                <p className="text-sm font-semibold text-green-400">
                  {formatCurrency(project.budget - project.spent)}
                </p>
              </div>
            </div>
          </div>
        </ResponsiveCardContent>

        <ResponsiveCardFooter>
          <div className="flex items-center justify-between w-full">
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-400 hover:text-white hover:bg-purple-500/20"
            >
              View Details
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>

            <div className="flex items-center space-x-2">
              {project.status === 'on-hold' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-400 hover:text-white hover:bg-green-500/20"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Resume
                </Button>
              )}

              {project.status === 'development' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-white hover:bg-blue-500/20"
                >
                  <Target className="w-4 h-4 mr-1" />
                  Update
                </Button>
              )}
            </div>
          </div>
        </ResponsiveCardFooter>
      </ResponsiveCard>
    </motion.div>
  );
}
