"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    static associate(models) {
      // define association here
    }
  }
  WishList.init(
    {
      uid: DataTypes.INTEGER,
      propertyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "WishList",
    }
  );
  return WishList;
};
