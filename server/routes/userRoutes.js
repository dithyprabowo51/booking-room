const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const authentication = require('../middleware/authentication.js')
const authorization = require('../middleware/authorization.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/users', authentication, authorization, UserController.readAllUsers)
router.patch('/users/:id', authentication, authorization, UserController.updateRoleUser)

module.exports = router