const express = require('express')
const { PurchasesController } = require('../controllers')

const router = express.Router()

router.post("/", PurchasesController.create)
router.delete("/:id", PurchasesController.delete)


module.exports = {
  PurchasesRouter: router
}
