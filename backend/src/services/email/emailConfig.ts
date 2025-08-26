import nodemailer from 'nodemailer';

// Email configuration
export const emailConfig = {
  // Gmail SMTP settings (for development)
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
};

// Create transporter
export const transporter = nodemailer.createTransport(emailConfig);

// Verify transporter connection
export const verifyEmailConnection = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('✅ Email service is ready');
    return true;
  } catch (error) {
    console.error('❌ Email service connection failed:', error);
    return false;
  }
};

// Email sender information
export const emailFrom = process.env.EMAIL_FROM || 'noreply@yourapp.com';
export const appName = process.env.APP_NAME || 'Your App';
export const appUrl = process.env.APP_URL || 'http://localhost:3000';
