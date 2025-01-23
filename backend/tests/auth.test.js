require('dotenv').config(); // Add this line to load environment variables
const request = require('supertest');
const app = require('../src/app'); // Assuming app.js exports the Express app
const redisAdapter = require('../src/utils/redisAdapter');

describe('Authentication APIs', () => {
  beforeAll(async () => {
    console.log('Running beforeAll hook');
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const redisUp = await redisAdapter.isRedisUp();
    if (!redisUp) {
      throw new Error('Redis is not available');
    }
    console.log('Redis is up and JWT_SECRET is defined');
  });

  // Set a timeout for all tests in this suite
  jest.setTimeout(60000); // Increase timeout to 60 seconds

  it('should get token for guest users', async () => {
    console.log('Running test: should get token for guest users');
    const res = await request(app)
      .post('/auth/guest')
      .send({ deviceId: 'test-device-id' });
    console.log('Guest Token Response:', res.body); // Add log
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.guest).toHaveProperty('id');
  });

  it('should send OTP', async () => {
    console.log('Running test: should send OTP');
    const res = await request(app)
      .post('/auth/otp')
      .send({ phone: '1234567890' });
    console.log('Send OTP Response:', res.body); // Add log
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('OTP sent successfully.');
  });

  it('should login/signup user', async () => {
    console.log('Running test: should login/signup user');
    const res = await request(app)
      .post('/auth/login')
      .send({ phone: '1234567890', otp: '123456' });
    console.log('Login Response:', res.body); // Add log
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user).toHaveProperty('phone');
  });

  it('should return error for invalid OTP', async () => {
    console.log('Running test: should return error for invalid OTP');
    const res = await request(app)
      .post('/auth/login')
      .send({ phone: '1234567890', otp: '000000' });
    console.log('Invalid OTP Response:', res.body); // Add log
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid OTP');
  });

  it('should return error for missing fields', async () => {
    console.log('Running test: should return error for missing fields');
    const res = await request(app)
      .post('/auth/login')
      .send({ phone: '1234567890' });
    console.log('Missing Fields Response:', res.body); // Add log
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });
});
