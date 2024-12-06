const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_description: { type: String },
  long_description: { type: String },
  image: { type: String },
  year: { type: Number },
  author: { type: String },
  owner: {
    type: ObjectId,
    ref: "User",
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
