import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Import our database connection
import database from './config/database';
// Import our User model test
import { testUserModel } from './models';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Test route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    database: database.isConnected() ? 'connected' : 'disconnected'
  });
});

// Test User Model route
app.get('/api/test-user-model', async (req, res) => {
  try {
    const testResult = await testUserModel();
    if (testResult) {
      res.json({
        status: 'success',
        message: 'User Model test completed successfully!',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'User Model test failed!',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'User Model test error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Start server function
async function startServer() {
  try {
    // Connect to database first
    console.log('🚀 Connecting to database...');
    await database.connect();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

// Start the server
startServer();