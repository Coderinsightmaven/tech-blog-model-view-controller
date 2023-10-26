
const { Sequelize } = require('sequelize');

// Replace with your database details
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' // or 'postgres', 'sqlite', etc.
});

module.exports = sequelize;
