const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const booksController = require('../controllers/books.controller');

router.post('/', auth, booksController.createBook);
router.get('/', booksController.getAllBooks);
router.post('/:id/rating', auth, booksController.rateBook);

module.exports = router;
