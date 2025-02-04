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
      },
      {
        id: 'store-3',
        name: 'فروشگاه ۳',
        type: 'physical',
        location: { latitude: 40.7128, longitude: -74.0060 },
        supportedCurrencies: ['IRR', 'USD'],
        contact: {
          phone: '۰۲۱-۳۴۵۶۷۸۹۰',
          email: 'store3@example.com',
          socialLinks: {
            facebook: 'store3_fb',
            instagram: 'store3_ig',
            twitter: 'store3_tw'
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
        id: 'store-4',
        name: 'فروشگاه ۴',
        type: 'virtual',
        location: { latitude: 51.5074, longitude: -0.1278 },
        supportedCurrencies: ['IRR', 'USD'],
        contact: {
          phone: '۰۲۱-۴۵۶۷۸۹۰۱',
          email: 'store4@example.com',
          socialLinks: {
            facebook: 'store4_fb',
            instagram: 'store4_ig',
            twitter: 'store4_tw'
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
      },
      {
        id: 'store-5',
        name: 'فروشگاه ۵',
        type: 'physical',
        location: { latitude: 48.8566, longitude: 2.3522 },
        supportedCurrencies: ['IRR', 'USD'],
        contact: {
          phone: '۰۲۱-۵۶۷۸۹۰۱۲',
          email: 'store5@example.com',
          socialLinks: {
            facebook: 'store5_fb',
            instagram: 'store5_ig',
            twitter: 'store5_tw'
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
        id: 'store-6',
        name: 'فروشگاه ۶',
        type: 'virtual',
        location: { latitude: 35.6895, longitude: 139.6917 },
        supportedCurrencies: ['IRR', 'USD'],
        contact: {
          phone: '۰۲۱-۶۷۸۹۰۱۲۳',
          email: 'store6@example.com',
          socialLinks: {
            facebook: 'store6_fb',
            instagram: 'store6_ig',
            twitter: 'store6_tw'
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
      },
      {
        id: 'store-7',
        name: 'فروشگاه ۷',
        type: 'physical',
        location: { latitude: 55.7558, longitude: 37.6173 },
        supportedCurrencies: ['IRR', 'USD'],
        contact: {
          phone: '۰۲۱-۷۸۹۰۱۲۳۴',
          email: 'store7@example.com',
          socialLinks: {
            facebook: 'store7_fb',
            instagram: 'store7_ig',
            twitter: 'store7_tw'
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
        id: 'store-8',
        name: 'فروشگاه ۸',
        type: 'virtual',
        location: { latitude: 39.9042, longitude: 116.4074 },
        supportedCurrencies: ['IRR', 'USD'],
        contact: {
          phone: '۰۲۱-۸۹۰۱۲۳۴۵',
          email: 'store8@example.com',
          socialLinks: {
            facebook: 'store8_fb',
            instagram: 'store8_ig',
            twitter: 'store8_tw'
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
      },
      {
        id: 'store-9',
        name: 'فروشگاه ۹',
        type: 'physical',
        location: { latitude: -33.8688, longitude: 151.2093 },
        supportedCurrencies: ['IRR', 'USD'],
        contact: {
          phone: '۰۲۱-۹۰۱۲۳۴۵۶',
          email: 'store9@example.com',
          socialLinks: {
            facebook: 'store9_fb',
            instagram: 'store9_ig',
            twitter: 'store9_tw'
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
        id: 'store-10',
        name: 'فروشگاه ۱۰',
        type: 'virtual',
        location: { latitude: 37.7749, longitude: -122.4194 },
        supportedCurrencies: ['IRR', 'USD'],
        contact: {
          phone: '۰۲۱-۰۱۲۳۴۵۶۷',
          email: 'store10@example.com',
          socialLinks: {
            facebook: 'store10_fb',
            instagram: 'store10_ig',
            twitter: 'store10_tw'
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
