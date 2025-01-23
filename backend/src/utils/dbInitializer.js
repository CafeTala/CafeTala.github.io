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

  const createStoresTable = `
    CREATE TABLE IF NOT EXISTS stores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      image TEXT,
      location TEXT,
      supportedCurrencies TEXT,
      contact TEXT,
      openHours TEXT
    )
  `;

  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price TEXT,
      image TEXT,
      storeId INTEGER,
      FOREIGN KEY (storeId) REFERENCES stores(id)
    )
  `;

  const createCurrenciesTable = `
    CREATE TABLE IF NOT EXISTS currencies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      symbol TEXT NOT NULL,
      type TEXT NOT NULL,
      currentRate REAL
    )
  `;

  const createOTPsTable = `
    CREATE TABLE IF NOT EXISTS OTPs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT NOT NULL,
      otp TEXT NOT NULL,
      expiresAt DATETIME NOT NULL
    )
  `;

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(createUsersTable, (err) => {
        if (err) reject(err);
      });

      db.run(createStoresTable, (err) => {
        if (err) reject(err);
      });

      db.run(createProductsTable, (err) => {
        if (err) reject(err);
      });

      db.run(createCurrenciesTable, (err) => {
        if (err) reject(err);
      });

      db.run(createOTPsTable, (err) => {
        if (err) reject(err);
      });

      resolve();
    });
  });
}

module.exports = {
  initializeSQLiteDatabase,
};
