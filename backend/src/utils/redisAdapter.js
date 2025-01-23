const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setEx).bind(client);
const delAsync = promisify(client.del).bind(client);
const pingAsync = promisify(client.ping).bind(client);

async function isRedisUp() {
  try {
    await pingAsync();
    return true;
  } catch (err) {
    console.error('Redis ping error:', err);
    return false;
  }
}

module.exports = {
  get: getAsync,
  setex: setexAsync,
  del: delAsync,
  isRedisUp
};
