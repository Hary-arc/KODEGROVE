import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Load environment-specific configuration
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '..', '.env.production') });
}

// Set default environment variables
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'your-super-secret-jwt-key-change-in-production';
}
if (!process.env.JWT_EXPIRE) {
  process.env.JWT_EXPIRE = '30d';
}
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
if (!process.env.CORS_ORIGIN) {
  process.env.CORS_ORIGIN = 'http://localhost:5000';
}
if (!process.env.LOG_LEVEL) {
  process.env.LOG_LEVEL = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
}

// Validate required environment variables in production
if (process.env.NODE_ENV === 'production') {
  const requiredEnvVars = ['JWT_SECRET', 'PORT'];
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
}

// Create Express app
const app: Express = express();

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', 'data', 'storage');
fs.mkdir(dataDir, { recursive: true }).catch(console.error);

// Security and Performance Middleware
if (process.env.NODE_ENV === 'production') {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
      },
    },
  }));
} else {
  // Development - more permissive CSP
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        connectSrc: ["'self'", "ws:", "wss:"],
      },
    },
  }));
}

// Dynamic CORS configuration
const allowedOrigins = [
  'http://localhost:5000',
  'http://127.0.0.1:5000',
  process.env.CORS_ORIGIN
].filter(Boolean);

// Add Replit domain if available
if (process.env.REPLIT_DEV_DOMAIN) {
  allowedOrigins.push(`https://${process.env.REPLIT_DEV_DOMAIN}`);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control']
}));

// Compression middleware for production
app.use(compression());

// Logging middleware - different formats for dev/prod
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Performance headers
app.use((req: Request, res: Response, next: NextFunction) => {
  // Cache headers for static assets
  if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
  } else if (req.url.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
  }

  // Security headers
  res.setHeader('X-DNS-Prefetch-Control', 'on');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  next();
});

// Import routes
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

// Enhanced health check endpoint (defined BEFORE 404 handler)
app.get('/api/health', (req: Request, res: Response) => {
  const memoryUsage = process.memoryUsage();
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    memory: {
      used: Math.round(memoryUsage.heapUsed / 1024 / 1024) + ' MB',
      total: Math.round(memoryUsage.heapTotal / 1024 / 1024) + ' MB'
    },
    version: '1.0.0'
  });
});

// Default API route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Web Website API' });
});

// API Routes (defined BEFORE catch-all handlers)
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/services', serviceRoutes);

// Static file serving for production (defined BEFORE catch-all routes)
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', '..', 'client', 'build');
  console.log(`ℹ️ Serving static files from: ${clientBuildPath}`);
  
  // Serve static files with proper caching
  app.use(express.static(clientBuildPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true
  }));
}

// 404 handler for API routes (AFTER all API routes are defined)
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.path
  });
});

// Serve React app for all non-API routes in production (catch-all route)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req: Request, res: Response) => {
    const clientBuildPath = path.join(__dirname, '..', '..', 'client', 'build', 'index.html');
    res.sendFile(clientBuildPath, (err) => {
      if (err) {
        console.error('❌ Error serving React app:', err);
        res.status(500).json({ 
          success: false, 
          message: 'Failed to serve application'
        });
      }
    });
  });
}

// Enhanced error handling middleware (MUST be last middleware)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const errorId = Date.now().toString(36);
  
  console.error(`❌ [${timestamp}] Error ${errorId}:`, {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    errorId,
    ...(process.env.NODE_ENV === 'development' && { 
      error: err.message,
      stack: err.stack 
    })
  });
});

// Function to find an available port
const findAvailablePort = async (startPort: number): Promise<number> => {
  const net = await import('net');

  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        server.close(() => resolve(findAvailablePort(startPort + 1)));
      } else {
        reject(err);
      }
    });

    server.listen(startPort, () => {
      server.close(() => resolve(startPort));
    });
  });
};

// Start server
const startServer = async () => {
  try {
    const preferredPort = parseInt(process.env.PORT || '5001', 10);
    const port = await findAvailablePort(preferredPort);

    if (port !== preferredPort) {
      console.warn(`Port ${preferredPort} was in use, using port ${port} instead`);
    }

    app.listen(port, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
      console.log(`📍 http://localhost:${port}`);
      if (process.env.NODE_ENV === 'production') {
        console.log(`🌐 Serving React app from client/build`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;