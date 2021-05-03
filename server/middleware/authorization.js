const authorization = (req, res, next) => {
  try {
    if (req.user.user_role !== 'admin') throw { status: 403, msg: 'You have no access' }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorization