import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';

// Load environment variables
dotenv.config();

// Track environment validation status
let envValidationError = null;
const validateEnv = () => {
  const required = ['MONGO_URI', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    const error = `Missing environment variables: ${missing.join(', ')}`;
    console.warn(`\n⚠️  WARNING: ${error}\n`);
    envValidationError = error;
    return false;
  }
  console.log('✓ All required environment variables loaded');
  return true;
};

// Validate but don't crash on error
validateEnv();

const app = express();

// Lazy database connection - only connect when needed (for serverless)
let dbConnected = false;
let dbConnectionError = null;

const ensureDBConnection = async () => {
  if (!dbConnected && !dbConnectionError) {
    try {
      // Skip DB connection if MONGO_URI is not set
      if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI environment variable is not set');
      }
      await connectDB();
      dbConnected = true;
      dbConnectionError = null;
      console.log('✓ Database connection established');
    } catch (error) {
      console.error('[DB Connection Error]', error.message);
      dbConnectionError = error;
      dbConnected = false;
      throw error;
    }
  } else if (dbConnectionError) {
    throw dbConnectionError;
  }
};

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || process.env.VERCEL_URL || '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (doesn't require DB connection)
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    dbConnected: dbConnected,
    dbError: dbConnectionError ? dbConnectionError.message : null,
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    dbConnected: dbConnected,
    dbError: dbConnectionError ? dbConnectionError.message : null,
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Event Ticketing API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      events: '/api/events',
      registrations: '/api/registrations'
    },
    timestamp: new Date().toISOString(),
  });
});

// Middleware to ensure DB connection before handling requests
// Skip DB connection for health check
app.use((req, res, next) => {
  // Skip DB connection for health check endpoints
  if (req.path === '/api/health' || req.path === '/health' || req.path === '/') {
    return next();
  }
  
  ensureDBConnection()
    .then(() => next())
    .catch((err) => {
      console.error('[DB Connection Error]', err.message);
      // Return error response instead of crashing
      return res.status(503).json({
        success: false,
        message: 'Database connection failed',
        error: err.message,
        timestamp: new Date().toISOString(),
      });
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

// Global error handlers for serverless
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Unhandled Rejection]', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[Uncaught Exception]', error);
});

// Export app for Vercel serverless functions
// Only start server if not in Vercel environment
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

export default app;
