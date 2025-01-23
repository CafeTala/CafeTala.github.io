const IRepository = require('./IRepository');
const sqlite3 = require('sqlite3').verbose();

class SQLiteRepository extends IRepository {
  constructor(dbPath, tableName) {
    super();
    this.db = new sqlite3.Database(dbPath);
    this.tableName = tableName;
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM ${this.tableName}`, [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  async create(data) {
    const keys = Object.keys(data).join(',');
    const values = Object.values(data).map(() => '?').join(',');
    return new Promise((resolve, reject) => {
      this.db.run(`INSERT INTO ${this.tableName} (${keys}) VALUES (${values})`, Object.values(data), function (err) {
        if (err) reject(err);
        resolve({ id: this.lastID });
      });
    });
  }

  async update(id, data) {
    const updates = Object.keys(data).map(key => `${key} = ?`).join(',');
    return new Promise((resolve, reject) => {
      this.db.run(`UPDATE ${this.tableName} SET ${updates} WHERE id = ?`, [...Object.values(data), id], function (err) {
        if (err) reject(err);
        resolve({ changes: this.changes });
      });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM ${this.tableName} WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        resolve({ changes: this.changes });
      });
    });
  }
}

module.exports = SQLiteRepository;
