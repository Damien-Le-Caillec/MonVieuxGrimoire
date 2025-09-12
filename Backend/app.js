const express = require('express');
const app = express();

app.use(express.json());

const booksRoutes = require('./routes/books.routes');
app.use('/api/books', booksRoutes);

module.exports = app;