// Centralized data exports

export * from './site-config'
export * from './services'
export * from './portfolio'
export * from './team'
export * from './testimonials'
export * from './content'
export * from './blog'
export * from './careers'
export * from './pricing'
//export * from './dashboard'

// Data utility functions
export const getIconComponent = (iconName: string) => {
  // This would normally map icon names to actual components
  // For now, we'll return the icon name for dynamic imports
  return iconName
}

export const formatMetric = (value: number, suffix: string = '') => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M${suffix}`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K${suffix}`
  }
  return `${value}${suffix}`
}

export const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}