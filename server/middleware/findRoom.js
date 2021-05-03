const { Room } = require('../models')

const findRoom = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) throw { status: 404, msg: 'Room not found' }
    const room = await Room.findByPk(id)
    if (!room) throw { status: 404, msg: 'Room not found' }
    req.room = room
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = findRoom