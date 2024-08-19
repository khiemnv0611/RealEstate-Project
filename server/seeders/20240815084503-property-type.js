"use strict";
const { property_types } = require("../utils/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("PropertyTypes", property_types);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PropertyTypes", null, {});
  },
};
