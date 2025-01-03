'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Books
    await queryInterface.addColumn('books', 'deletedAt', { type: Sequelize.DATE })
    await queryInterface.addColumn('Users', 'deletedAt', { type: Sequelize.DATE })
    await queryInterface.addColumn('Purchases', 'deletedAt', { type: Sequelize.DATE })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('books', 'deletedAt')
    await queryInterface.removeColumn('Users', 'deletedAt')
    await queryInterface.removeColumn('Purchases', 'deletedAt')
  }
};
