"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Properties", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      listingType: {
        type: Sequelize.ENUM(["Bán", "Cho thuê"]),
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      propertyTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "PropertyTypes",
          key: "id",
        },
      },
      owner: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM(["Chờ duyệt", "Bị hủy", "Đã duyệt"]),
        defaultValue: "Chờ duyệt",
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      featuredImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      bedRoom: {
        type: Sequelize.INTEGER,
      },
      bathRoom: {
        type: Sequelize.INTEGER,
      },
      propertySize: {
        type: Sequelize.FLOAT,
      },
      yearBuilt: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Properties");
  },
};
