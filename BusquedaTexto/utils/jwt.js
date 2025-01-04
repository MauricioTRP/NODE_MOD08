const { sign, verify } = require('jsonwebtoken')
const { envConfig } = require('../config')

const CreateSignature = (payload) => {
  return sign(payload, envConfig.JWT_SECRET, { expiresIn: "1d" })
}

module.exports = {
  CreateSignature
}

