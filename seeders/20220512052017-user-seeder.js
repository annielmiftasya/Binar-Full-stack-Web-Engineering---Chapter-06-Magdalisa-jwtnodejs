'use strict';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'superadmin',
        password:  bcrypt.hashSync('12345678',salt),
        email:'superadmin@gmail.com',
        role:'superadmin',
        createdAt: new Date(). toISOString (),
        updatedAt: new Date(). toISOString ()
      }]);
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
