const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

const booksRoutes = require('./routes/books.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static('images'));

module.exports = app;