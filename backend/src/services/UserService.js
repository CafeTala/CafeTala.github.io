const config = require('../config'); // Assuming you have a config file

class UserService {
  constructor(mongoRepo, redisRepo, sqliteRepo) {
    this.mongoRepo = mongoRepo;
    this.redisRepo = redisRepo;
    this.sqliteRepo = sqliteRepo;
    this.dbRepo = this.getRepository();
  }

  getRepository() {
    const dbChoice = config.dbChoice;
    if (dbChoice === 'mongo') {
      return this.mongoRepo;
    } else if (dbChoice === 'sqlite') {
      return this.sqliteRepo;
    } else {
      throw new Error('Invalid database choice');
    }
  }

  async getUserById(id) {
    let data = await this.redisRepo.getById(id);
    if (!data) {
      data = await this.dbRepo.getById(id);
      if (data) {
        await this.redisRepo.create(id, data);
      }
    }
    return data;
  }

  async getAllUsers() {
    return this.dbRepo.getAll();
  }

  async createUser(data) {
    const createdData = await this.dbRepo.create(data);
    if (createdData && createdData.id) {
      await this.redisRepo.create(createdData.id, createdData);
    }
    return createdData;
  }

  async updateUser(id, data) {
    const updatedData = await this.dbRepo.update(id, data);
    await this.redisRepo.update(id, updatedData);
    return updatedData;
  }

  async deleteUser(id) {
    await this.dbRepo.delete(id);
    await this.redisRepo.delete(id);
  }
}

module.exports = UserService;
