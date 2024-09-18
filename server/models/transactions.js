"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
