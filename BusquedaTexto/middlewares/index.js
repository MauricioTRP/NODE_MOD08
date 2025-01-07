const { errorHandler } = require('./ErrorMiddleware')
const { AuthMiddleware } = require('./AuthMiddleware')

module.exports = {
  errorHandler,
  AuthMiddleware
}
