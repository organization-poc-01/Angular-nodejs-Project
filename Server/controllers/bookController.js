const bookModel = require('../models/bookModel');
const userModel = require('../models/userModel');

function getBooks(req, res, next) {
  bookModel.find()
    .populate('userId')
    .then((books) => res.json(books))
    .catch(next);
}

async function getBook(req, res, next) {
    try {
        const book = await bookModel.findById(req.params.id).populate('owner');
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        next(err);
    }
}

async function createBook(req, res, next) {

  const { title, short_description, long_description, image, year, author } = req.body;
  const { _id: userId } = req.user; 

  if (!userId) {
      return res.status(401).json({ message: 'Unauthorized - User information is missing' });
  }

  try {
      const book = await bookModel.create({
          title,
          short_description,
          long_description,
          image,
          year,
          author,
          owner: userId,
      });

      await userModel.findByIdAndUpdate(userId, { $push: { books: book._id } }, { new: true });

      res.status(201).json(book);
  } catch (err) {
      next(err);
  }
}

async function updateBook(req, res, next) {
    try {
        const book = await bookModel.findById(req.params.id);
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
        next(err);
    }
}

async function deleteBook(req, res, next) {
    try {
        const book = await bookModel.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await book.remove();

        // Remove the deleted book's ID from the user's `books` array
        await userModel.findByIdAndUpdate(book.owner, { $pull: { books: req.params.id } }, { new: true });

        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
};
