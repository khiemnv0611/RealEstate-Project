"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
