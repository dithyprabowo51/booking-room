const { Booking } = require('../models')
const { Room } = require('../models')
const { User } = require('../models')

class BookingUserController {
  static async addBooking(req, res, next) {
    try {
      const { room_id, participants, date_booking, time_from_booking, time_to_booking } = req.body

      if (!room_id || !participants || !date_booking || !time_from_booking || !time_to_booking) throw { status: 400, msg: 'Invalid format data input' }

      const room = await Room.findByPk(room_id)
      if (!room) throw { status: 400, msg: 'Invalid room id' }

      const newBooking = await Booking.create({
        user_id: req.user.id, room_id, participants, date_booking, time_from_booking, time_to_booking
      })

      res.status(201).json({
        message: 'Added new booking successfully',
        data: newBooking
      })
    } catch (err) {
      next(err)
    }
  }

  static async readBookings(req, res, next) {
    try {
      const user_id = req.user.id
      const bookings = await Booking.findAll({
        include: [
          {
            model: User,
            where: { id: user_id }
          },
          {
            model: Room
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
      const booking = await Booking.findOne({
        where: { id, user_id: req.user.id }
      })
      if (!booking) throw { status: 404, msg: 'Booking data not found' }
      res.status(200).json({
        data: booking
      })
    } catch (err) {
      next(err)
    }
  }

  static async updateBooking(req, res, next) {
    try {
      const { id } = req.params
      const { room_id, participants, date_booking, time_from_booking, time_to_booking } = req.body
      if (!room_id || !participants || !date_booking || !time_from_booking || !time_to_booking) throw { status: 400, msg: 'Invalid format data input' }

      const bookingUpdated = await Booking.update(
        {
          room_id, participants, date_booking, time_from_booking, time_to_booking
        },
        {
          where: {
            id,
            user_id: req.user.id
          },
          returning: true
        }
      )
      if (bookingUpdated[0] < 1) throw { status: 404, msg: 'Booking data not found' }
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
      const affectedRows = await Booking.destroy({
        where: {
          id,
          user_id: req.user.id
        }
      })
      if (affectedRows < 1) throw { status: 404, msg: 'Booking data not found' }
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

module.exports = BookingUserController