const express = require('express')
const { ViewsController } = require('../controllers')

const router = express.Router()

router.get("/", ViewsController.home)

module.exports = {
  ViewsRouter: router
}