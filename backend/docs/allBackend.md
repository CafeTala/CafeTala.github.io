# Backend Documentation

## Table of Contents
1. [Models](#models)
2. [Controllers](#controllers)
3. [Routes](#routes)
4. [Services](#services)
5. [Utils](#utils)

## Models

### userModel.js

#### Description
Defines the schema and model for users.

#### Schema
- **id**: UUID, Primary Key
- **phone**: String
- **preferences**: JSON (favoriteCurrencies, primaryCurrency)
- **createdAt**: DateTime
- **updatedAt**: DateTime

### storeModel.js

#### Description
Defines the schema and model for stores.

#### Schema
- **id**: UUID, Primary Key
- **name**: String
- **type**: String (physical/virtual)
- **image**: String
- **location**: JSON (latitude, longitude)
- **supportedCurrencies**: JSON (array)
- **contact**: JSON
  ```json
  {
    "phone": "string",
    "email": "string",
    "socialLinks": {
      "facebook": "string",
      "instagram": "string",
      "twitter": "string"
    }
  }
  ```
- **createdAt**: DateTime
- **updatedAt**: DateTime

### productModel.js

#### Description
Defines the schema and model for products.

#### Schema
- **id**: UUID, Primary Key
- **name**: String
- **description**: Text
- **price**: JSON (gold, fiat)
- **image**: String
- **storeId**: UUID (foreign key to Stores)
- **createdAt**: DateTime
- **updatedAt**: DateTime

### currencyModel.js

#### Description
Defines the schema and model for currencies.

#### Schema
- **id**: UUID, Primary Key
- **name**: String
- **symbol**: String
- **type**: String (digital/fiat)
- **currentRate**: Float (updated automatically by the system)
- **createdAt**: DateTime
- **updatedAt**: DateTime

## Controllers

### authController.js

#### Description
Handles user authentication, including login, signup, and OTP verification.

#### Functions

##### login
- **Description**: Authenticates a user using phone number and OTP.
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

##### sendOtp
- **Description**: Sends an OTP to the user's phone number.
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

##### getTokenForGuest
- **Description**: Generates a token for guest users.
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

### productController.js

#### Description
Handles product-related operations, including fetching product lists and details.

#### Functions

##### getProductList
- **Description**: Retrieves a list of products based on query parameters.
- **Input**: 
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

##### getProductDetails
- **Description**: Retrieves detailed information about a specific product.
- **Input**: 
  ```json
  {
    "id": "string"
  }
  ```
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

### storeController.js

#### Description
Handles store-related operations, including fetching store lists and details.

#### Functions

##### getStoreList
- **Description**: Retrieves a list of stores.
- **Input**: None
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

##### getStoreDetails
- **Description**: Retrieves detailed information about a specific store.
- **Input**: 
  ```json
  {
    "id": "string"
  }
  ```
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

## Routes

### authRoutes.js

#### Description
Defines the routes for user authentication.

#### Routes

##### POST /auth/guest
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

##### POST /auth/otp
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

##### POST /auth/login
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

### productRoutes.js

#### Description
Defines the routes for product-related operations.

#### Routes

##### GET /products
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

##### GET /products/:id
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

### storeRoutes.js

#### Description
Defines the routes for store-related operations.

#### Routes

##### GET /stores
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

##### GET /stores/:id
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

## Services

### authService.js

#### Description
Handles the business logic for user authentication.

#### Functions

##### generateToken
- **Description**: Generates a JWT token for a user.
- **Input**: 
  ```json
  {
    "userId": "string"
  }
  ```
- **Output**: 
  ```json
  {
    "token": "string"
  }
  ```

##### verifyOtp
- **Description**: Verifies the OTP sent to the user's phone.
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
    "isValid": "boolean"
  }
  ```

### productService.js

#### Description
Handles the business logic for product-related operations.

#### Functions

##### fetchProducts
- **Description**: Fetches a list of products based on query parameters.
- **Input**: 
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

##### fetchProductDetails
- **Description**: Fetches detailed information about a specific product.
- **Input**: 
  ```json
  {
    "id": "string"
  }
  ```
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

### storeService.js

#### Description
Handles the business logic for store-related operations.

#### Functions

##### fetchStores
- **Description**: Fetches a list of stores.
- **Input**: None
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

##### fetchStoreDetails
- **Description**: Fetches detailed information about a specific store.
- **Input**: 
  ```json
  {
    "id": "string"
  }
  ```
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

### userService.js

#### Description
Handles the business logic for user-related operations.

#### Functions

##### getUserDetails
- **Description**: Fetches detailed information about a specific user.
- **Input**: 
  ```json
  {
    "id": "string"
  }
  ```
- **Output**: 
  ```json
  {
    "id": "string",
    "phone": "string",
    "preferences": {
      "favoriteCurrencies": ["string"],
      "primaryCurrency": "string"
    },
    "createdAt": "DateTime",
    "updatedAt": "DateTime"
  }
  ```

##### updateUserPreferences
- **Description**: Updates the preferences of a specific user.
- **Input**: 
  ```json
  {
    "id": "string",
    "preferences": {
      "favoriteCurrencies": ["string"],
      "primaryCurrency": "string"
    }
  }
  ```
- **Output**: 
  ```json
  {
    "id": "string",
    "phone": "string",
    "preferences": {
      "favoriteCurrencies": ["string"],
      "primaryCurrency": "string"
    },
    "createdAt": "DateTime",
    "updatedAt": "DateTime"
  }
  ```

## Utils

### db.js

#### Description
Handles database connection and configuration.

#### Functions

##### connect
- **Description**: Establishes a connection to the database.
- **Input**: 
  ```json
  {
    "uri": "string"
  }
  ```
- **Output**: 
  ```json
  {
    "status": "string"
  }
  ```

### helpers.js

#### Description
Provides helper functions for various operations.

#### Functions

##### formatResponse
- **Description**: Formats the API response.
- **Input**: 
  ```json
  {
    "data": "object",
    "message": "string"
  }
  ```
- **Output**: 
  ```json
  {
    "status": "success",
    "data": "object",
    "message": "string"
  }
  ```

##### handleError
- **Description**: Handles errors and formats the error response.
- **Input**: 
  ```json
  {
    "error": "object"
  }
  ```
- **Output**: 
  ```json
  {
    "status": "error",
    "message": "string"
  }
  ```
