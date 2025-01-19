# Controllers

## authController.js

### Description
Handles user authentication, including login, signup, and OTP verification.

### Functions

#### login
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

#### sendOtp
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

#### getTokenForGuest
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

## productController.js

### Description
Handles product-related operations, including fetching product lists and details.

### Functions

#### getProductList
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

#### getProductDetails
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

## storeController.js

### Description
Handles store-related operations, including fetching store lists and details.

### Functions

#### getStoreList
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

#### getStoreDetails
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
