const express = require('express')
const { ViewsController } = require('../controllers')

const router = express.Router()

router.get("/", ViewsController.home)
router.get("/store", ViewsController.store)

module.exports = {
  ViewsRouter: router
}