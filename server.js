// --- server.js ---
// This file is in /backend/

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// --- Import Routes ---
import authRoutes from './routes/auth.routes.js';
import adminBookRoutes from './routes/admin.routes.js'; // <-- NEW IMPORT
import userBookRoutes from './routes/user.routes.js';  // <-- NEW IMPORT

// --- 1. Basic Server Configuration ---
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// --- 2. Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB Atlas! 🚀'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));


// --- 3. API Routes ---
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the BookHub API! 📚' });
});

app.use('/api/auth', authRoutes);

// --- NEW ROUTE HANDLERS ---
// All admin-related book routes will be prefixed with /api/admin/books
app.use('/api/admin/books', adminBookRoutes);

// All user-related book routes will be prefixed with /api/books
app.use('/api/books', userBookRoutes);


// --- 4. Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});