const { sign, verify, decode } = require('jsonwebtoken')
const { envConfig } = require('../config')

const CreateSignature = (payload) => {
  return sign(payload, envConfig.JWT_SECRET, { expiresIn: "1d" })
}

const ValidateSignature = (req) => {
  const signature = req.cookies

  if(signature.Bearer) {
    try {
      const payload = verify(signature.Bearer, envConfig.JWT_SECRET, { algorithms: 'HS256' })
      req.user = payload // estamos agregando el usuario a "req"
  
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  CreateSignature,
  ValidateSignature
}

