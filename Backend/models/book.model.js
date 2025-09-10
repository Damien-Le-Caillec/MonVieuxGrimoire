module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('book', {
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: [
            {
                userId: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                grade: {
                    type: DataTypes.NUMBER,
                    allowNull: false
                }
            }
        ],
        averageRating: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    });
    return Book;
}


