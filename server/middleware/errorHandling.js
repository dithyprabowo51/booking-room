const errorHandling = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(error => error.message)
    return res.status(400).json({ errorMessage: errors })
  }
  if (err.status) {
    return res.status(err.status).json({
      message: err.msg
    })
  }
  res.status(500).json(err)
}

module.exports = errorHandling