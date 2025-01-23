const UserService = require('../src/services/UserService');
const SQLiteRepository = require('../src/repositories/SQLiteRepository');
const User = require('../src/models/User');
const config = require('../src/config');

jest.mock('../src/repositories/SQLiteRepository');

describe('UserService', () => {
  let userService;
  let sqliteRepo;

  beforeEach(() => {
    sqliteRepo = new SQLiteRepository(':memory:', 'users');
    userService = new UserService(null, sqliteRepo);

    // Ensure the correct repository is used based on the configuration
    config.dbChoice = 'sqlite';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should get user by id from database', async () => {
    const userId = '123';
    const userData = { id: userId, name: 'John Doe' };
    sqliteRepo.getById.mockResolvedValue(userData);

    const result = await userService.getUserById(userId);

    expect(sqliteRepo.getById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(userData);
  });

  test('should create a new user', async () => {
    const userData = { name: 'John Doe' };
    const createdUserData = { id: '123', ...userData };
    sqliteRepo.create.mockResolvedValue(createdUserData);

    const result = await userService.createUser(userData);

    expect(sqliteRepo.create).toHaveBeenCalledWith(userData);
    expect(result).toEqual(createdUserData);
  });

  // ...additional tests for updateUser, deleteUser, and getAllUsers...
});
