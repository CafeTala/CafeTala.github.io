const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dbChoice: process.env.DB_CHOICE || 'sqlite',
  dbUri: process.env.DB_URI,
  corsOrigin: '*', // Allow all origins
  // ...other configurations...
};
