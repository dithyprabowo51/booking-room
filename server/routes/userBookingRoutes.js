const router = require('express').Router()
const BookingUserController = require('../controllers/BookingUserController.js')
const authentication = require('../middleware/authentication.js')
const findBooking = require('../middleware/findBooking.js')

router.get('/', authentication, BookingUserController.readBookings)
router.get('/:id', authentication, BookingUserController.readBookingById)
router.post('/', authentication, BookingUserController.addBooking)
router.put('/:id', authentication, BookingUserController.updateBooking)
router.delete('/:id', authentication, findBooking, BookingUserController.deleteBooking)

module.exports = router