Database Tables

1. Users

Fields:

id: UUID, Primary Key

phone: String

preferences: JSON (favoriteCurrencies, primaryCurrency)

createdAt: DateTime

updatedAt: DateTime

2. Stores

Fields:

id: UUID, Primary Key

name: String

type: String (physical/virtual)

image: String

location: JSON (latitude, longitude)

supportedCurrencies: JSON (array)

contact: JSON

{
  "phone": "string",
  "email": "string",
  "socialLinks": {
    "facebook": "string",
    "instagram": "string",
    "twitter": "string"
  }
}

createdAt: DateTime

updatedAt: DateTime

3. Products

Fields:

id: UUID, Primary Key

name: String

description: Text

price: JSON (gold, fiat)

image: String

storeId: UUID (foreign key to Stores)

createdAt: DateTime

updatedAt: DateTime

4. Currencies

Fields:

id: UUID, Primary Key

name: String

symbol: String

type: String (digital/fiat)

currentRate: Float (updated automatically by the system)

createdAt: DateTime

updatedAt: DateTime

REST APIs

1. Authentication APIs

1.1 Get Token for Guest Users

Endpoint: POST /auth/guest

Input:

{
  "deviceId": "string"
}

Output:

{
  "token": "string",
  "guest": {
    "id": "string"
  }
}

1.2 Send OTP

Endpoint: POST /auth/otp

Input:

{
  "phone": "string"
}

Output:

{
  "message": "OTP sent successfully."
}

1.3 User Login/Signup

Endpoint: POST /auth/login

Input:

{
  "phone": "string",
  "otp": "string"
}

Output:

{
  "token": "string",
  "user": {
    "id": "string",
    "phone": "string",
    "preferences": {
      "favoriteCurrencies": ["string"],
      "primaryCurrency": "string"
    }
  }
}

2. Store APIs

2.1 Get Store List

Endpoint: GET /stores

Output:

[
  {
    "id": "string",
    "name": "string",
    "type": "string",
    "image": "string",
    "location": {
      "latitude": "number",
      "longitude": "number"
    },
    "supportedCurrencies": ["string"],
    "contact": {
      "phone": "string",
      "email": "string",
      "socialLinks": {
        "facebook": "string",
        "instagram": "string",
        "twitter": "string"
      }
    }
  }
]

2.2 Get Store Details

Endpoint: GET /stores/:id

Output:

{
  "id": "string",
  "name": "string",
  "type": "string",
  "image": "string",
  "location": {
    "latitude": "number",
    "longitude": "number"
  },
  "supportedCurrencies": ["string"],
  "contact": {
    "phone": "string",
    "email": "string",
    "socialLinks": {
      "facebook": "string",
      "instagram": "string",
      "twitter": "string"
    }
  }
}

3. Product APIs

3.1 Get Product List

Endpoint: GET /products

Query Params:

{
  "currency": "string",   // filter by currency
  "storeId": "string",    // filter by store
  "search": "string",      // search by product name
  "rating": "number",     // optional minimum average rating
  "limit": "number",      // optional limit of products to return
  "skip": "number"        // optional skip the first X products
}

Output:

[
  {
    "id": "string",
    "name": "string",
    "price": {
      "gold": "number",
      "fiat": "number"
    },
    "image": "string",
    "rating": {
      "average": "number",
      "reviews": "number" // total reviews
    },
    "store": {
      "id": "string",
      "name": "string"
    }
  }
]

3.2 Get Product Details

Endpoint: GET /products/:id

Output:

{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": {
    "gold": "number",
    "fiat": "number"
  },
  "image": "string",
  "rating": {
    "average": "number",
    "reviews": "number", // total reviews
    "comments": [
      {
        "id": "string",
        "star": "number", // 1-5 stars
        "text": "string",
        "likes": "number"
      }
    ], // user comments
    "details": {
      "fiveStar": "number",
      "fourStar": "number",
      "threeStar": "number",
      "twoStar": "number",
      "oneStar": "number"
    }
  },
  "store": {
    "id": "string",
    "name": "string"
  }
}

4. Miscellaneous APIs

4.1 Get Currencies

Endpoint: GET /currencies

Output:

[
  {
    "name": "string",
    "symbol": "string",
    "type": "digital | fiat",
    "currentRate": "number"
  }
]

4.2 Update User Preferences

Endpoint: PUT /users/preferences

Input:

{
  "favoriteCurrencies": ["string"],
  "primaryCurrency": "string"
}

Output:

{
  "message": "Preferences updated successfully."
}

1. صفحه اصلی: نقشه و لیست فروشگاه‌ها (Homepage)

این صفحه هسته اصلی تجربه کاربری است و بهینه‌سازی آن اهمیت بالایی دارد.

الف) طراحی کلی نقشه و لیست:

نمای نقشه:

نقشه پویا که مکان فروشگاه‌ها را با نشانگرهای رنگی (Pins) نمایش می‌دهد.

فروشگاه‌های مجازی (بدون مکان فیزیکی): نشانگر خاص یا حاشیه خدمات (مثلاً دایره‌ای که محدوده خدمات را نشان می‌دهد).

عملکرد زوم: در حالت زوم بیشتر، نشانگرها به نام و اطلاعات کلی فروشگاه تغییر شکل می‌دهند.

دکمه موقعیت کاربر: برای بازگشت به مکان فعلی کاربر (موقعیت مکانی از طریق GPS خوانده می‌شود).

لیست فروشگاه‌ها:

در حالت نقشه بزرگ: لیست فروشگاه‌ها در پایین به صورت اسکرول افقی کوچک نمایش داده می‌شود.

هر کارت شامل:

عکس فروشگاه (در صورت نبود عکس، نمایش عکس پیش‌فرض).

نام فروشگاه.

فاصله از کاربر (در صورت فروشگاه حضوری).

نوع فروشگاه (فیزیکی یا مجازی).

دکمه نشان کردن (آیکون ستاره).

2. صفحه جزئیات فروشگاه (Store Details Page)

الف) اطلاعات کلی فروشگاه:

عکس بزرگ فروشگاه در بالای صفحه.

اطلاعات کلیدی:

نام فروشگاه.

نوع فروشگاه (فیزیکی یا مجازی).

ارزهای پشتیبانی‌شده (آیکون‌ها).

شماره تماس و لینک شبکه‌های اجتماعی/وب‌سایت.

آدرس یا محدوده خدمات (نمایش روی نقشه).

ب) بخش محصولات فروشگاه:

لیستی از محصولات به صورت گرید، هر محصول شامل:

تصویر، نام، قیمت (با ارز اصلی کاربر).

دکمه اضافه کردن به لیست علاقه‌مندی‌ها (آیکون قلب).

امکان فیلتر بر اساس:

دسته‌بندی محصولات.

قیمت.

رتبه‌بندی.

در دسترس بودن.

ج) بخش نظرات و امتیازات:

نمایش امتیاز کلی فروشگاه.

لیست نظرات کاربران.

امکان مرتب‌سازی بر اساس جدیدترین یا مفیدترین نظر.

دکمه "گزارش نظر نامناسب" برای هر نظر.

3. سیستم مدیریت ارزها و نرخ تبدیل

نرخ‌های تبدیل ارز به صورت خودکار و لحظه‌ای توسط سیستم مدیریت شده و از منابع معتبر به‌روزرسانی می‌شود.

کاربران نیازی به وارد کردن نرخ دستی ندارند.

4. محدودیت‌های پلتفرم

در حال حاضر پلتفرم فقط برای دستگاه‌های موبایل بهینه‌سازی شده است و از تبلت و دسکتاپ پشتیبانی نمی‌کند.

