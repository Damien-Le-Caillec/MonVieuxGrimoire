const Book = require('../models/book.model');

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, grade } = req.body;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ error: 'Livre non trouvé' });

    book.rating.push({ userId, grade });
    book.averageRating =
      book.rating.reduce((sum, r) => sum + r.grade, 0) / book.rating.length;

    await book.save();
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
