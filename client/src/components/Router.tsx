'use client';

import { useState, useEffect, ReactNode } from 'react';
import React from 'react';
interface RouteConfig {
  path: string;
  component: ReactNode;
}

interface RouterProps {
  routes: RouteConfig[];
  defaultRoute?: string;
}

export function Router({ routes, defaultRoute = '/' }: RouterProps) {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Get initial path from hash or default
    const path = window.location.hash.replace('#', '') || defaultRoute;
    setCurrentPath(path);

    // Listen for hash changes
    const handleHashChange = () => {
      const newPath = window.location.hash.replace('#', '') || defaultRoute;
      setCurrentPath(newPath);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [defaultRoute]);

  // Find matching route
  const currentRoute = routes.find(route => route.path === currentPath);

  // If no route matches, show default route
  const defaultRouteComponent = routes.find(route => route.path === defaultRoute)?.component;

  return <div className="router-container">{currentRoute?.component || defaultRouteComponent}</div>;
}

// Navigation helper function
export function navigateTo(path: string) {
  window.location.hash = path;
}

// Hook to get current route
export function useCurrentRoute() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.hash.replace('#', '') || '/');
    };

    updatePath();
    window.addEventListener('hashchange', updatePath);
    return () => window.removeEventListener('hashchange', updatePath);
  }, []);

  return currentPath;
}
