const ViewsController = {}

ViewsController.home = (req, res, next) => {
  res.render('home')
}

module.exports = {
  ViewsController
}