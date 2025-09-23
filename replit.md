# Modern Interactive Website

## Overview
This is a modern full-stack interactive website built with React and TypeScript on the frontend, and Node.js/Express on the backend. The project features advanced animations, modern UI components, and a comprehensive design system.

## Project Architecture

### Frontend (Client)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Styling**: TailwindCSS with custom animations
- **UI Components**: Radix UI primitives with custom components
- **Animations**: Framer Motion and GSAP
- **Port**: 5000 (configured for Replit environment)

### Backend (Server)
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with tsx for development
- **Security**: Helmet, CORS configured
- **Port**: 5001 (automatically finds available port)
- **API Endpoints**: Health check, Auth, Blog, Services

### Key Features
- Responsive design with modern animations
- Component-based architecture with TypeScript
- Performance-optimized animations and interactions
- Security-hardened backend with proper CORS setup
- Hot module replacement for development
- Production-ready build configuration

## Development Setup
The project is configured to run in Replit environment with:
- Frontend served on port 5000 (webview)
- Backend API on port 5001
- Concurrent development servers
- Host configuration: 0.0.0.0 (frontend), localhost (backend)
- Proxy configuration for API calls

## Recent Changes (September 23, 2025)
- ✅ Successfully re-imported fresh GitHub clone and configured for Replit environment
- ✅ Installed all required dependencies (npm workspaces)
- ✅ Fixed bcryptjs import error in authController.ts
- ✅ Verified frontend (React/Vite) running on port 5000 with allowedHosts: true
- ✅ Verified backend (Express/TypeScript) running on port 5001
- ✅ Set up deployment configuration (autoscale target)
- ✅ Both frontend and backend running successfully with API connectivity

## File Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── animations/  # Animation components
│   │   └── data/        # Static data and configurations
│   └── vite.config.ts   # Vite configuration
├── server/           # Express backend API
│   ├── src/
│   │   ├── controllers/ # API controllers
│   │   ├── routes/      # API routes
│   │   └── models/      # Data models
│   └── package.json
└── package.json      # Root workspace configuration
```

## Deployment
- **Target**: Autoscale (stateless web application)
- **Build**: `npm run build` (builds both client and server)
- **Start**: `npm start` (runs production servers)

## User Preferences
- No specific preferences documented yet
- Project follows modern React/TypeScript best practices
- Uses monorepo structure with npm workspaces