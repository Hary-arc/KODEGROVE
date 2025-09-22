import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Create Express app
const app: Express = express();

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', 'data', 'storage');
fs.mkdir(dataDir, { recursive: true }).catch(console.error);

// Security and Performance Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));
app.use(compression());
// CORS configuration
app.use(cors({
  origin: ['http://localhost:5000', 'http://127.0.0.1:5000', 'https://ce3721d0-885c-4979-8b87-c92e0126127c-00-2k7ldw75pi8fu.sisko.replit.dev'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('combined'));
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

  // Performance headers
  res.setHeader('X-DNS-Prefetch-Control', 'on');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  next();
});

// Routes (to be imported)
// app.use('/api/auth', authRoutes);
// app.use('/api/blog', blogRoutes);
// app.use('/api/portfolio', portfolioRoutes);
// app.use('/api/services', servicesRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime()
  });
});

// Default route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Web Website API' });
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
    const preferredPort = parseInt(process.env.PORT || '3001', 10);
    const port = await findAvailablePort(preferredPort);

    if (port !== preferredPort) {
      console.warn(`Port ${preferredPort} was in use, using port ${port} instead`);
    }

    app.listen(port, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;