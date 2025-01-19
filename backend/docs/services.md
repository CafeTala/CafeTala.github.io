# Services

## authService.js

### Description
Handles the business logic for user authentication.

### Functions

#### generateToken
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

#### verifyOtp
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

## productService.js

### Description
Handles the business logic for product-related operations.

### Functions

#### fetchProducts
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

#### fetchProductDetails
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

## storeService.js

### Description
Handles the business logic for store-related operations.

### Functions

#### fetchStores
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

#### fetchStoreDetails
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
