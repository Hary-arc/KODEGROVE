
'use client'

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  FileText,
  Sparkles, 
  User, 
  Menu, 
  X, 
  LogOut, 
  Settings, 
  BarChart3, 
  ChevronDown, 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Database, 
  Palette, 
  Code, 
  ArrowRight 
} from 'lucide-react'

import { Button } from './ui/button'
import { useCurrentRoute, navigateTo } from './Router'
import { AuthModal } from './AuthModal'
import { authUtils } from '../utils/auth'

// Types
interface NavigationItem {
  name: string
  path: string
}

interface ServiceItem extends NavigationItem {
  icon: React.ComponentType<{ className?: string }>
  description: string
}

interface User {
  id: string
  name: string
  email: string
  role?: string
}

// Constants
const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Blogs", path: "/blog" },
] as const

const SERVICE_ITEMS: ServiceItem[] = [
  { 
    name: "Web Development", 
    path: "/services#web-design", 
    icon: Globe, 
    description: "Custom websites & web apps" 
  },
  { 
    name: "Mobile Apps", 
    path: "/services#mobile-development", 
    icon: Smartphone, 
    description: "iOS & Android applications" 
  },
  { 
    name: "E-Commerce", 
    path: "/services#ecommerce", 
    icon: ShoppingCart, 
    description: "Online stores & marketplaces" 
  },
  { 
    name: "Backend Systems", 
    path: "/services#backend", 
    icon: Database, 
    description: "APIs & cloud infrastructure" 
  },
  { 
    name: "UI/UX Design", 
    path: "/services#design", 
    icon: Palette, 
    description: "User interface & experience" 
  },
  { 
    name: "Custom Software", 
    path: "/services#development", 
    icon: Code, 
    description: "Tailored software solutions" 
  },
] as const

// Animation variants
const navigationVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

const dropdownVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9, 
    y: -20,
    rotateX: -15
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    rotateX: 0,
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.05
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: -20,
    rotateX: -15,
    transition: { duration: 0.2 }
  }
}

// Custom hooks
const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const updateAuthState = () => {
      if (authUtils.isAuthenticated()) {
        const userData = authUtils.getUser()
        setUser(userData)
      } else {
        setUser(null)
      }
    }

    updateAuthState()
    window.addEventListener('auth-changed', updateAuthState)
    
    return () => window.removeEventListener('auth-changed', updateAuthState)
  }, [])

  const handleLogout = useCallback(() => {
    authUtils.logout()
    setUser(null)
    window.dispatchEvent(new Event('auth-changed'))
    window.location.reload()
  }, [])

  return { user, handleLogout }
}

const useScrollBehavior = () => {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.03, 0.1])
  const backdropBlur = useTransform(scrollY, [0, 100], [4, 20])

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setScrolled(latest > 50)
    })
    return unsubscribe
  }, [scrollY])


  return { scrolled, backgroundOpacity, backdropBlur }
}

// Components
const Logo = memo(() => (
  <motion.button
    onClick={() => navigateTo("/")}
    className="flex items-center space-x-3 group focus:outline-none"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label="Go to homepage"
  >
    <motion.div 
      className="absolute inset-1 z-0 w-12 h-12 relative overflow-hidden rounded-full"
      whileHover={{ 
        rotate: [0, 5, -5, 0],
        scale: 1.1
      }}
      transition={{ 
        rotate: { duration: 0.6, ease: "easeInOut" },
        scale: { duration: 0.3 }
      }}
    >
      <img 
        src="/logo.png" 
        alt="KodeGrove Logo" 
        className="relative z-10 w-full h-full object-cover rounded-full shadow-xl shadow-blue-500/40 ring-2 ring-blue-300/20"
        loading="eager"
      />
      <motion.div 
        className="absolute inset-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
    <motion.span
  className="font-outfit text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-transparent"
  whileHover={{
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  }}
  transition={{ duration: 2 }}
>
  KODEGROVE
</motion.span>

  </motion.button>
))

Logo.displayName = 'Logo'

interface NavigationLinkProps {
  item: NavigationItem
  isActive: boolean
  onClick: (path: string) => void
}

const NavigationLink = memo<NavigationLinkProps>(({ item, isActive, onClick }) => (
  <motion.button
    onClick={() => onClick(item.path)}
    className={`relative text-sm font-medium transition-colors duration-300 focus:outline-none ${
      isActive ? "text-white" : "text-gray-300 hover:text-white"
    }`}
    whileHover={{ y: -1 }}
  >
    {item.name}
    {isActive && (
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 gradient-electric rounded-full"
        layoutId="activeTab"
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />
    )}
  </motion.button>
))

NavigationLink.displayName = 'NavigationLink'

interface ServicesDropdownProps {
  isOpen: boolean
  onToggle: () => void
  currentRoute: string
  onNavigate: (path: string) => void
}


