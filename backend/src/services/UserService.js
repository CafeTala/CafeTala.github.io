const { User } = require('../models');

class UserService {
  constructor() {
  }

  async getUserById(id) {
    return User.findByPk(id);
  }

  async getAllUsers() {
    return User.findAll();
  }

  async createUser(data) {
    return User.create(data);
  }

  async updateUser(id, data) {
    const user = await User.findByPk(id);
    if (user) {
      return user.update(data);
    }
    return null;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (user) {
      return user.destroy();
    }
    return null;
  }
}

module.exports = UserService;
