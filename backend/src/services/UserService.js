const UserRepository = require('../repositories/UserRepository');

class UserService {
  constructor() {
    this.userRepo = new UserRepository();
  }

  async getUserById(id) {
    return this.userRepo.getById(id);
  }

  async getAllUsers() {
    return this.userRepo.getAll();
  }

  async createUser(data) {
    return this.userRepo.create(data);
  }

  async updateUser(id, data) {
    return this.userRepo.update(id, data);
  }

  async deleteUser(id) {
    return this.userRepo.delete(id);
  }
}

module.exports = UserService;
