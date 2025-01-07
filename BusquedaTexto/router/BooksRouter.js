const { BooksController } = require('../controllers')
const { AuthMiddleware } = require('../middlewares')
const express = require('express')


const router = express.Router()

// Parte "pública"
router.get("/search", BooksController.search)
router.get("/", BooksController.getAllBook)
router.get("/:id", BooksController.findByIdBook)

router.use(AuthMiddleware)
// Parte privada
router.post("/", BooksController.createBook)
// router.delete("/:id", AuthMiddleware,BooksController.delete)
router.delete("/:id", BooksController.delete)
router.put("/:id", BooksController.updateBook)

module.exports = {
  BooksRouter: router
}