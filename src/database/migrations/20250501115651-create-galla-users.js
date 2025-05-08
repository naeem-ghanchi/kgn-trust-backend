"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("galla_users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      pincode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      mobile: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {        
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("galla_users"),
};
