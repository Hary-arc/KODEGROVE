'use client'

import { motion } from 'motion/react'
import { ClientStats, formatCurrency } from '../data/dashboard'
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  DollarSign, 
  Clock, 
  Star,
  Target,
  Award
} from 'lucide-react'

interface DashboardStatsProps {
  stats: ClientStats
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems = [
    {
      label: 'Total Projects',
      value: stats.totalProjects,
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      suffix: ''
    },
    {
      label: 'Active Projects',
      value: stats.activeProjects,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      suffix: ''
    },
    {
      label: 'Completed',
      value: stats.completedProjects,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      suffix: ''
    },
    {
      label: 'Total Investment',
      value: stats.totalInvestment,
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      suffix: '',
      format: formatCurrency
    },
    {
      label: 'On-Time Delivery',
      value: stats.onTimeDelivery,
      icon: TrendingUp,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-500/10',
      suffix: '%'
    },
    {
      label: 'Satisfaction Score',
      value: stats.satisfactionScore,
      icon: Star,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-500/10',
      suffix: '/5'
    },
    {
      label: 'Avg Duration',
      value: stats.avgProjectDuration,
      icon: Calendar,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500/10',
      suffix: ' months'
    },
    {
      label: 'Premium Tier',
      value: 'Active',
      icon: Award,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-500/10',
      suffix: '',
      isText: true
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => {
        const IconComponent = item.icon
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 rounded-2xl`}></div>
              
              {/* Icon */}
              <div className={`${item.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className={`w-6 h-6 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-sm font-medium text-gray-400 mb-2">{item.label}</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-white">
                    {item.isText 
                      ? item.value 
                      : item.format 
                        ? item.format(Number(item.value))
                        : item.value
                    }
                    <span className="text-lg font-medium text-gray-300">{item.suffix}</span>
                  </span>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}