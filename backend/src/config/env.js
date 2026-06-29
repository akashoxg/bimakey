/**
 * Environment configuration with validation
 */
import 'dotenv/config';

// Validate required environment variables in production
const requiredEnvVars = ['MONGO_URI', 'PORT'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0 && process.env.NODE_ENV === 'production') {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

export const config = {
  // Server
  PORT: parseInt(process.env.PORT, 10) || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  
  // MongoDB
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/insure-right',
  
  // Email (Nodemailer)
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT, 10) || 587,
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL || 'Jitendrapoc@gmail.com, akashsharma9205946314@gmail.com',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'hello@bimakey.in',
  
  // WhatsApp
  WHATSAPP_ADMIN_NUMBER: process.env.WHATSAPP_ADMIN_NUMBER?.replace(/\D/g, '') || '',
  WHATSAPP_ENABLED: process.env.WHATSAPP_ENABLED === 'true',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-dev-secret-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60 * 60 * 1000, // 1 hour
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 5,
};

export default config;
