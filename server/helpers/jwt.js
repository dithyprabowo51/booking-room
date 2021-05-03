const jwt = require('jsonwebtoken')

const generateToken = payload => {
  return jwt.sign(payload, 'secret')
}

const decodedToken = token => {
  try {
    const decoded = jwt.verify(token, 'secret')
    return decoded
  } catch (err) {
    // err
    return false
  }
}

module.exports = { generateToken, decodedToken }