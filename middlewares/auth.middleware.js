// --- auth.middleware.js ---
// This file is in /backend/middlewares/

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

/**
 * @desc    Checks if user is logged in by verifying JWT
 */
export const protect = async (req, res, next) => {
  let token;

  // 1. Read the token from the 'Authorization' header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Get token from header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using your secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user from the token's ID and attach them
      // to the request object, so all following routes can access it
      // We exclude the password when fetching
      req.user = await User.findById(decoded.userId).select('-password');

      // 5. Move to the next function (e.g., the controller)
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

/**
 * @desc    Checks if the logged-in user is an 'admin'
 * @note    This middleware MUST run *after* the 'protect' middleware
 */
export const isAdmin = (req, res, next) => {
  // 'req.user' is attached by the 'protect' middleware
  if (req.user && req.user.role === 'admin') {
    // If user is an admin, proceed
    next();
  } else {
    // If not, send 'Forbidden' error
    return res.status(403).json({ message: 'Not authorized as an admin' });
  }
};