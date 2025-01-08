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

//Buscar compras
PurchasesController.getAllPurchases = async (req, res, next) => {
  const purchase = await Purchase.findAll()

  try {
    return res.json(purchase)
  } catch (err) {
    next(err)
  }
}

PurchasesController.findByIdPurchases = async (req, res, next) => {
  const { id } = req.params
  try {
    const purchase = await Purchase.findByPk(id)
    if (!purchase) {
      return res.status(404).json({ message: ' Compra no Encontrado' })
    }
    return res.json(purchase)
  } catch (err) {
    next(err)
  }

}

module.exports = {
  PurchasesController
}
