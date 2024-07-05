const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // ou ':memory:' para persistência em memória
});

module.exports = sequelize;