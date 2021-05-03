const bcrypt = require('bcryptjs')

const hashing = password => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

const comparePassword = (passwordInput, passwordHashed) => {
  return bcrypt.compareSync(passwordInput, passwordHashed)
}

module.exports = { hashing, comparePassword }