// --- book.user.controller.js ---
// This file is in /backend/controllers/

import Book from '../models/book.model.js';

/**
 * @desc    Get all books (with optional filtering)
 * @route   GET /api/books
 * @access  Private (Users)
 */
export const getAllBooks = async (req, res) => {
  try {
    const filter = {};

    // Example of filtering by author (case-insensitive)
    if (req.query.author) {
      filter.author = { $regex: req.query.author, $options: 'i' };
    }
    // You could add more filters here, e.g., for title or genre
    
    // Find all books, or find books matching the filter
    const books = await Book.find(filter);
    
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get a single book by its ID
 * @route   GET /api/books/:id
 * @access  Private (Users)
 */
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};