// --- user.model.js ---
// This file is in /backend/models/

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'], // The role must be either 'user' or 'admin'
      default: 'user',        // Default role is 'user'
    },
  },
  {
    // This automatically adds 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// --- Mongoose Middleware to Hash Password ---
// This function runs *before* a new user is saved ('save')
userSchema.pre('save', async function (next) {
  // 'this' refers to the user document being saved
  
  // Only hash the password if it's new or has been modified
  if (!this.isModified('password')) {
    return next();
  }

  // Generate a 'salt' (random string) to make the hash more secure
  const salt = await bcrypt.genSalt(10);
  // Hash the password using the salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;