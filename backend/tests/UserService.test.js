const UserService = require('../src/services/UserService');
const db = require('../src/models');
const config = require('../src/config');

describe('UserService', () => {
  let userService;

  beforeAll(async () => {
    // Ensure the correct repository is used based on the configuration
    config.dbChoice = 'sqlite';

    // Initialize the database and sync models
    await db.sequelize.sync();
    userService = new UserService();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await db.User.destroy({ where: {}, truncate: true });
  });

  afterAll(async () => {
    // Close the database connection
    await db.sequelize.close();
  });

  test('should get user by id from database', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com', phone: '1234567890', preferences: { favoriteCurrencies: [], primaryCurrency: '' } };

    // Insert a user into the database
    const createdUser = await userService.createUser(userData);

    const result = await userService.getUserById(createdUser.id);

    expect(result).toMatchObject(userData);
  });

  test('should create a new user', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com', phone: '1234567890', preferences: { favoriteCurrencies: [], primaryCurrency: '' } };

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
    const insertedUser = await userService.getUserById(result.id);

    expect(insertedUser).toMatchObject(userData);
  });

  // ...additional tests for updateUser, deleteUser, and getAllUsers...
});
