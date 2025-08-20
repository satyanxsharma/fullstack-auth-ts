import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// This interface defines what a User document looks like in our database
// It extends Document (which gives us MongoDB document methods) and includes our custom methods
export interface IUserDocument extends Document {
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
  
  // Virtual fields (computed properties)
  fullName: string;
  
  // Custom methods we'll add to our User model
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateEmailVerificationToken(): string;
  generatePasswordResetToken(): string;
}

// This is our User Schema - it defines the structure and rules for user data
const userSchema = new Schema<IUserDocument>({
  // Basic user information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true, // Removes whitespace from beginning and end
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // No two users can have the same email
    lowercase: true, // Always store email in lowercase
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password when querying users (for security)
  },
  
  // Email verification fields
  isEmailVerified: {
    type: Boolean,
    default: false // New users start with unverified email
  },
  
  emailVerificationToken: {
    type: String,
    select: false // Don't include in queries for security
  },
  
  emailVerificationExpires: {
    type: Date,
    select: false
  },
  
  // Password reset fields
  passwordResetToken: {
    type: String,
    select: false
  },
  
  passwordResetExpires: {
    type: Date,
    select: false
  }
}, {
  // Schema options
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  toJSON: { virtuals: true }, // Include virtual fields when converting to JSON
  toObject: { virtuals: true }
});

// Virtual field for full name (computed property)
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// PASSWORD HASHING MIDDLEWARE
// This runs BEFORE we save a user to the database
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    // Hash the password with bcrypt
    // 12 is the "salt rounds" - higher number = more secure but slower
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// PASSWORD COMPARISON METHOD
// This method lets us check if a password matches the stored hash
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    // Compare the candidate password with the stored hash
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// EMAIL VERIFICATION TOKEN METHOD
// Generates a secure token for email verification
userSchema.methods.generateEmailVerificationToken = function(): string {
  // Generate a random token (32 bytes = 64 characters when converted to hex)
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  // Store the token in the user document
  this.emailVerificationToken = verificationToken;
  
  // Set expiration time (24 hours from now)
  this.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  
  return verificationToken;
};

// PASSWORD RESET TOKEN METHOD
// Generates a secure token for password reset
userSchema.methods.generatePasswordResetToken = function(): string {
  // Generate a random token (32 bytes = 64 characters when converted to hex)
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Store the token in the user document
  this.passwordResetToken = resetToken;
  
  // Set expiration time (1 hour from now)
  this.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
  
  return resetToken;
};

// Export the User model
// This creates a collection called 'users' in MongoDB
// Export twice for allowing Named and Default imports
export const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;
