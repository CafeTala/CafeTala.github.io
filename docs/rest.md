GET /stores
remove priceRange
add supportedCurrencies
add 

GET /stores/:id
remove
---

## **REST APIs**

### **1. Authentication APIs**
#### **1.1 User Login/Signup**
- **Endpoint:** `POST /auth/login`
- **Input:**
  ```json
  {
    "phone": "string",
    "otp": "string" // optional for login
  }
  ```
- **Output:**
  ```json
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
  ```

---



---

### **2. Store APIs**

#### **2.1 Get Stores List**

- **Endpoint:** `GET /stores`
- **Query Params:**
  ```
  {
    "currency": "string",  // filter by supported currency
    "type": "string",      // physical or virtual
    "location": "lat,lon", // user location
    "radius": "number",     // optional for distance-based filtering
    "rating": "number",    // optional minimum average rating
    "limit": "number",     // optional limit of stores to return
    "skip": "number"       // optional skip the first X stores
  }
  ```
- **Output:**
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "type": "physical | virtual",
      "image": "string",
      "location": {
        "latitude": "number",
        "longitude": "number"
      },
      "supportedCurrencies": ["string"],
      "distance": "number", // in km
      "rating": {
        "average": "number",
        "reviews": "number" // total reviews
      },
      "isOpenNow": "boolean" // indicates if the store is currently open
    }

  ]
  ```

#### **2.2 Get Store Details**

- **Endpoint:** `GET /stores/:id`
- **Output:**
  ```json
  {
    "id": "string",
    "name": "string",
    "type": "physical | virtual",
    "image": "string",
    "supportedCurrencies": ["string"],
    "contact": {
      "phone": "string",
      "website": "string",
      "socialLinks": ["string"]
    },
    "workingHours": {
      "monday": {
        "open": "string", // e.g., "08:00 AM"
        "close": "string" // e.g., "10:00 PM"
      },
      "tuesday": {
        "open": "string", // e.g., "08:00 AM"
        "close": "string" // e.g., "10:00 PM"
      },
      "wednesday": {
        "open": "string", // e.g., "08:00 AM"
        "close": "string" // e.g., "10:00 PM"
      },
      "thursday": {
        "open": "string", // e.g., "08:00 AM"
        "close": "string" // e.g., "10:00 PM"
      },
      "friday": {
        "open": "string", // e.g., "08:00 AM"
        "close": "string" // e.g., "10:00 PM"
      },
      "saturday": {
        "open": "string", // e.g., "08:00 AM"
        "close": "string" // e.g., "10:00 PM"
      },
      "sunday": {
        "open": "string", // e.g., "08:00 AM"
        "close": "string" // e.g., "10:00 PM"
      }
    },
    "rating": {
      "average": "number",
      "reviews": "number", // total reviews
      "comments": [
        {
          "id": "string",
          "star": "number", // 1-5 stars
          "text": "string",
          "likes": "number",
          "date": "string"
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

  }
  ```

---

### **3. Product APIs**

#### **3.1 Get Product List**

- **Endpoint:** `GET /products`
- **Query Params:**
  ```
  {
    "currency": "string",   // filter by currency
    "storeId": "string",    // filter by store
    "search": "string",      // search by product name
    "rating": "number",     // optional minimum average rating
    "limit": "number",      // optional limit of products to return
    "skip": "number"        // optional skip the first X products
  }
  ```
- **Output:**
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "price": {
        "digiGold": "number",
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
  ```

#### **3.2 Get Product Details**

- **Endpoint:** `GET /products/:id`
- **Output:**
  ```json
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": {
      "digiGold": "number",
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
  ```

---

### **4. Miscellaneous APIs**

#### **4.1 Get Currencies**

- **Endpoint:** `GET /currencies`
- **Output:**
  ```json
  [
    {
      "name": "string",
      "symbol": "string",
      "type": "digital | fiat",
      "currentRate": "number"
    }

  ]
  ```

#### **4.2 Update User Preferences**

- **Endpoint:** `PUT /users/preferences`
- **Input:**
  ```json
  {
    "favoriteCurrencies": ["string"],
    "primaryCurrency": "string"

  }
  ```
- **Output:**
  ```json
  {
    "message": "Preferences updated successfully."

  }
  ```

---

