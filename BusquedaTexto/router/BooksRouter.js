const { BooksController } = require('../controllers')
const express = require('express')


const router = express.Router()

router.get("/search", BooksController.search)
router.get("/", BooksController.getAllBook)
router.get("/:id", BooksController.findByIdBook)
router.post("/", BooksController.createBook)
router.delete("/:id", BooksController.delete)
router.put("/:id", BooksController.updateBook)

module.exports = {
  BooksRouter: router
}