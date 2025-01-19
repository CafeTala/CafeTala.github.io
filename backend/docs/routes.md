# Routes

## authRoutes.js

### Description
Defines the routes for user authentication.

### Routes

#### POST /auth/guest
- **Description**: Get Token for Guest Users
- **Input**: 
  ```json
  {
    "deviceId": "string"
  }
  ```
- **Output**: 
  ```json
  {
    "token": "string",
    "guest": {
      "id": "string"
    }
  }
  ```

#### POST /auth/otp
- **Description**: Send OTP
- **Input**: 
  ```json
  {
    "phone": "string"
  }
  ```
- **Output**: 
  ```json
  {
    "message": "OTP sent successfully."
  }
  ```

#### POST /auth/login
- **Description**: User Login/Signup
- **Input**: 
  ```json
  {
    "phone": "string",
    "otp": "string"
  }
  ```
- **Output**: 
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

## productRoutes.js

### Description
Defines the routes for product-related operations.

### Routes

#### GET /products
- **Description**: Get Product List
- **Query Params**: 
  ```json
  {
    "currency": "string",
    "storeId": "string",
    "search": "string",
    "rating": "number",
    "limit": "number",
    "skip": "number"
  }
  ```
- **Output**: 
  ```json
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
        "reviews": "number"
      },
      "store": {
        "id": "string",
        "name": "string"
      }
    }
  ]
  ```

#### GET /products/:id
- **Description**: Get Product Details
- **Output**: 
  ```json
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
      "reviews": "number",
      "comments": [
        {
          "id": "string",
          "star": "number",
          "text": "string",
          "likes": "number"
        }
      ],
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

## storeRoutes.js

### Description
Defines the routes for store-related operations.

### Routes

#### GET /stores
- **Description**: Get Store List
- **Output**: 
  ```json
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
  ```

#### GET /stores/:id
- **Description**: Get Store Details
- **Output**: 
  ```json
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
  ```
