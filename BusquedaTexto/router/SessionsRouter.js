const express = require('express')
const { SessionsController } = require('../controllers')

const router = express.Router()

router.post("/login", SessionsController.login)

module.exports = {
  SessionsRouter: router
}