import { Document } from 'mongoose';

// Base User interface - what we store in database
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// User document interface - extends Mongoose Document
export interface IUserDocument extends IUser, Document {
  // Instance methods we'll add to the User model
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateEmailVerificationToken(): string;
  generatePasswordResetToken(): string;
}

// User registration request interface
export interface IUserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// User login request interface
export interface IUserLogin {
  email: string;
  password: string;
}

// User response interface (what we send to frontend - NO PASSWORD!)
export interface IUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// JWT payload interface
export interface IJWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

// Password reset request interface
export interface IPasswordResetRequest {
  email: string;
}

// Password reset confirmation interface
export interface IPasswordReset {
  token: string;
  password: string;
  confirmPassword: string;
}

// Email verification interface
export interface IEmailVerification {
  token: string;
}