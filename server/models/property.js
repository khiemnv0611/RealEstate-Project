"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {
      // define association here
      Property.belongsTo(models.User, {
        foreignKey: "postedBy",
        as: "rPostedBy",
      });
      Property.belongsTo(models.User, {
        foreignKey: "owner",
        as: "rOwner",
      });
      Property.belongsTo(models.PropertyType, {
        foreignKey: "propertyTypeId",
        as: "rPropertyType",
      });
    }
  }
  Property.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      listingType: {
        type: DataTypes.ENUM,
        values: ["Bán", "Cho thuê"],
      },
      price: DataTypes.FLOAT,
      propertyTypeId: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM,
        values: ["Chờ duyệt", "Bị hủy", "Đã duyệt"],
      },
      isAvailable: DataTypes.BOOLEAN,
      images: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("images");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(arrayImages) {
          return this.setDataValue("images", JSON.stringify(arrayImages));
        },
      },
      featuredImage: DataTypes.STRING,
      postedBy: DataTypes.INTEGER,
      bedRoom: DataTypes.STRING,
      bathRoom: DataTypes.STRING,
      propertySize: DataTypes.FLOAT,
      yearBuilt: DataTypes.INTEGER,
      owner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Property",
    }
  );
  return Property;
};
