const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Use ':memory:' for in-memory database or specify a file path
});

const User = require('./User')(sequelize, Sequelize.DataTypes);

// Add more models here as needed

const db = {
  sequelize,
  User,
  // Add more models here as needed
};

module.exports = db;
