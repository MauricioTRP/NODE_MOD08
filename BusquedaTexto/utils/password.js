const { verify } = require('argon2')

/**
 * 
 * @param {string | Buffer} storedPassword - Password Almacenado en BD
 * @param {string | Buffer} providedPassword - Password entregado por usuario
 * @returns 
 */
const ValidatePassword = async (storedPassword, providedPassword) => {
  return await verify(storedPassword, providedPassword)
}

module.exports = { ValidatePassword }