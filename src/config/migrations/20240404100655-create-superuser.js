'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();
    const [superuserRole] = await queryInterface.bulkInsert('Roles', [
      { name: 'superuser', createdAt: currentDate, updatedAt: currentDate }
    ], { returning: true });

    const hashedPassword = await bcrypt.hash('admin', 10);

    await queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        username: 'admin',
        full_name: 'Super User',
        email: 'admin@example.com',
        password: hashedPassword,
        image: null,
        role: JSON.stringify({ id: superuserRole.id, name: superuserRole.name }),
        createdAt: currentDate, 
        updatedAt: currentDate 
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { username: 'admin' });

    await queryInterface.bulkDelete('Roles', { name: 'superuser' });
  }
};

// npx sequelize-cli db:migrate --url 'postgres://postgres:master@localhost:5433/Education'