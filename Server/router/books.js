const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const bookController = require('../controllers/bookController');

// Get all books
router.get('/', bookController.getBooks);

// Create a book (requires authentication)
router.post('/', auth(), bookController.createBook);

// Get a specific book by ID
router.get('/:id', bookController.getBook);

// Update a book by ID (requires authentication)
router.patch('/:id', auth(), bookController.updateBook);

// Delete a book by ID (requires authentication)
router.delete('/:id', auth(), bookController.deleteBook);

module.exports = router;
