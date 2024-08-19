"use strict";
const { properties } = require("../utils/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Properties", properties);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Properties", null, {});
  },
};
