const router = require('express').Router()
const userRoutes = require('./userRoutes.js')
const roomRoutes = require('./roomRoutes.js')

router.use(userRoutes)
router.use('/rooms', roomRoutes)

module.exports = router