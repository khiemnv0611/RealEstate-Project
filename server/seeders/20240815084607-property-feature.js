"use strict";
const { property_features } = require("../utils/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("PropertyFeatures", property_features);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PropertyFeatures", null, {});
  },
};
