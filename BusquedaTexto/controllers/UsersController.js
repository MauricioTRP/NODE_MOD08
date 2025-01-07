const db = require('../models');
const { User } = db

const UsersController = {}

UsersController.create = async (req, res, next) => {
  const data = req.body

  try {
    const user = await  User.create(data)

    return res.json(user)
  } catch (err) {
    next(err)
  }
}

UsersController.update = async (req, res, next) => {
  const data = req.body
  const { id } = req.params

  try {
    const user = await User.update(data, { where: { id }, individualHooks: true });

    /**
     * user = await User.findByPk(id)
     * user.password = data.password
     * user.save()
     */

    return res.json(user)
  } catch (err) {
    next(err)
  }
}

//Eliminar user
UsersController.deleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.destroy({ where: { id } })
    if (!user) {
      return res.status(404).json({ message: 'Usuario no Encontrado' })
    }
    return res.status(201).json({ message: 'Libro eliminado' })
  } catch (err) {
    next(err)
  }
}

//buscar user por id
UsersController.findByidUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    return res.json(user)
  } catch (err) {
    next(err)
  }
}

//listar User
UsersController.getAllUser = async (req, res, next) => {
  try {
    const user = await User.findAll()
    return res.json(user)
  } catch (err) {
    next(err)
  }
}

module.exports = { UsersController }
