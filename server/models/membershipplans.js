"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MembershipPlans extends Model {
    static associate(models) {
      // define association here
      MembershipPlans.hasMany(models.User, {
        foreignKey: "membershipPlansId",
        as: "users",
      });
    }
  }
  MembershipPlans.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      description: DataTypes.TEXT,
      postLimit: DataTypes.INTEGER,
      postDate: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MembershipPlans",
    }
  );
  return MembershipPlans;
};
