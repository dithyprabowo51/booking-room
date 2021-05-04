'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasMany(models.Booking, { foreignKey: 'room_id' })
    }
  };
  Room.init({
    room_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Room name cannot be empty' },
        notEmpty: { msg: 'Room name cannot be empty' },
      }
    },
    min_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Minimal capacity cannot be empty' },
        notEmpty: { msg: 'Minimal capacity cannot be empty' },
        min: {
          args: [[1]],
          msg: 'Minimal capacity is 1'
        }
      }
    },
    max_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Maximal capacity cannot be empty' },
        notEmpty: { msg: 'Maximal capacity cannot be empty' }
      }
    }
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};