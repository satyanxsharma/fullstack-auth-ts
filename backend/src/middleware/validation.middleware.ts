import { Request, Response, NextFunction } from 'express';

// VALIDATION MIDDLEWARE FOR REGISTRATION
export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const errors: string[] = [];

  // Check required fields
  if (!firstName || firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters');
  }

  if (!lastName || lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters');
  }

  if (!email || !isValidEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (!confirmPassword) {
    errors.push('Password confirmation is required');
  }

  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
    return;
  }

  next();
};

// VALIDATION MIDDLEWARE FOR LOGIN
export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  const errors: string[] = [];

  if (!email || !isValidEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
    return;
  }

  next();
};

// VALIDATION MIDDLEWARE FOR PASSWORD RESET
export const validatePasswordReset = (req: Request, res: Response, next: NextFunction): void => {
  const { email } = req.body;

  const errors: string[] = [];

  if (!email || !isValidEmail(email)) {
    errors.push('Valid email is required');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
    return;
  }

  next();
};

// VALIDATION MIDDLEWARE FOR PASSWORD RESET CONFIRMATION
export const validatePasswordResetConfirm = (req: Request, res: Response, next: NextFunction): void => {
  const { token, password, confirmPassword } = req.body;

  const errors: string[] = [];

  if (!token) {
    errors.push('Reset token is required');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (!confirmPassword) {
    errors.push('Password confirmation is required');
  }

  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
    return;
  }

  next();
};

// EMAIL VALIDATION HELPER
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
