const express = require('express');
const app = express();

app.use(express.json());

const booksRoutes = require('./routes/books.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;