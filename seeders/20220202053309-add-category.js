"use strict";
const { User } = require("../models");
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const data = await User.findAll();
    const users = data.map(element => {
      return element.dataValues
    })
    if (users && users.length) {
      await queryInterface.bulkInsert(
        "categories",
        users.map((user) => {
          return {
            name: "Third Level",
            userId: user.id,
          };
        }),
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
