const UserService = require('../src/services/UserService');
const SQLiteRepository = require('../src/repositories/SQLiteRepository');
const config = require('../src/config');

describe('UserService', () => {
  let userService;
  let sqliteRepo;

  beforeEach(() => {
    sqliteRepo = new SQLiteRepository(':memory:', 'users');
    userService = new UserService(null, sqliteRepo);

    // Ensure the correct repository is used based on the configuration
    config.dbChoice = 'sqlite';

    // Create the users table
    return new Promise((resolve, reject) => {
      sqliteRepo.db.run(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT NOT NULL UNIQUE,
          preferences TEXT
        )
      `, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  });

  afterEach(() => {
    // Close the database connection
    sqliteRepo.db.close();
  });

  test('should get user by id from database', async () => {
    const userId = 1;
    const userData = { id: userId, name: 'John Doe', email: 'john@example.com', phone: '1234567890', preferences: JSON.stringify({ favoriteCurrencies: [], primaryCurrency: '' }) };

    // Insert a user into the database
    await new Promise((resolve, reject) => {
      sqliteRepo.db.run(`
        INSERT INTO users (name, email, phone, preferences)
        VALUES (?, ?, ?, ?)
      `, [userData.name, userData.email, userData.phone, userData.preferences], function (err) {
        if (err) reject(err);
        userData.id = this.lastID;
        resolve();
      });
    });

    const result = await userService.getUserById(userId);

    expect(result).toEqual(userData);
  });

  test('should create a new user', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com', phone: '1234567890', preferences: JSON.stringify({ favoriteCurrencies: [], primaryCurrency: '' }) };

    const result = await userService.createUser(userData);

    // Ensure the result contains the userData properties and an id
    expect(result).toMatchObject({
      id: expect.any(Number),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      preferences: userData.preferences
    });

    // Verify the user was inserted into the database
    const insertedUser = await new Promise((resolve, reject) => {
      sqliteRepo.db.get(`SELECT * FROM users WHERE id = ?`, [result.id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });

    expect(insertedUser).toMatchObject(userData);
  });

  // ...additional tests for updateUser, deleteUser, and getAllUsers...
});
