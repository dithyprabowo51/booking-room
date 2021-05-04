const { Booking } = require('../models')

const findBooking = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) throw { status: 404, msg: 'Booking data not found' }
    const booking = await Booking.findByPk(id)
    if (!booking) throw { status: 404, msg: 'Booking data not found' }
    req.booking = booking
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = findBooking