// --- user.routes.js ---
// This file is in /backend/routes/

import express from 'express';
import { getAllBooks, getBookById } from '../controllers/book.user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// @route   GET /api/books
// @desc    Get all books (can be filtered)
router.get('/', protect, getAllBooks);

// @route   GET /api/books/:id
// @desc    Get a single book by ID
router.get('/:id', protect, getBookById);

export default router;