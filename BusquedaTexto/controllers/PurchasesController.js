const db = require('../models')
const { Purchase } = db

const PurchasesController = {}

PurchasesController.create = async (req, res, next) => {
  const data = req.body

  try {
    const purchase = await Purchase.createOrder(data)

    return res.json(purchase)
  } catch (err) {
    next(err)
  }
}

PurchasesController.delete = async (req, res, next) => {
  const { id } = req.params

  try {
    await Purchase.returnOrder(id)

    return res.json({ message: 'Compra eliminada' })
  } catch (err) {
    next(err)
  }
}


module.exports = {
  PurchasesController
}
