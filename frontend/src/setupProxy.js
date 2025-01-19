import { setupWorker, rest } from 'msw';
import { setupServer } from 'msw/node';

const handlers = [
  rest.post('/auth/otp', (req, res, ctx) => {
    return res(ctx.json({ message: 'OTP sent successfully.' }));
  }),
  rest.post('/auth/login', (req, res, ctx) => {
    return res(ctx.json({
      token: 'mock-token',
      user: {
        id: 'mock-user-id',
        phone: req.body.phone,
        preferences: {
          favoriteCurrencies: ['USD'],
          primaryCurrency: 'USD'
        }
      }
    }));
  }),
  rest.post('/auth/guest', (req, res, ctx) => {
    return res(ctx.json({
      token: 'mock-guest-token',
      guest: {
        id: req.body.deviceId
      }
    }));
  })
];

if (typeof window === 'undefined') {
  // Node.js environment
  console.log('Setting up server for Node.js environment');
  const server = setupServer(...handlers);
  server.listen();
} else {
  // Browser environment
  console.log('Setting up worker for browser environment');
  const worker = setupWorker(...handlers);
  worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js'
    }
  });
}
