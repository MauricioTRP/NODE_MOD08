'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    toJSON() {
      const book = this.dataValues
      delete book?.search_vector

      return book
    }

    static associate(models) {
      // define association here
      const { Purchase } = models
      this.hasMany(Purchase)
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT,
    isbn: DataTypes.STRING,
    href: DataTypes.STRING,
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 0, msg: 'Stock debe ser mayor que cero'}
      },
      defaultValue: 0
    },
    published: DataTypes.DATEONLY,
    search_vector: DataTypes.TSVECTOR
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books' // nombre de tabla 'books'
  });
  return Book;
};