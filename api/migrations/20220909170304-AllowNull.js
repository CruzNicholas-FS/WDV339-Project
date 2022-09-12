'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("SpotifyTokens", "createdAt", {allowNull:true, type: Sequelize.DATE})
    await queryInterface.changeColumn("SpotifyTokens", "updatedAt", {allowNull:true, type: Sequelize.DATE})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.changeColumn("SpotifyTokens", "createdAt", {allowNull:false, type: Sequelize.DATE})
     await queryInterface.changeColumn("SpotifyTokens", "updatedAt", {allowNull:false, type: Sequelize.DATE})
  }
};
