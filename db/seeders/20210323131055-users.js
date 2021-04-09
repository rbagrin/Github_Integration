'use strict'
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user',
        password: 'user123',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'ritadoe',
        password: 'outofpasswordideas',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {})
  }
}
