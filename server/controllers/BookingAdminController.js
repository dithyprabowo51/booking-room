const { Booking } = require('../models')
const { Room } = require('../models')
const { User } = require('../models')

class BookingAdminController {
  static async addBooking(req, res, next) {
    try {
      const { user_id, room_id, participants, date_booking, time_from_booking, time_to_booking } = req.body

      if (!user_id || !room_id || !participants || !date_booking || !time_from_booking || !time_to_booking) throw { status: 400, msg: 'Invalid format data input' }

      const user = await User.findByPk(user_id)
      if (!user) throw { status: 400, msg: 'Invalid user id' }
      const room = await Room.findByPk(room_id)
      if (!room) throw { status: 400, msg: 'Invalid room id' }

      const newBooking = await Booking.create({
        user_id, room_id, participants, date_booking, time_from_booking, time_to_booking
      })

      res.status(201).json({
        message: 'Added new booking successfully',
        data: newBooking
      })
    } catch (err) {
      next(err)
    }
  }

  static async readAllBookings(req, res, next) {
    try {
      const bookings = await Booking.findAll({
        include: [
          {
            model: Room,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          },
          {
            model: User,
            attributes: { exclude: ['user_password', 'createdAt', 'updatedAt'] }
          }
        ]
      })
      res.status(200).json({ data: bookings })
    } catch (err) {
      next(err)
    }
  }

  static async readBookingById(req, res, next) {
    try {
      const { id } = req.params
      const booking = await Booking.findByPk(id)
      if (!booking) throw { status: 404, msg: 'Booking data not found' }
      res.status(200).json({ data: booking })
    } catch (err) {
      next(err)
    }
  }

  static async updateBooking(req, res, next) {
    try {
      const { id } = req.params
      const { participants, date_booking, time_from_booking, time_to_booking } = req.body
      const bookingUpdated = await Booking.update(
        {
          participants, date_booking, time_from_booking, time_to_booking
        },
        {
          where: { id },
          returning: true
        }
      )
      res.status(200).json({
        message: 'Updated booking successfully',
        data: bookingUpdated[1],
        affectedRows: bookingUpdated[0]
      })
    } catch (err) {
      next(err)
    }
  }

  static async deleteBooking(req, res, next) {
    try {
      const { id } = req.params
      const affectedRows = await Booking.destroy({ where: { id } })
      res.status(200).json({
        message: 'Deleted booking successfully',
        data: req.booking,
        affectedRows
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = BookingAdminController