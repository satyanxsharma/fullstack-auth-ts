import fs from 'fs';
import path from 'path';
import { transporter, emailFrom, appName, appUrl } from './emailConfig';

// Email service class
export class EmailService {
  
  // Send email verification
  static async sendVerificationEmail(
    email: string, 
    firstName: string, 
    token: string
  ): Promise<boolean> {
    try {
      const verificationUrl = `${appUrl}/verify-email?token=${token}`;
      
      // Read email template
      const templatePath = path.join(__dirname, '../../templates/emailVerification.html');
      let htmlContent = fs.readFileSync(templatePath, 'utf8');
      
      // Replace placeholders
      htmlContent = htmlContent
        .replace(/{{appName}}/g, appName)
        .replace(/{{firstName}}/g, firstName)
        .replace(/{{email}}/g, email)
        .replace(/{{verificationUrl}}/g, verificationUrl);
      
      // Send email
      const mailOptions = {
        from: emailFrom,
        to: email,
        subject: `Verify Your Email - ${appName}`,
        html: htmlContent
      };
      
      await transporter.sendMail(mailOptions);
      console.log(`✅ Verification email sent to ${email}`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to send verification email:', error);
      return false;
    }
  }
  
  // Send password reset email
  static async sendPasswordResetEmail(
    email: string, 
    firstName: string, 
    token: string
  ): Promise<boolean> {
    try {
      const resetUrl = `${appUrl}/reset-password?token=${token}`;
      
      // Read email template
      const templatePath = path.join(__dirname, '../../templates/passwordReset.html');
      let htmlContent = fs.readFileSync(templatePath, 'utf8');
      
      // Replace placeholders
      htmlContent = htmlContent
        .replace(/{{appName}}/g, appName)
        .replace(/{{firstName}}/g, firstName)
        .replace(/{{email}}/g, email)
        .replace(/{{resetUrl}}/g, resetUrl);
      
      // Send email
      const mailOptions = {
        from: emailFrom,
        to: email,
        subject: `Reset Your Password - ${appName}`,
        html: htmlContent
      };
      
      await transporter.sendMail(mailOptions);
      console.log(`✅ Password reset email sent to ${email}`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to send password reset email:', error);
      return false;
    }
  }
  
  // Send welcome email (optional)
  static async sendWelcomeEmail(
    email: string, 
    firstName: string
  ): Promise<boolean> {
    try {
      const welcomeUrl = `${appUrl}/dashboard`;
      
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Welcome to ${appName}, ${firstName}!</h1>
          <p>Thank you for verifying your email address. Your account is now fully activated!</p>
          <p>You can now access all features of our application.</p>
          <a href="${welcomeUrl}" style="background-color: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
            Go to Dashboard
          </a>
          <p>If you have any questions, feel free to contact our support team.</p>
          <p>Best regards,<br>The ${appName} Team</p>
        </div>
      `;
      
      const mailOptions = {
        from: emailFrom,
        to: email,
        subject: `Welcome to ${appName}!`,
        html: htmlContent
      };
      
      await transporter.sendMail(mailOptions);
      console.log(`✅ Welcome email sent to ${email}`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to send welcome email:', error);
      return false;
    }
  }
  
  // Test email service
  static async testEmailService(): Promise<boolean> {
    try {
      const testEmail = process.env.TEST_EMAIL || 'test@example.com';
      
      const mailOptions = {
        from: emailFrom,
        to: testEmail,
        subject: `Email Service Test - ${appName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Email Service Test</h1>
            <p>This is a test email to verify that the email service is working correctly.</p>
            <p>If you received this email, the email service is configured properly!</p>
            <p>Timestamp: ${new Date().toISOString()}</p>
          </div>
        `
      };
      
      await transporter.sendMail(mailOptions);
      console.log(`✅ Test email sent to ${testEmail}`);
      return true;
      
    } catch (error) {
      console.error('❌ Email service test failed:', error);
      return false;
    }
  }
}
