const jwt = require('jsonwebtoken')

const generateToken = payload => {
  return jwt.sign(payload, 'secret')
}

module.exports = { generateToken }