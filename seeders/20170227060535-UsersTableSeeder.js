'use strict';

let shortid = require('shortid')
const crypto = require('crypto');
let base64 = require('base-64');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      name: 'Diky Arga',
      username: 'dikyarga',
      email: 'dikyarga.id@gmail.com',
      role: 'admin',
      salt: base64.encode('dikyarga.id@gmail.com'),
      password: crypto.createHmac('sha256', base64.encode('dikyarga.id@gmail.com'))
                     .update('secret')
                     .digest('hex'),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
