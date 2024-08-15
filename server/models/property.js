"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Property.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
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
          return this.setDataValue("image", JSON.stringify(arrayImages));
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
