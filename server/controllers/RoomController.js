const { Room } = require('../models')

class RoomController {
  static async addRoom(req, res, next) {
    try {
      const { room_name, min_capacity, max_capacity } = req.body
      const newRoom = await Room.create({
        room_name, min_capacity, max_capacity
      })
      res.status(201).json({
        message: 'Created new room successfully',
        data: newRoom
      })
    } catch (err) {
      next(err)
    }
  }

  static async readAllRooms(req, res, next) {
    try {
      const rooms = await Room.findAll()
      res.status(200).json({
        data: rooms
      })
    } catch (err) {
      next(err)
    }
  }

  static async readRoomById(req, res, next) {
    try {
      const { id } = req.params
      const room = await Room.findByPk(id)
      if (!room) throw { status: 404, msg: 'Room not found' }
      res.status(200).json({ data: room })
    } catch (err) {
      next(err)
    }
  }

  static async updateRoom(req, res, next) {
    try {
      const { id } = req.params
      const { room_name, min_capacity, max_capacity } = req.body
      if (!room_name || !min_capacity || !max_capacity) throw { status: 400, msg: 'room_name, min_capacity, and max_capacity cannot be empty' }
      const roomUpdated = await Room.update(
        { room_name, min_capacity, max_capacity },
        { where: { id }, returning: true }
      )
      res.status(200).json({
        message: 'Updated room successfully',
        data: roomUpdated[1],
        affectedRows: roomUpdated[0]
      })
    } catch (err) {
      next(err)
    }
  }

  static async deleteRoom(req, res, next) {
    try {
      const { id } = req.params
      const affectedRows = await Room.destroy({ where: { id } })
      res.status(200).json({
        message: 'Deleted room successfully',
        data: req.room,
        affectedRows
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = RoomController