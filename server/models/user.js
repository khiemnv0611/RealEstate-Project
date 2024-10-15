"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.MembershipPlans, {
        foreignKey: "membershipPlansId",
        as: "membershipPlan",
      });

      User.hasMany(models.User_Role, { foreignKey: "userId", as: "userRoles" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          const salt = bcrypt.genSaltSync(10);
          this.setDataValue("password", bcrypt.hashSync(value, salt));
        },
      },
      avatar: DataTypes.STRING,
      isAvailable: DataTypes.BOOLEAN,
      balance: DataTypes.FLOAT,
      membershipPlansId: DataTypes.INTEGER,
      planRegisterDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
