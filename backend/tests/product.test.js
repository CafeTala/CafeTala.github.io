// const request = require('supertest');
// const app = require('../src/app'); // Assuming app.js exports the Express app

// describe('Product APIs', () => {
//   it('should get product list', async () => {
//     const res = await request(app)
//       .get('/products')
//       .query({ currency: 'USD', limit: 10 });
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toBeInstanceOf(Array);
//   });

//   it('should get product details', async () => {
//     const productId = 'test-product-id'; // Replace with a valid product ID
//     const res = await request(app)
//       .get(`/products/${productId}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('id', productId);
//     expect(res.body).toHaveProperty('name');
//     expect(res.body).toHaveProperty('price');
//   });
// });
