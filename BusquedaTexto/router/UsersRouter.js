const express = require('express')
const { UsersController } = require('../controllers')

const router = express.Router()

router.get("/", UsersController.getAllUser)
router.get("/:id", UsersController.findByidUser)
router.post("/", UsersController.create)
router.patch("/:id", UsersController.update);
router.delete("/:id", UsersController.deleteUser)

module.exports = {
  UsersRouter: router
}
