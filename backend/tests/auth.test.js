require('dotenv').config(); // Add this line to load environment variables
const request = require('supertest');
const app = require('../src/app'); // Assuming app.js exports the Express app
const db = require('../src/models');
const { OTP } = require('../src/models'); // Add this line to import OTP model

describe('Authentication APIs', () => {
  beforeAll(async () => {
    console.log('Running beforeAll hook');
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    console.log('JWT_SECRET is defined');
  });

  beforeEach(async () => {
    await db.sequelize.sync({ force: true }); // Reset database before each test
  });

  // Set a timeout for all tests in this suite
  jest.setTimeout(60000); // Increase timeout to 60 seconds

  it('should get token for guest users', async (done) => {
    console.log('Running test: should get token for guest users');
    const res = await request(app)
      .post('/auth/guest')
      .send({ deviceId: 'test-device-id' });
    console.log('Guest Token Response:', res.body); // Add log
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.guest).toHaveProperty('id');
    done();
  }, 10000); // Set individual test timeout to 10 seconds

  it('should send OTP', async (done) => {
    console.log('Running test: should send OTP');
    const res = await request(app)
      .post('/auth/otp')
      .send({ phone: '1234567890' });
    console.log('Send OTP Response:', res.body); // Add log
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('OTP sent successfully.');
    done();
  }, 10000); // Set individual test timeout to 10 seconds

  it('should login/signup user', async (done) => {
    console.log('Running test: should login/signup user');
    
    // Generate and store OTP for the test
    const phone = '1234567890';
    const otp = '123456';
    await OTP.create({ phone, otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) });

    const res = await request(app)
      .post('/auth/login')
      .send({ phone, otp });
    console.log('Login Response:', res.body); // Add log
    if (res.statusCode !== 200) {
      console.error('Error Response:', res.body);
    }
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user).toHaveProperty('phone');
    done();
  }, 10000); // Set individual test timeout to 10 seconds

  it('should return error for invalid OTP', async (done) => {
    console.log('Running test: should return error for invalid OTP');
    const res = await request(app)
      .post('/auth/login')
      .send({ phone: '1234567890', otp: '000000' });
    console.log('Invalid OTP Response:', res.body); // Add log
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid OTP');
    done();
  }, 10000); // Set individual test timeout to 10 seconds

  it('should return error for missing fields', async (done) => {
    console.log('Running test: should return error for missing fields');
    const res = await request(app)
      .post('/auth/login')
      .send({ phone: '1234567890' });
    console.log('Missing Fields Response:', res.body); // Add log
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
    done();
  }, 10000); // Set individual test timeout to 10 seconds
});
