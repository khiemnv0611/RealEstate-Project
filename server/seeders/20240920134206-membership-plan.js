"use strict";
const { membership_plans } = require("../utils/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("MembershipPlans", membership_plans);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("MembershipPlans", null, {});
  },
};
