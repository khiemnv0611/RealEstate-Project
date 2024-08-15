"use strict";
const { user_roles } = require("../utils/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("User_Roles", user_roles);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User_Roles", null, {});
  },
};
