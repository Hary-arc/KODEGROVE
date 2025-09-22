import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
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

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    const preferredPort = parseInt(process.env.PORT || '5000', 10);
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