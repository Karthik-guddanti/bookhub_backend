// --- auth.controller.js ---
// This file is in /backend/controllers/

import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
export const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create a new user
    // (The password hashing is handled automatically by the 'pre-save'
    // hook you already added in user.model.js)
    const user = await User.create({
      username,
      password,
      role, // 'user' or 'admin' from the signup form
    });

    // 3. If user created successfully, generate a token
    if (user) {
      const token = generateToken(user._id, user.role);

      // 4. Send back user info and token
      res.status(201).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Authenticate user & get token (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 2. Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // 3. If passwords match, generate a token
      const token = generateToken(user._id, user.role);

      // 4. Send back user info and token
      res.status(200).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: token,
      });
    } else {
      // If passwords don't match
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};