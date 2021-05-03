const router = require('express').Router()
const RoomController = require('../controllers/RoomController.js')
const authentication = require('../middleware/authentication.js')
const authorization = require('../middleware/authorization.js')
const findRoom = require('../middleware/findRoom.js')

router.get('/', authentication, RoomController.readAllRooms)
router.get('/:id', authentication, RoomController.readRoomById)
router.post('/', authentication, authorization, RoomController.addRoom)
router.put('/:id', authentication, authorization, findRoom, RoomController.updateRoom)
router.delete('/:id', authentication, authorization, findRoom, RoomController.deleteRoom)

module.exports = router