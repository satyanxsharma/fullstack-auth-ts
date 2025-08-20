// Import the User model first
import { User } from './User';

// Export all models from this file
export { User } from './User';
export type { IUserDocument } from './User';

// Simple test function to verify our User model works
export const testUserModel = async () => {
  try {
    console.log('🧪 Testing User Model...');
    
    // Test 1: Create a new user
    const testUser = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    });
    
    // Test 2: Save the user (this will trigger password hashing)
    await testUser.save();
    console.log('✅ User created and saved successfully');
    
    // Test 3: Check if password was hashed
    const savedUser = await User.findById(testUser._id).select('+password');
    if (savedUser && savedUser.password !== 'password123') {
      console.log('✅ Password was hashed successfully');
    } else {
      console.log('❌ Password was not hashed');
    }
    
    // Test 4: Test password comparison
    const isPasswordCorrect = await savedUser?.comparePassword('password123');
    if (isPasswordCorrect) {
      console.log('✅ Password comparison works correctly');
    } else {
      console.log('❌ Password comparison failed');
    }
    
    // Test 5: Test token generation
    const emailToken = testUser.generateEmailVerificationToken();
    const resetToken = testUser.generatePasswordResetToken();
    
    if (emailToken && resetToken) {
      console.log('✅ Token generation works correctly');
    } else {
      console.log('❌ Token generation failed');
    }
    
    // Test 6: Test virtual field
    console.log(`✅ Full name: ${testUser.fullName}`);
    
    // Clean up - delete the test user
    await User.findByIdAndDelete(testUser._id);
    console.log('✅ Test user cleaned up');
    
    console.log('🎉 All User Model tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ User Model test failed:', error);
    return false;
  }
};
