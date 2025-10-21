// --- book.admin.controller.js ---
// This file is in /backend/controllers/

import Book from '../models/book.model.js';

/**
 * @desc    Add a new book
 * @route   POST /api/admin/books
 * @access  Private (Admin)
 */
export const addBook = async (req, res) => {
  try {
    const { title, author, description, imageUrl } = req.body;
    
    // 'req.user' comes from the 'protect' middleware
    const adminUserId = req.user._id;

    const book = new Book({
      title,
      author,
      description,
      imageUrl,
      addedBy: adminUserId, // Link the book to the admin who added it
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Get all books added by the logged-in admin
 * @route   GET /api/admin/books
 * @access  Private (Admin)
 */
export const getMyBooks = async (req, res) => {
  try {
    // Find only books where 'addedBy' matches the logged-in admin's ID
    const books = await Book.find({ addedBy: req.user._id });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Update a book
 * @route   PUT /api/admin/books/:id
 * @access  Private (Admin)
 */
export const updateBook = async (req, res) => {
  try {
    const { title, author, description, imageUrl } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // --- CRITICAL: Check if this admin owns this book ---
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to update this book' });
    }

    // Update the fields
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.imageUrl = imageUrl || book.imageUrl;

    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Delete a book
 * @route   DELETE /api/admin/books/:id
 * @access  Private (Admin)
 */
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // --- CRITICAL: Check if this admin owns this book ---
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to delete this book' });
    }

    await book.deleteOne();
    res.status(200).json({ message: 'Book removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};