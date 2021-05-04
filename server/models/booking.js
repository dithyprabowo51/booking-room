'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Room, { foreignKey: 'room_id' })
      Booking.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  };
  Booking.init({
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    participants: DataTypes.INTEGER,
    date_booking: DataTypes.DATE,
    time_from_booking: DataTypes.TIME,
    time_to_booking: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};