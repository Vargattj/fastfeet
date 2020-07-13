"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("orders", "signature_id", {
      type: Sequelize.INTEGER,
      references: { model: "signatures", key: "id" },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('orders', 'signature_id')
  },
};
