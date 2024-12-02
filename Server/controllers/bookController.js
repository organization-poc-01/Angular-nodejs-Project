const { Book } = require('../models/bookModel'); 


function getBooks(req, res, next) {
    Book.find()
        .populate('userId')
        .then(books => res.json(books))
        .catch(next);
}


function getBook(req, res, next) {
    const { bookId } = req.params;

    Book.findById(bookId)
        .populate('userId')
        .then(book => {
            if (!book) return res.status(404).json({ message: 'Book not found' });
            res.json(book);
        })
        .catch(next);
}

function createBook(req, res, next) {
    const { title, shortDescription, longDescription, image, year, author } = req.body;
    const { _id: userId } = req.user; // Assume `req.user` contains the authenticated user's info

    Book.create({ title, shortDescription, longDescription, image, year, author, userId })
        .then(book => res.status(201).json(book))
        .catch(next);
}


function updateBook(req, res, next) {
    const { bookId } = req.params;
    const updateData = req.body;

    Book.findByIdAndUpdate(bookId, updateData, { new: true })
        .then(updatedBook => {
            if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
            res.json(updatedBook);
        })
        .catch(next);
}

function deleteBook(req, res, next) {
    const { bookId } = req.params;

    Book.findByIdAndDelete(bookId)
        .then(deletedBook => {
            if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
            res.json({ message: 'Book deleted successfully' });
        })
        .catch(next);
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
};