const { BooksController } = require('../controllers')
const express = require('express')


const router = express.Router()

router.get("/search", BooksController.search)

module.exports = {
  BooksRouter: router
}