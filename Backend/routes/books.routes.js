const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

router.post('/', booksController.createBook);
router.get('/', booksController.getAllBooks);
router.post('/:id/rating', booksController.rateBook);

module.exports = router;
