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

module.exports = {
  BooksController
}