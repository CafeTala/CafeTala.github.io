const sqlite3 = require('sqlite3').verbose();

async function initializeSQLiteDatabase(dbPath) {
  const db = new sqlite3.Database(dbPath);

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL UNIQUE,
      preferences TEXT
    )
  `;

  // Add more table creation queries here as needed

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(createUsersTable, (err) => {
        if (err) reject(err);
      });

      // Run more table creation queries here as needed

      resolve();
    });
  });
}

module.exports = {
  initializeSQLiteDatabase,
};
