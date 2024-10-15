"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    static associate(models) {
      // define association here
      Transactions.belongsTo(models.User, {
        foreignKey: "userId",
        as: "rUser",
      });
      Transactions.belongsTo(models.MembershipPlans, {
        foreignKey: "membershipPlansId",
        as: "rMembershipPlans",
      });
    }
  }
  Transactions.init(
    {
      name: DataTypes.STRING,
      amount: DataTypes.DECIMAL(10, 2),
      paymentMethod: DataTypes.STRING,
      transactionsType: {
        type: DataTypes.ENUM,
        values: ["Nạp tiền", "Mua gói"],
      },
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM,
        values: ["active", "canceled"],
        defaultValue: null,
      },
      userId: DataTypes.INTEGER,
      membershipPlansId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
