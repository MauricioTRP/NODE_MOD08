const db = require('../models');
const { User } = db

const UsersController = {}

UsersController.create = async (req, res, next) => {
  const data = req.body

  try {
    const user = await  User.create(data)

    return res.json(user)
  } catch (err) {
    console.error(err)

    return res.status(500).json({ message: 'Internal Server Error' })
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
    console.error(err)
    next(err)
  }
}


module.exports = { UsersController }
