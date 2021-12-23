'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jiras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      url_jira: {
        type: Sequelize.INTEGER
      },
      usuario: {
        type: Sequelize.STRING
      },
      contraseya: {
        type: Sequelize.INTEGER
      },
      telefono: {
        type: Sequelize.STRING
      },
      tipo_jira: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jiras');
  }
};