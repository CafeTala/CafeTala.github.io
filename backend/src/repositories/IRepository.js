class IRepository {
  async getById(id) {
    throw new Error('Method not implemented');
  }

  async getAll() {
    throw new Error('Method not implemented');
  }

  async create(data) {
    throw new Error('Method not implemented');
  }

  async update(id, data) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = IRepository;
