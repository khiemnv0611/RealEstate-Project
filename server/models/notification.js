"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // define association here
    }
  }
  Notification.init(
    {
      message: DataTypes.TEXT,
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      propertyId: DataTypes.INTEGER,
      isRead: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
