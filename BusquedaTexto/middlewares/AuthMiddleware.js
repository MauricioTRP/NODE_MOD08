const { ValidateSignature } = require('../utils')

const AuthMiddleware = (req, res, next) => {
  const signature = ValidateSignature(req)

  if(signature) {
    return next()
  } else {
    return res.status(401).json({ message: 'Usuario no autorizado' })
  }
}

module.exports = { 
  AuthMiddleware
}


