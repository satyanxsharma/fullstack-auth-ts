import { Router } from 'express';
import { register, login, testAuth } from '../controllers';

const router = Router();

// 🧪 Test route (for development)
router.get('/test', testAuth);

// 🚀 User registration
router.post('/register', register);

// 🔐 User login
router.post('/login', login);

// TODO: We'll add these routes later
// router.post('/verify-email', verifyEmail);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);
// router.post('/logout', logout);

export default router;
