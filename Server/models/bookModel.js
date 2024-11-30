const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_description: { type: String },
  long_description: { type: String },
  image: { type: String },
  year: { type: Number },
  author: { type: String },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
