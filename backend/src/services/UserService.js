const config = require('../config'); // Assuming you have a config file

class UserService {
  constructor(mongoRepo, sqliteRepo) {
    this.mongoRepo = mongoRepo;
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
    const data = await this.dbRepo.getById(id);
    return data;
  }

  async getAllUsers() {
    return this.dbRepo.getAll();
  }

  async createUser(data) {
    const createdData = await this.dbRepo.create(data);
    return createdData;
  }

  async updateUser(id, data) {
    const updatedData = await this.dbRepo.update(id, data);
    return updatedData;
  }

  async deleteUser(id) {
    await this.dbRepo.delete(id);
  }
}

module.exports = UserService;
