'use strict';
const { Deferrable } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log(123)
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        references: {
          model: "Users", // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  }
};