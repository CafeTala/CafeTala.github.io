const request = require('supertest');
const app = require('../src/app'); // Assuming app.js exports the Express app

describe('Authentication APIs', () => {
  it('should get token for guest users', async () => {
    const res = await request(app)
      .post('/auth/guest')
      .send({ deviceId: 'test-device-id' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.guest).toHaveProperty('id');
  });

  it('should send OTP', async () => {
    const res = await request(app)
      .post('/auth/otp')
      .send({ phone: '1234567890' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('OTP sent successfully.');
  });

  it('should login/signup user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ phone: '1234567890', otp: '123456' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user).toHaveProperty('phone');
  });
});
