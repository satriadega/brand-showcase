"use strict";

const { encrypt } = require("../helpers/password");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "satriadega",
          email: "admin@mail.com",
          password: encrypt("admin"),
          role: "admin",
          phoneNumber: 55555,
          address: "Jl. Kasturi no. 5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */

    await queryInterface.bulkDelete("Users", null, {});
  },
};
