const router = require('express').Router()
const userRoutes = require('./userRoutes.js')

router.use(userRoutes)

module.exports = router