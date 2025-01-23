const UserService = require('../src/services/UserService');
const MongoRepository = require('../src/repositories/MongoRepository');
const RedisRepository = require('../src/repositories/RedisRepository');
const SQLiteRepository = require('../src/repositories/SQLiteRepository');
const User = require('../src/models/User');
const config = require('../src/config');

jest.mock('../src/repositories/MongoRepository');
jest.mock('../src/repositories/RedisRepository');
jest.mock('../src/repositories/SQLiteRepository');

describe('UserService', () => {
  let userService;
  let mongoRepo;
  let redisRepo;
  let sqliteRepo;

  beforeEach(() => {
    mongoRepo = new MongoRepository(User);
    redisRepo = new RedisRepository();
    sqliteRepo = new SQLiteRepository(':memory:', 'users');
    userService = new UserService(mongoRepo, redisRepo, sqliteRepo);

    // Ensure the correct repository is used based on the configuration
    config.dbChoice = 'sqlite';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should get user by id from Redis if available', async () => {
    const userId = '123';
    const userData = { id: userId, name: 'John Doe' };
    redisRepo.getById.mockResolvedValue(userData);

    const result = await userService.getUserById(userId);

    expect(redisRepo.getById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(userData);
  });

  test('should get user by id from database if not in Redis and cache it', async () => {
    const userId = '123';
    const userData = { id: userId, name: 'John Doe' };
    redisRepo.getById.mockResolvedValue(null);
    sqliteRepo.getById.mockResolvedValue(userData);
    redisRepo.create.mockResolvedValue(null); // Ensure mock resolves

    const result = await userService.getUserById(userId);

    expect(redisRepo.getById).toHaveBeenCalledWith(userId);
    expect(sqliteRepo.getById).toHaveBeenCalledWith(userId);
    expect(redisRepo.create).toHaveBeenCalledWith(userId, userData);
    expect(result).toEqual(userData);
  });

  test('should create a new user and cache it in Redis', async () => {
    const userData = { name: 'John Doe' };
    const createdUserData = { id: '123', ...userData };
    sqliteRepo.create.mockResolvedValue(createdUserData);
    redisRepo.create.mockResolvedValue(null); // Ensure mock resolves

    const result = await userService.createUser(userData);

    expect(sqliteRepo.create).toHaveBeenCalledWith(userData);
    expect(redisRepo.create).toHaveBeenCalledWith(createdUserData.id, createdUserData);
    expect(result).toEqual(createdUserData);
  });

  // ...additional tests for updateUser, deleteUser, and getAllUsers...
});
