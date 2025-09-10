const express = require('express');

const app = express();

app.use('/api/books', (req, res, next) => {
    const books = [
        { 
            userId : 0,
            title : "Le Petit Prince",
            author : "Antoine de Saint-Exupéry",
            imageUrl : "https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
            year : 1943,
            genre : "Children's literature",
            rating : [
                {
                    userId: 0,
                    grade: 5
                }
            ],
            averageRating : 5,
        },
        {
            userId : 1,
            title : "Les Misérables",
            author : "Victor Hugo",
            imageUrl : "https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
            year : 1862,
            genre : "Historical novel",
            rating : [
                {
                    userId: 0,
                    grade: 4
                },
            ],
            averageRating : 4,
        }
    ];
    res.status(200).json(books);
}),


module.exports = app;