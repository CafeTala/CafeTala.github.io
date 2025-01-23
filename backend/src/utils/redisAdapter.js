const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  port: 6379
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('ready', () => {
  console.log('Redis client connected');
});

const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setEx).bind(client);
const delAsync = promisify(client.del).bind(client);
const pingAsync = promisify(client.ping).bind(client);

async function isRedisUp() {
  if (!client.connected) {
    await new Promise((resolve, reject) => {
      client.once('ready', resolve);
      client.once('error', reject);
    });
  }
  try {
    await pingAsync();
    return true;
  } catch (err) {
    console.error('Redis ping error:', err);
    return false;
  }
}

// Ensure Redis client is connected before performing operations
async function ensureConnected() {
  if (!client.connected) {
    await new Promise((resolve, reject) => {
      client.once('ready', resolve);
      client.once('error', reject);
    });
  }
}

module.exports = {
  get: async (key) => {
    await ensureConnected();
    return getAsync(key);
  },
  setex: async (key, ttl, value) => {
    await ensureConnected();
    return setexAsync(key, ttl, value);
  },
  del: async (key) => {
    await ensureConnected();
    return delAsync(key);
  },
  isRedisUp
};
