"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MembershipPlans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
