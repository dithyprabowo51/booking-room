const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt.js')
const { generateToken } = require('../helpers/jwt.js')

class UserController {
  static async register(req, res, next) {
    try {
      const { email, user_password, name } = req.body
      const newUser = await User.create({
        email,
        user_password,
        name,
        user_role: 'user'
      })
      res.status(201).json({
        message: 'Created new user successfully',
        data: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          user_role: newUser.user_role,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt
        }
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, user_password } = req.body
      if (!email || !user_password) throw { status: 400, msg: 'Invalid email or password' }
      const user = await User.findOne({
        where: { email }
      })
      if (!user) throw { status: 400, msg: 'Invalid email or password' }
      const isValidPassword = comparePassword(user_password, user.user_password)
      if (!isValidPassword) throw { status: 400, msg: 'Invalid email or password' }
      const payload = {
        email: user.email,
        user_role: user.user_role
      }
      const access_token = generateToken(payload)
      res.status(200).json({ access_token, user_role: user.user_role })
    } catch (err) {
      next(err)
    }
  }

  static async readAllUsers(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['user_password'] }
      })
      res.status(200).json({
        data: users
      })
    } catch (err) {
      next(err)
    }
  }

  static async updateRoleUser(req, res, next) {
    try {
      const { id } = req.params
      const { user_role } = req.body

      const updateRole = await User.update(
        {
          user_role
        },
        {
          where: { id },
          returning: true
        }
      )

      res.status(200).json({
        message: 'Updated role successfully',
        data: updateRole[1],
        affectedRows: updateRole[0]
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController