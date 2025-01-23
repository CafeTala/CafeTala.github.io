import { setupWorker, rest } from 'msw';
import { setupServer } from 'msw/node';

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
    return res(ctx.json([
      {
        id: 'store-1',
        name: 'فروشگاه ۱',
        type: 'physical',
        image: 'store1.jpg',
        location: { latitude: 35.6892, longitude: 51.3890 },
        supportedCurrencies: ['IRR', 'USD'],
        contact: {
          phone: '۰۲۱-۱۲۳۴۵۶۷۸',
          email: 'store1@example.com',
          socialLinks: {
            facebook: 'store1_fb',
            instagram: 'store1_ig',
            twitter: 'store1_tw'
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
        }
      },
      {
        id: 'store-2',
        name: 'فروشگاه ۲',
        type: 'virtual',
        image: 'store2.jpg',
        location: { latitude: 34.0522, longitude: -118.2437 },
        supportedCurrencies: ['IRR', 'USD'],
        contact: {
          phone: '۰۲۱-۹۸۷۶۵۴۳۲',
          email: 'store2@example.com',
          socialLinks: {
            facebook: 'store2_fb',
            instagram: 'store2_ig',
            twitter: 'store2_tw'
          }
        },
        openHours: {
          monday: '۲۴ ساعته',
          tuesday: '۲۴ ساعته',
          wednesday: '۲۴ ساعته',
          thursday: '۲۴ ساعته',
          friday: '۲۴ ساعته',
          saturday: '۲۴ ساعته',
          sunday: '۲۴ ساعته'
        }
      }
    ]));
  }),
  rest.get('/api/stores/:id', (req, res, ctx) => {
    return res(ctx.json({
      id: req.params.id,
      name: `فروشگاه ${req.params.id}`,
      type: 'physical',
      image: `store${req.params.id}.jpg`,
      location: { latitude: 35.6892, longitude: 51.3890 },
      supportedCurrencies: ['IRR', 'USD'],
      contact: {
        phone: '۰۲۱-۱۲۳۴۵۶۷۸',
        email: `store${req.params.id}@example.com`,
        socialLinks: {
          facebook: `store${req.params.id}_fb`,
          instagram: `store${req.params.id}_ig`,
          twitter: `store${req.params.id}_tw`
        },
        openHours: {
          monday: '۹:۰۰ - ۲۱:۰۰',
          tuesday: '۹:۰۰ - ۲۱:۰۰',
          wednesday: '۹:۰۰ - ۲۱:۰۰',
          thursday: '۹:۰۰ - ۲۱:۰۰',
          friday: '۹:۰۰ - ۲۱:۰۰',
          saturday: '۱۰:۰۰ - ۲۰:۰۰',
          sunday: 'تعطیل'
        }
      }
    }));
  }),
  rest.get('/defaultStoreImage.jpg', (req, res, ctx) => {
    return res(
      ctx.set('Content-Type', 'image/jpeg'),
      ctx.body(binaryImage)
    );
  })
];

const base64Image = 'data:image/jpeg;base64,...'; // your base64 encoded image string
const binaryImage = Uint8Array.from(atob(base64Image.split(',')[1]), c => c.charCodeAt(0));

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
