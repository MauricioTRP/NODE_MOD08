const ViewsController = {}

ViewsController.home = (req, res, next) => {
  res.render('home')
}

ViewsController.store = (req, res, next) => {
  res.render('store')
}

module.exports = {
  ViewsController
}