const ServicesDropdown = memo<ServicesDropdownProps>(({ 
  isOpen, 
  onToggle, 
  currentRoute, 
  onNavigate 
}) => (
  <div className="relative services-dropdown">
    <motion.button
      onClick={onToggle}
      className={`relative flex items-center space-x-1 text-sm font-medium transition-colors duration-300 focus:outline-none ${
        currentRoute === "/services"
          ? "text-white"
          : "text-gray-300 hover:text-white"
      }`}
      whileHover={{ y: -1 }}
    >
      <span>Services</span>
      <ChevronDown 
        className={`w-4 h-4 transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`} 
      />
      {currentRoute === "/services" && (
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 gradient-electric rounded-full"
          layoutId="activeTab"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      )}
    </motion.button>

          {/* Dropdown Menu */}
   <AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-3 w-64 rounded-xl z-50 p-2 shadow-lg border border-white/10 backdrop-blur-md bg-slate-800/60"
      style={{
        background: 'linear-gradient(135deg, rgba(30,41,59,0.5), rgba(15,23,42,0.4))',
        backdropFilter: 'blur(20px)',
      }}
    >
      {SERVICE_ITEMS.map((service) => (
        <motion.button
          key={service.path}
          onClick={() => onNavigate(service.path)}
          className="flex items-start space-x-3 w-full p-2 rounded-md hover:bg-white/5 transition-colors duration-200 text-left"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Icon */}
          <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-md">
            <service.icon className="w-4 h-4 text-cyan-300" />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h4 className="text-sm font-medium text-white">{service.name}</h4>
            <p className="text-xs text-gray-300">{service.description}</p>
          </div>
        </motion.button>
      ))}

      {/* Optional CTA */}
      <div className="mt-2 pt-2 border-t border-white/10">
        <button
          onClick={() => onNavigate("/services")}
          className="w-full text-sm text-cyan-400 hover:text-white py-2 transition-colors"
        >
          View All Services →
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>


  </div>
))

ServicesDropdown.displayName = 'ServicesDropdown'

interface UserMenuProps {
  user: User
  isOpen: boolean
  onToggle: () => void
  onLogout: () => void
  isMobile?: boolean
}

const UserMenu = memo<UserMenuProps>(({ 
  user, 
  isOpen, 
  onToggle, 
  onLogout, 
  isMobile = false 
}) => (
  <div className="relative">
    <Button
      onClick={onToggle}
      size={isMobile ? "sm" : "default"}
      className={`flex items-center ${isMobile ? 'px-3 py-2' : 'px-4 py-2'} rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 ${isMobile ? 'text-xs' : ''}`}
    >
      <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center ${isMobile ? 'mr-1' : 'mr-2'}`}>
        <span className={`text-white ${isMobile ? 'text-xs' : 'text-sm'} font-bold`}>
          {user.name.charAt(0).toUpperCase()}
        </span>
      </div>
      {!isMobile && <span className="hidden sm:block">{user.name.split(' ')[0]}</span>}
      {isOpen ? (
        <X className={`${isMobile ? 'w-3 h-3 ml-1' : 'w-4 h-4 ml-2'}`} />
      ) : (
        <Menu className={`${isMobile ? 'w-3 h-3 ml-1' : 'w-4 h-4 ml-2'}`} />
      )}
    </Button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`absolute right-0 top-full mt-2 ${isMobile ? 'w-56' : 'w-64'} bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl ${isMobile ? 'p-4' : 'p-6'} shadow-2xl z-50`}
        >
          <div className={`${isMobile ? 'mb-3' : 'mb-4'}`}>
            <div className={`flex items-center space-x-${isMobile ? '2' : '3'} ${isMobile ? 'mb-2' : 'mb-2'}`}>
              <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center`}>
                <span className={`text-white ${isMobile ? 'text-sm' : 'text-lg'} font-bold`}>
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className={`text-white font-semibold ${isMobile ? 'text-sm' : ''}`}>{user.name}</p>
                <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'} ${isMobile ? '' : 'truncate'}`}>{user.email}</p>
              </div>
            </div>
          </div>

          <div className={`space-y-${isMobile ? '1' : '2'}`}>
            <Button
              onClick={() => navigateTo("/dashboard")}
              variant="ghost"
              size={isMobile ? "sm" : "default"}
              className={`w-full justify-start text-left hover:bg-white/10 ${isMobile ? 'text-sm' : ''}`}
            >
              <BarChart3 className={`${isMobile ? 'w-3 h-3 mr-2' : 'w-4 h-4 mr-3'}`} />
              Dashboard
            </Button>
            <Button
              onClick={() => navigateTo("/settings")}
              variant="ghost"
              size={isMobile ? "sm" : "default"}
              className={`w-full justify-start text-left hover:bg-white/10 ${isMobile ? 'text-sm' : ''}`}
            >
              <Settings className={`${isMobile ? 'w-3 h-3 mr-2' : 'w-4 h-4 mr-3'}`} />
              Settings
            </Button>
            <div className={`border-t border-white/10 ${isMobile ? 'my-1' : 'my-2'}`}></div>
            <Button
              onClick={onLogout}
              variant="ghost"
              size={isMobile ? "sm" : "default"}
              className={`w-full justify-start text-left hover:bg-red-500/10 text-red-400 hover:text-red-300 ${isMobile ? 'text-sm' : ''}`}
            >
              <LogOut className={`${isMobile ? 'w-3 h-3 mr-2' : 'w-4 h-4 mr-3'}`} />
              Sign Out
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
))

