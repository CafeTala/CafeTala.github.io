const { User } = require('../models');

class UserRepository {
  async getById(id) {
    return User.findByPk(id);
  }

  async getAll() {
    return User.findAll();
  }

  async create(data) {
    return User.create(data);
  }

  async update(id, data) {
    const user = await User.findByPk(id);
    if (user) {
      return user.update(data);
    }
    return null;
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (user) {
      return user.destroy();
    }
    return null;
  }
}

module.exports = UserRepository;
