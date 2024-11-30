const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel'); // Adjust the path as needed

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new book
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    short_description: req.body.short_description,
    long_description: req.body.long_description,
    image: req.body.image,
    year: req.body.year,
    author: req.body.author,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a book
router.patch('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (req.body.title) book.title = req.body.title;
    if (req.body.short_description) book.short_description = req.body.short_description;
    if (req.body.long_description) book.long_description = req.body.long_description;
    if (req.body.image) book.image = req.body.image;
    if (req.body.year) book.year = req.body.year;
    if (req.body.author) book.author = req.body.author;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.remove();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
