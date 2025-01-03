const { Op } = require('sequelize') // Operadores en contexto de búsqueda
const db = require('../models')

const { Book, sequelize } = db

const BooksController = {}

BooksController.search = async (req, res, next) => {
  console.log(req.query)
  const { q: searchString } = req.query

  try {
    const books = await Book.findAll({
      where: {
        search_vector: {
          /**
           * @@ operador "MATCH" de operaciones de texto
           * sequelize.fn -> aplica funciones postgres
           * plainto_tsquery('spanish', <texto de busqueda>)
           */
          [Op.match]: sequelize.fn('plainto_tsquery', 'spanish', searchString)
        }
      }
    })

    // console.log(books[0]) // instancia del modelo
    // console.log(books[0]?.toJSON()) // data que trae el registro
    return res.json(books) // implicitamente usa toJSON para convertir libros
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

BooksController.createBook = async (req, res, next) => {
  const data = req.body
  try {
    const book = await Book.create(data)
    return res.json(book)
  } catch (err) {
    console.log(err)
    next(err)
  }

}
//lista los libros ya en la lista  GET /  
BooksController.getAllBook = async (req, res, next) => {
  try {
    const book = await Book.findAll()
    return res.json(book)
  } catch (err) {
    console.error(err)
    next(err)
  }
}
//buscador de libros por ID GET books/:id
BooksController.findByIdBook = async (req, res, next) => {
  const { id } = req.params
  try {
    const book = await Book.findByPk(id)
    if (!book) {
      return res.status(404).json({ message: ' Libro no Encontrado' })
    }
    return res.json(book)
  } catch (err) {
    console.error(err)
    next(err)
  }
}
//eliminar libros por ID PUT books/:id
BooksController.delete = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await Book.destroy({ where: { id } })
    if (!result) {
      return res.status(404).json({ message: 'Libro no encontrado' })
    }
    return res.json({ message: 'Libro eliminado' })
  } catch (err) {
    next(err)
  }
}
//actualizar libro por ID  DELETE book/:id
BooksController.updateBook = async (req, res, next) => {
  const data = req.body
  const { id } = req.params

  try {
    const book = await Book.update(data, { where: { id } })
    if (book[0] == 0) {
      return res.status(404).json({ message: 'Libros no se actualizo' })
    }
    return res.status(201).json({ message: 'Libro Actualizado' })
  } catch (err) {
    console.error(err)
    next(err)
  }
}

module.exports = {
  BooksController
}