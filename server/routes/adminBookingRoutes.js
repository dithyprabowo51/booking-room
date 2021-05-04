const router = require('express').Router()
const BookingAdminController = require('../controllers/BookingAdminController.js')
const authentication = require('../middleware/authentication.js')
const authorization = require('../middleware/authorization.js')
const findBooking = require('../middleware/findBooking.js')

router.get('/', authentication, authorization, BookingAdminController.readAllBookings)
router.get('/:id', authentication, authorization, BookingAdminController.readBookingById)
router.post('/', authentication, authorization, BookingAdminController.addBooking)
router.put('/:id', authentication, authorization, findBooking, BookingAdminController.updateBooking)
router.delete('/:id', authentication, authorization, findBooking, BookingAdminController.deleteBooking)

module.exports = router