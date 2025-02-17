# Cafe Tala Frontend

## Description

This is the frontend interface for Cafe Tala, providing a user interface for interacting with the backend services.

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/cafe-tala.git
    cd cafe-tala/frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the frontend application:
    ```sh
    npm run dev
    ```

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

## Documentation

For detailed frontend documentation, refer to the [docs/allFrontend.md](docs/allFrontend.md) file.
