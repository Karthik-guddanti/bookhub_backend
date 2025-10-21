// --- book.model.js ---
// This file is in /backend/models/

import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    
    // --- This is the link between the book and its creator ---
    addedBy: {
      type: mongoose.Schema.Types.ObjectId, // This will be a user's ID
      required: true,
      ref: 'User', // This tells Mongoose to reference the 'User' model
    },
  },
  {
    // This automatically adds 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;