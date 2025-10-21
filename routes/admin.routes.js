// --- admin.routes.js ---
// This file is in /backend/routes/

import express from 'express';
import {
  addBook,
  getMyBooks,
  updateBook,
  deleteBook,
} from '../controllers/book.admin.controller.js';
import { protect, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// --- All routes in this file are protected and require admin role ---

// @route   POST /api/admin/books
// @desc    Add a new book
router.post('/', protect, isAdmin, addBook);

// @route   GET /api/admin/books
// @desc    Get all books added by this admin
router.get('/', protect, isAdmin, getMyBooks);

// @route   PUT /api/admin/books/:id
// @desc    Update a book
router.put('/:id', protect, isAdmin, updateBook);

// @route   DELETE /api/admin/books/:id
// @desc    Delete a book
router.delete('/:id', protect, isAdmin, deleteBook);

export default router;