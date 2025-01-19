# Models

## userModel.js

### Description
Defines the schema and model for users.

### Schema
- **id**: UUID, Primary Key
- **phone**: String
- **preferences**: JSON (favoriteCurrencies, primaryCurrency)
- **createdAt**: DateTime
- **updatedAt**: DateTime

## storeModel.js

### Description
Defines the schema and model for stores.

### Schema
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

## productModel.js

### Description
Defines the schema and model for products.

### Schema
- **id**: UUID, Primary Key
- **name**: String
- **description**: Text
- **price**: JSON (gold, fiat)
- **image**: String
- **storeId**: UUID (foreign key to Stores)
- **createdAt**: DateTime
- **updatedAt**: DateTime

## currencyModel.js

### Description
Defines the schema and model for currencies.

### Schema
- **id**: UUID, Primary Key
- **name**: String
- **symbol**: String
- **type**: String (digital/fiat)
- **currentRate**: Float (updated automatically by the system)
- **createdAt**: DateTime
- **updatedAt**: DateTime