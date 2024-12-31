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

UsersController.firstPurchase = async (req, res, next) => {
  const data = req.body

  try {
    const dataFormateada = validate(data)
  } catch (err) {
    next(err)
  }
}


module.exports = { UsersController }
