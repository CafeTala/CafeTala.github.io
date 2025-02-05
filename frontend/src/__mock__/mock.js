import { setupWorker, rest } from 'msw';
import { setupServer } from 'msw/node';

const getRandomCoordinate = (center, radius) => {
  const y0 = center.latitude;
  const x0 = center.longitude;
  const rd = radius / 111300; // Convert meters to degrees

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const newLat = y + y0;
  const newLon = x + x0;

  return { latitude: newLat, longitude: newLon };
};

const center = { latitude: 36.2880, longitude: 59.6150 };
const radius = 2000; // 2 kilometers

const stores = Array.from({ length: 10 }, (_, i) => ({
  id: `store-${i + 1}`,
  name: `فروشگاه ${i + 1}`,
  type: 'physical',
  location: getRandomCoordinate(center, radius),
  supportedCurrencies: ['IRR', 'USD'],
  contact: {
    phone: `۰۲۱-${Math.floor(10000000 + Math.random() * 90000000)}`,
    email: `store${i + 1}@example.com`,
    socialLinks: {
      facebook: `store${i + 1}_fb`,
      instagram: `store${i + 1}_ig`,
      twitter: `store${i + 1}_tw`
    }
  },
  openHours: {
    monday: '۹:۰۰ - ۲۱:۰۰',
    tuesday: '۹:۰۰ - ۲۱:۰۰',
    wednesday: '۹:۰۰ - ۲۱:۰۰',
    thursday: '۹:۰۰ - ۲۱:۰۰',
    friday: '۹:۰۰ - ۲۱:۰۰',
    saturday: '۱۰:۰۰ - ۲۰:۰۰',
    sunday: 'تعطیل'
  },
  currentDay: 'monday'
}));

const handlers = [
  rest.post('/api/auth/otp', (req, res, ctx) => {
    return res(ctx.json({ message: 'OTP sent successfully.' }));
  }),
  rest.post('/api/auth/login', (req, res, ctx) => {
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
  rest.post('/api/auth/guest', (req, res, ctx) => {
    return res(ctx.json({
      token: 'mock-guest-token',
      guest: {
        id: req.body.deviceId
      }
    }));
  }),
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json([
      {
        id: 'product-1',
        name: 'محصول ۱',
        price: { gold: 10, fiat: 100000 },
        image: 'product1.jpg',
        rating: { average: 4.5, reviews: 10 },
        store: { id: 'store-1', name: 'فروشگاه ۱' }
      },
      {
        id: 'product-2',
        name: 'محصول ۲',
        price: { gold: 20, fiat: 200000 },
        image: 'product2.jpg',
        rating: { average: 4.0, reviews: 20 },
        store: { id: 'store-2', name: 'فروشگاه ۲' }
      }
    ]));
  }),
  rest.get('/api/products/:id', (req, res, ctx) => {
    return res(ctx.json({
      id: req.params.id,
      name: `محصول ${req.params.id}`,
      description: `توضیحات برای محصول ${req.params.id}`,
      price: { gold: 10, fiat: 100000 },
      image: `product${req.params.id}.jpg`,
      rating: {
        average: 4.5,
        reviews: 10,
        comments: [
          { id: 'comment-1', star: 5, text: 'محصول عالی!', likes: 2 }
        ],
        details: {
          fiveStar: 5,
          fourStar: 3,
          threeStar: 1,
          twoStar: 1,
          oneStar: 0
        }
      },
      store: { id: 'store-1', name: 'فروشگاه ۱' }
    }));
  }),
  rest.get('/api/stores', (req, res, ctx) => {
    return res(ctx.json(stores));
  }),
  rest.get('/api/stores/:id', (req, res, ctx) => {
    const store = stores.find(store => store.id === req.params.id);
    return res(ctx.json(store));
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