UserMenu.displayName = 'UserMenu'

// Main Navigation Component
export function Navigation() {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  
  const currentRoute = useCurrentRoute()
  const { user, handleLogout } = useAuthState()
  const { scrolled, backgroundOpacity, backdropBlur } = useScrollBehavior()

  // Memoized handlers
  const handleNavigation = useCallback((path: string) => {
    setIsProfileMenuOpen(false)
    setIsServicesDropdownOpen(false)

    if (path.includes('#')) {
      const [basePath, sectionId] = path.split('#')

      if (currentRoute !== basePath) {
        navigateTo(basePath)
        setTimeout(() => {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            })
          }
        }, 100)
      } else {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          })
        }
      }
    } else {
      navigateTo(path)
    }
  }, [currentRoute])

  const isActive = useCallback((path: string) =>
    path === "/"
      ? currentRoute === "/" || currentRoute === ""
      : currentRoute === path,
    [currentRoute]
  )

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.services-dropdown')) {
        setIsServicesDropdownOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  // Memoized mobile navigation
  const mobileNavigation = useMemo(() => (
    <div className="lg:hidden pb-3">
      <motion.nav
        className="flex justify-center"
        variants={navigationVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <div className="flex gap-1 bg-white/5 backdrop-blur-sm rounded-2xl p-1 border border-white/10">
          {NAVIGATION_ITEMS.map((item, index) => (
            <motion.button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`relative px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 focus:outline-none ${
                isActive(item.path)
                  ? "text-white bg-gradient-to-r from-purple-600 to-cyan-600 shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
              whileHover={{ y: -1, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              {item.name}
              {isActive(item.path) && (
                <motion.div
                  className="absolute inset-0 rounded-xl gradient-electric opacity-90"
                  layoutId="mobileActiveTab"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  style={{ zIndex: -1 }}
                />
              )}
            </motion.button>
          ))}

          {/* Mobile Services Button */}
          <motion.button
            onClick={() => handleNavigation("/services")}
            className={`relative px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 focus:outline-none ${
              currentRoute === "/services"
                ? "text-white bg-gradient-to-r from-purple-600 to-cyan-600 shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
            whileHover={{ y: -1, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: NAVIGATION_ITEMS.length * 0.05 + 0.2 }}
          >
            Services
            {currentRoute === "/services" && (
              <motion.div
                className="absolute inset-0 rounded-xl gradient-electric opacity-90"
                layoutId="mobileActiveTab"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                style={{ zIndex: -1 }}
              />
            )}
          </motion.button>
        </div>
      </motion.nav>
    </div>
  ), [handleNavigation, isActive, currentRoute])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
        backdropFilter: `blur(${scrolled ? '20px' : '4px'})`,
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
      }}
      variants={navigationVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 lg:py-0 lg:h-20">
          {/* Logo and Desktop Nav */}
          <div className="flex items-center justify-between lg:gap-10 w-full">
            <Logo />

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex flex-1 justify-center">
              <nav className="flex gap-6">
                {NAVIGATION_ITEMS.map((item) => (
                  <NavigationLink
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    onClick={handleNavigation}
                  />
                ))}

                <ServicesDropdown
                  isOpen={isServicesDropdownOpen}
                  onToggle={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  currentRoute={currentRoute}
                  onNavigate={handleNavigation}
                />
              </nav>
            </div>

            {/* Mobile CTA Buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                onClick={() => handleNavigation("/quotation")}
                size="sm"
                className="gradient-electric hover:shadow-lg hover:shadow-purple-500/25 text-white rounded-xl px-4 py-2 font-semibold transition-all duration-300 text-xs"
              >
                <FileText className="w-3 h-3 mr-1" />
                {/* Get Quotation */}
              </Button>

              {user ? (
                <UserMenu
                  user={user}
                  isOpen={isProfileMenuOpen}
                  onToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  onLogout={handleLogout}
                  isMobile
                />
              ) : (
                <AuthModal>
                  <Button
                    size="sm"
                    className="flex items-center px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/50 group text-xs"
                    aria-label="Login"
                  >
                    <User className="w-3 h-3 mr-1 transition-transform group-hover:rotate-6" />
                  </Button>
                </AuthModal>
              )}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={() => handleNavigation("/quotation")}
              className="flex items-center px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-purple-500 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/50 group "
            >
              GET QUOTATION
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {user ? (
              <UserMenu
                user={user}
                isOpen={isProfileMenuOpen}
                onToggle={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                onLogout={handleLogout}
              />
            ) : (
              <AuthModal>
                <Button
                  size="sm"
                  className="flex items-center px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/50 group"
                  aria-label="Login"
                >
                  <User className="w-4 h-4 mr-2 -mt-0.5 transition-transform group-hover:rotate-6" />
                  Login
                </Button>
              </AuthModal>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        {mobileNavigation}
      </div>
    </motion.header>
  )
}
