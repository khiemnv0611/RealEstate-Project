"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    static associate(models) {
      // define association here
    }
  }
  Submission.init(
    {
      propertyId: DataTypes.INTEGER,
      uid: DataTypes.INTEGER,
      message: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};
