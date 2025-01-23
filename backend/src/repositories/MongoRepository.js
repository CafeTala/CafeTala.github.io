const IRepository = require('./IRepository');
const mongoose = require('mongoose');

class MongoRepository extends IRepository {
  constructor(model) {
    super();
    this.model = model;
  }

  async getById(id) {
    return this.model.findById(id);
  }

  async getAll() {
    return this.model.find();
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = MongoRepository;
