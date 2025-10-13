const Book = require('../models/book.model');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

exports.createBook = async (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;

  const originalImagePath = req.file.path;
  const optimizedFilename = `optimized-${req.file.filename}`;
  const optimizedImagePath = path.join('images', optimizedFilename);

  try {
  await sharp(originalImagePath)
    .resize({ width: 800 })
    .jpeg({ quality: 70 })
    .toFile(optimizedImagePath);

  fs.unlinkSync(originalImagePath);

  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${optimizedFilename}`,
  });

  await book.save()
    res.status(201).json({ message: 'Livre enregistré avec image optimisée !' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  //verrifier si j'ai un userId et une note
  const { id } = req.params;
  const { userId, grade } = req.body;
  //erreur si la requette est mal formatée
  try {
    const book = await Book.findById(id);
    if (!book) return res.status(400).json({ error: 'Livre non trouvé' });

    book.ratings.push({ userId, grade });
    book.averageRating = book.ratings.reduce((sum, r) => sum + r.grade, 0) / book.rating.length;

    await book.save();
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBestRatedBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ averageRating: { $gt: 0 } })
      .sort({ averageRating: -1 })
      .limit(3);
    res.status(200).json(books);
  } catch (error) {
    console.error('erreur dans getBestRatedBooks: ', error);
    res.status(500).json({ error: 'erreur server lord du tri des livres' });
  }
};


exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
      res.status(200).json(book);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyBook = async (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) =>  {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message : 'Non-authorisé' });
        return;
      } 
        Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
        .then(() => res.status(200).json({ message : 'Livre modifié!' }))
        .catch(error => res.status(401).json({ error }));
      
    })
    .catch((error) => {
      res.status(400).json({ error });
    });

};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: 'Non-authorisé' });
        return;
      } 
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
          .catch(error => res.status(401).json({ error }));
        });
      
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};