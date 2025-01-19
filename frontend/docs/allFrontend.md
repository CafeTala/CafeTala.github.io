# Frontend Documentation

## Table of Contents
1. [Components](#components)
2. [Pages](#pages)
3. [Styles](#styles)
4. [Mocks](#mocks)
5. [Testing](#testing)

## Components

### Header.js

#### Description
Renders the header of the application.

#### Props
- **title**: String - The title to display in the header.

### Footer.js

#### Description
Renders the footer of the application.

#### Props
- None

### ProductList.js

#### Description
Renders a list of products.

#### Props
- **products**: Array - An array of product objects to display.

## Pages

### HomePage.js

#### Description
Renders the homepage with a map and a list of stores.

#### Components Used
- Header
- Footer
- StoreList

### StoreDetailsPage.js

#### Description
Renders the details of a specific store.

#### Components Used
- Header
- Footer
- ProductList

### ProductDetailsPage.js

#### Description
Renders the details of a specific product.

#### Components Used
- Header
- Footer

### AuthPage.js

#### Description
Handles user authentication, including sending OTP and logging in.

#### Components Used
- None

## Styles

### main.css

#### Description
Contains the main styles for the application.

### theme.css

#### Description
Contains the theme-specific styles for the application.

## Mocks

### axios.js

#### Description
Mocks the axios library for testing purposes.

#### Mocked Endpoints
- **GET /products**: Returns a list of products.
- **GET /products/:id**: Returns the details of a specific product.
- **GET /stores**: Returns a list of stores.
- **GET /stores/:id**: Returns the details of a specific store.
- **GET /currencies**: Returns a list of currencies.
- **POST /auth/login**: Mocks user login.
- **POST /auth/otp**: Mocks sending OTP.
- **POST /auth/guest**: Mocks guest login.
- **PUT /users/preferences**: Mocks updating user preferences.

## Testing

### Running Tests

To run the frontend tests, use the following command:
```sh
npm test
```

### Running Tests with Mocks

To run the frontend tests with mocks, ensure that Jest is configured to use the axios mock. This is already set up in the `jest.config.js` file.

Run the tests:
```sh
npm test
```

### Running Tests without Mocks

To run the frontend tests without mocks, you need to remove or comment out the axios mock configuration in `jest.config.js`.

1. Open `jest.config.js`.
2. Comment out or remove the following line:
    ```javascript
    moduleNameMapper: {
      '^axios$': '<rootDir>/src/__mocks__/axios.js',
    },
    ```
3. Run the tests:
    ```sh
    npm test
    ```
