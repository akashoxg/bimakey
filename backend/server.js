import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

// ES module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import connectDB from './src/config/db.js';
import leadRoutes from './src/routes/leadRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import { errorHandler, notFound } from './src/middleware/error.js';
import { config } from './src/config/env.js';

// Connect to database
connectDB();

const app = express();

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// MongoDB injection prevention
app.use(mongoSanitize());

// Logging
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting for lead submissions
const leadLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    message: 'Too many submissions from this IP. Please try again in an hour.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to lead routes
app.use('/api/leads', leadLimiter);

// API Routes
app.use('/api/leads', leadRoutes);
app.use('/api/ai', aiRoutes);

// Serve static files from frontend build in production
const frontendDistPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));

// Serve frontend in production for all non-API routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }
  // Only serve frontend in production
  if (config.NODE_ENV === 'production') {
    return res.sendFile(path.join(frontendDistPath, 'index.html'));
  }
  // In development, let Vite handle frontend routes via proxy
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Server running on port ${PORT}                          ║
║   📍 Environment: ${config.NODE_ENV.padEnd(40)}║
║   🌍 CORS origin: ${config.CLIENT_URL.padEnd(42)}║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
