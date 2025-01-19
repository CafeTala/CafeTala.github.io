## Documentation

For detailed API documentation, refer to the [backend/docs/all.md](backend/docs/all.md) file.

# Utils

## db.js

### Description
Handles database connection and configuration.

### Functions

#### connect
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

## helpers.js

### Description
Provides helper functions for various operations.

### Functions

#### formatResponse
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

#### handleError
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
