const request = require('supertest');
const app = require('../src/app'); // Assuming app.js exports the Express app

describe('Store APIs', () => {
  it('should get store list', async () => {
    const res = await request(app)
      .get('/stores');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get store details', async () => {
    const storeId = 'test-store-id'; // Replace with a valid store ID
    const res = await request(app)
      .get(`/stores/${storeId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', storeId);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('type');
  });
});
