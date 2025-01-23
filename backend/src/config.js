const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dbChoice: process.env.DB_CHOICE || 'sqlite',
  dbUri: process.env.DB_URI,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  // ...other configurations...
};
