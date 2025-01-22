const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setEx).bind(client); // Correct method name is setEx
const delAsync = promisify(client.del).bind(client);

module.exports = {
  get: getAsync,
  setex: setexAsync,
  del: delAsync
};
