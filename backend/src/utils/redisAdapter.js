const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);
const delAsync = promisify(client.del).bind(client);

module.exports = {
  get: async (key) => {
    return await getAsync(key);
  },
  setex: async (key, ttl, value) => {
    return await setexAsync(key, ttl, value);
  },
  del: async (key) => {
    return await delAsync(key);
  }
};
