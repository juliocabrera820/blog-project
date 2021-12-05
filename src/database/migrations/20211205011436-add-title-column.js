'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Comments', 'title', { type: Sequelize.STRING} )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Comments', 'title')
  }
};
