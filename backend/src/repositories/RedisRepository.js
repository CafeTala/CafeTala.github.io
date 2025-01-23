const IRepository = require('./IRepository');
const redisAdapter = require('../utils/redisAdapter');

class RedisRepository extends IRepository {
  constructor() {
    super();
  }

  async getById(id) {
    return redisAdapter.get(id);
  }

  async getAll() {
    throw new Error('Method not implemented for Redis');
  }

  async create(id, data) {
    return redisAdapter.setex(id, 3600, JSON.stringify(data)); // TTL of 1 hour
  }

  async update(id, data) {
    return redisAdapter.setex(id, 3600, JSON.stringify(data)); // TTL of 1 hour
  }

  async delete(id) {
    return redisAdapter.del(id);
  }
}

module.exports = RedisRepository;
