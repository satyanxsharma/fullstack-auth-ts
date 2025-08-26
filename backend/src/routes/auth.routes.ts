import { Router } from 'express';
import { 
  register, 
  login, 
  testAuth, 
  verifyEmail, 
  forgotPassword, 
  resetPassword, 
  logout, 
  refreshToken 
} from '../controllers';
import { validateRegistration, validateLogin } from '../middleware';

const router = Router();

// Test route (for development)
router.get('/test', testAuth);

// User registration
router.post('/register', validateRegistration, register);

// User login
router.post('/login', validateLogin, login);

// Email verification
router.post('/verify-email', verifyEmail);

// Password reset
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Logout
router.post('/logout', logout);

// Refresh token
router.post('/refresh-token', refreshToken);

export default router;
