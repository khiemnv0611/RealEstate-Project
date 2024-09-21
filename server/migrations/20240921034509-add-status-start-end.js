"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Transactions", "startDate", {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("Transactions", "endDate", {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("Transactions", "status", {
      type: Sequelize.ENUM("active", "canceled"),
      defaultValue: null,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
