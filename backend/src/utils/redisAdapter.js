const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
  port: 6379,
  host: '127.0.0.1', // Ensure the host is set correctly
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
  console.log('Checking if Redis is up');
  if (!client.connected) {
    console.log('Redis client not connected, waiting for connection');
    await new Promise((resolve, reject) => {
      client.once('ready', resolve);
      client.once('error', reject);
    });
  }
  try {
    await pingAsync();
    console.log('Redis ping successful');
    return true;
  } catch (err) {
    console.error('Redis ping error:', err);
    return false;
  }
}

// Ensure Redis client is connected before performing operations
async function ensureConnected() {
  console.log('Ensuring Redis client is connected');
  if (!client.connected) {
    console.log('Redis client not connected, waiting for connection');
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Redis connection timeout'));
      }, 5000); // Set timeout to 5 seconds

      client.once('ready', () => {
        clearTimeout(timeout);
        resolve();
      });
      client.once('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
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
  isRedisUp,
  ensureConnected // Export ensureConnected function
};
