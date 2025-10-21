// --- generateToken.js ---
// This new file is in /backend/utils/

import jwt from 'jsonwebtoken';

// This function creates a token, signs it with your secret,
// and sets it to expire in 30 days.
const generateToken = (userId, userRole) => {
  const token = jwt.sign(
    { 
      userId,   // The user's database ID
      role: userRole  // The user's role ('user' or 'admin')
    },
    process.env.JWT_SECRET, // Your secret key from the .env file
    {
      expiresIn: '30d',
    }
  );
  return token;
};

export default generateToken;