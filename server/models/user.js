'use strict'
const {
  Model
} = require('sequelize')

const { hashing } = require('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Booking, { foreignKey: 'user_id' })
    }
  };
  User.init({
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password cannot be empty' },
        notEmpty: { msg: 'Password cannot be empty' }
      }
    },
    user_role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User role cannot be empty' },
        notEmpty: { msg: 'User role cannot be empty' },
        isIn: {
          args: [['user', 'admin']],
          msg: 'User role must be only user or admin'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Email role cannot be empty' },
        notEmpty: { msg: 'Email role cannot be empty' },
      },
      unique: { msg: 'Email has been used' }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name cannot be empty' },
        notEmpty: { msg: 'Name cannot be empty' }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const hashedPassword = hashing(user.user_password)
        user.user_password = hashedPassword
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};