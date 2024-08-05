module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn("Properties", "owner", {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "id",
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn("Properties", "owner");
  },
};
