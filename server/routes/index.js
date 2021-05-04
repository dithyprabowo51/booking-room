const router = require('express').Router()
const userRoutes = require('./userRoutes.js')
const roomRoutes = require('./roomRoutes.js')
const adminBookingRoutes = require('./adminBookingRoutes.js')
const userBookingRoutes = require('./userBookingRoutes.js')

router.use(userRoutes)
router.use('/rooms', roomRoutes)
router.use('/admin-bookings', adminBookingRoutes)
router.use('/user-bookings', userBookingRoutes)

module.exports = router