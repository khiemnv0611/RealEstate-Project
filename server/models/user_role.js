"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Role extends Model {
    static associate(models) {
      // define association here
      User_Role.belongsTo(models.Role, {
        foreignKey: "roleCode",
        targetKey: "code",
        as: "roleName",
      });
    }
  }
  User_Role.init(
    {
      userId: DataTypes.INTEGER,
      roleCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User_Role",
    }
  );
  return User_Role;
};
