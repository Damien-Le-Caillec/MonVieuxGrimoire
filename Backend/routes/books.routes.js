const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const bookCtrl = require('../controllers/books.controller');
const multer = require('../middleware/multer-config');

const booksController = require('../controllers/books.controller');

router.post('/', auth, multer, booksController.createBook);
router.get('/', multer, booksController.getAllBooks);
router.get('/:id', multer, booksController.getOneBook);
router.post('/:id/rating', auth, multer, booksController.rateBook);
router.put('/:id', auth, multer, booksController.modifyBook);
router.post('/bestrating', auth, bookCtrl.getBestRatedBooks);
router.delete('/:id', auth, booksController.deleteBook);


module.exports = router;
