const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Use ':memory:' for in-memory database or specify a file path
  logging: false, // Disable logging
});

const User = require('./User')(sequelize, Sequelize.DataTypes);
const OTP = require('./OTP')(sequelize, Sequelize.DataTypes);

// Set up associations
User.hasMany(OTP, { foreignKey: 'userId' });
OTP.belongsTo(User, { foreignKey: 'userId' });

const db = {
  sequelize,
  User,
  OTP,
  // Add more models here as needed
};

module.exports = db;
