"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
    }
  }
  Comment.init(
    {
      text: DataTypes.TEXT,
      propertyId: DataTypes.INTEGER,
      uid: DataTypes.INTEGER,
      parentComment: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
