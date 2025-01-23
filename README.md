# Cafe Tala Project

## Project Structure

```
cafe-tala/
├── backend/
│   ├── docs/
│   │   └── all.md
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   └── storeController.js
│   │   ├── models/
│   │   │   ├── userModel.js
│   │   │   ├── storeModel.js
│   │   │   ├── productModel.js
│   │   │   └── currencyModel.js
│   │   ├── repositories/
│   │   │   ├── UserRepository.js
│   │   │   ├── SQLiteRepository.js
│   │   │   └── IRepository.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   ├── storeService.js
│   │   │   └── UserService.js
│   │   ├── utils/
│   │   │   ├── db.js
│   │   │   ├── dbInitializer.js
│   │   │   └── helpers.js
│   │   └── app.js
│   ├── tests/
│   │   ├── auth.test.js
│   │   ├── product.test.js
│   │   └── store.test.js
│   ├── .gitignore
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── ProductList.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── StoreDetailsPage.js
│   │   │   └── ProductDetailsPage.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   │       ├── main.css
│   │       └── theme.css
│   ├── .gitignore
│   ├── package.json
│   └── README.md
```

## Description

This project is a full-stack application for Cafe Tala, providing APIs for user authentication, product management, and store management, along with a frontend interface for users.

## Setup

### Backend

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/cafe-tala.git
    cd cafe-tala/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the `backend` directory and add the necessary environment variables.

4. Initialize the SQLite database:
    ```sh
    node src/utils/dbInitializer.js
    ```

5. Run the backend application:
    ```sh
    npm start
    ```

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the `frontend` directory and add the necessary environment variables.

4. Run the frontend application:
    ```sh
    npm run dev
    ```

## Testing

### Backend

To run the backend tests, use the following command:
```sh
npm test
```

### Frontend

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

## Documentation

For detailed API documentation, refer to the [backend/docs/all.md](backend/docs/all.md) file.
