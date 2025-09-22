"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, User } from "lucide-react";
import { Button } from "./ui/button";
import { useCurrentRoute, navigateTo } from "./Router";
import { AuthModal } from "./AuthModal";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const currentRoute = useCurrentRoute();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const handleNavigation = (path: string) => {
    navigateTo(path);
  };

  const isActive = (path: string) =>
    path === "/"
      ? currentRoute === "/" || currentRoute === ""
      : currentRoute === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-white/10 backdrop-blur-md border-b border-white/10"
          : "bg-white/3 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 lg:py-0 lg:h-20">
          {/* Logo and Desktop Nav */}
          <div className="flex items-center justify-between lg:gap-10 w-full">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-3 group focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Go to homepage"
            >
              <div className="w-12 h-12 gradient-electric rounded-xl flex items-center justify-center relative overflow-hidden">
                <span className="font-outfit text-white font-bold text-xl relative z-10">
                  C
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse-glow" />
              </div>
              <span className="font-outfit text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CodeFlow
              </span>
            </motion.button>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex flex-1 justify-center">
              <nav className="flex gap-6">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`relative text-sm font-medium transition-colors duration-300 focus:outline-none ${
                      isActive(item.path)
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                    whileHover={{ y: -1 }}
                  >
                    {item.name}
                    {isActive(item.path) && (
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
                ))}
              </nav>
            </div>

            {/* Mobile CTA Buttons (Right aligned on mobile) */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                onClick={() => handleNavigation("/contact")}
                size="sm"
                className="gradient-electric hover:shadow-lg hover:shadow-purple-500/25 text-white rounded-xl px-4 py-2 font-semibold transition-all duration-300 text-xs"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Start
              </Button>
              <AuthModal>
                <Button
                  size="sm"
                  className="flex items-center px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/50 group text-xs"
                  aria-label="Login"
                >
                  <User className="w-3 h-3 mr-1 transition-transform group-hover:rotate-6" />
                  Login
                </Button>
              </AuthModal>
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              onClick={() => handleNavigation("/contact")}
              size="sm"
              className="gradient-electric hover:shadow-lg hover:shadow-purple-500/25 text-white rounded-xl px-6 py-2 font-semibold transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started
            </Button>
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
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden pb-3">
          <motion.nav
            className="flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex gap-1 bg-white/5 backdrop-blur-sm rounded-2xl p-1 border border-white/10">
              {navigationItems.map((item, index) => (
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
            </div>
          </motion.nav>
        </div>
      </div>
    </header>
  );
}