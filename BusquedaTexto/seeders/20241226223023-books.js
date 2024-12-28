'use strict';

const books = require('./books.json')
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * title, author, description, isbn, href, published, createdAt, updatedAt
     * 
     */
    const queryBooks = books.map(book => {
      book.createdAt = new Date()
      book.updatedAt = new Date()
      book.isbn = faker.commerce.isbn(13)
      book.published = new Date(book.published)
      book.stock = Math.floor(Math.random() * 20)

      return book
    })

    await queryInterface.bulkInsert('books', queryBooks)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('books', null, {})
  }
};
