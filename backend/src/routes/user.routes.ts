import { Router } from 'express';
import { authenticateToken } from '../middleware';

const router = Router();

// PROTECTED ROUTE - Get user profile
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Profile retrieved successfully',
    data: {
      user: req.user
    }
  });
});

// PROTECTED ROUTE - Update user profile
router.put('/profile', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: req.user,
      updatedFields: req.body
    }
  });
});

// PROTECTED ROUTE - Get user dashboard
router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Dashboard data retrieved',
    data: {
      user: req.user,
      dashboard: {
        welcomeMessage: `Welcome back, ${req.user.firstName}!`,
        lastLogin: new Date().toISOString(),
        stats: {
          totalLogins: 1,
          emailVerified: req.user.isEmailVerified
        }
      }
    }
  });
});

export default router;
