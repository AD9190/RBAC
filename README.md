# Role-Based Access Control (RBAC) System

This project implements a Role-Based Access Control (RBAC) system using Node.js, Express, MongoDB, and JWT for authentication and authorization. The system allows users to register, log in, and access different routes based on their roles.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Models](#models)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/rbac.git
    cd rbac
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the necessary environment variables (see [Environment Variables](#environment-variables)).

4. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

1. **Register a new user**:  
   Send a `POST` request to `/api/auth/register` with `username`, `password`, and `role` in the request body.

2. **Login**:  
   Send a `POST` request to `/api/auth/login` with `username` and `password` in the request body. The response will include a JWT token.

3. **Access protected routes**:  
   Use the JWT token to access protected routes by including it in the `Authorization` header as a Bearer token.

## Project Structure
```plaintext
rbac/
├── src/
│   ├── config/
│   │   └── dbConnect.js          # Database connection logic
│   ├── controllers/
│   │   └── authController.js     # Handles authentication logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # Verifies JWT tokens
│   │   └── roleMiddleware.js     # Role-based access control logic
│   ├── models/
│   │   └── userModel.js          # Defines the User schema
│   ├── routes/
│   │   ├── authRoutes.js         # Routes for authentication endpoints
│   │   └── userRoutes.js         # Routes for user-related endpoints
│   └── index.js                  # Main server file
├── .env                          # Environment variables
├── package.json                  # Project dependencies and scripts
└── README.md                     # Project documentation
```

### `dbConnect.js`

This file contains the configuration for connecting to the MongoDB database using Mongoose. It exports an asynchronous function `dbConnect` that attempts to connect to the database using the connection string provided in the environment variables. If the connection is successful, it logs a success message; otherwise, it logs an error message and exits the process.

### `authController.js`

This file contains the controller functions for handling user registration and login:

- **`register`**:  
  Handles user registration. It receives `username`, `password`, and `role` from the request body, hashes the password using bcrypt, creates a new user, and saves it to the database. If successful, it responds with a success message and the created user; otherwise, it responds with an error message.

- **`login`**:  
  Handles user login. It receives `username` and `password`, verifies the credentials, and generates a JWT token if valid. Responds with the token on success or an error message on failure.

### `authMiddleware.js`

This file contains middleware for verifying JWT tokens. The `verifyToken` function:

1. Checks if the `Authorization` header is present and starts with "Bearer".
2. Extracts and verifies the token using the secret key from the environment variables.
3. Attaches decoded user information to the request object if valid; otherwise, responds with a `401 Unauthorized` status.

### `roleMiddleware.js`

This file contains middleware for role-based access control. The `authorizeRoles` function:

1. Takes a list of allowed roles as arguments.
2. Verifies if the user's role (attached to the request object by `authMiddleware`) is included in the allowed roles.
3. Responds with a `403 Forbidden` status if not authorized; otherwise, proceeds with the request.

### `userModel.js`

This file defines the User schema using Mongoose. The schema includes:

- `username`: Unique string for the user's username.
- `password`: Hashed password.
- `role`: Enum with possible values "admin", "moderator", and "user".

The schema also includes timestamps for tracking creation and update times.

### `authRoutes.js`

Defines the routes for user authentication:

- `POST /api/auth/register`: Calls the `register` function from the `authController`.
- `POST /api/auth/login`: Calls the `login` function from the `authController`.

### `userRoutes.js`

Defines routes for accessing user-specific resources based on roles:

- `GET /api/user/admin`: Accessible only by users with the "admin" role.
- `GET /api/user/moderator`: Accessible by users with "admin" or "moderator" roles.
- `GET /api/user/user`: Accessible by users with "user", "admin", or "moderator" roles.

### `index.js`

The main entry point of the application:

- Sets up the Express server.
- Connects to the MongoDB database.
- Defines middleware and routes.
- Starts the server on the specified `PORT` or defaults to `5000`.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

- `PORT`: Port number for the server.
- `JWT_SECRET`: Secret key for signing/verifying JWT tokens.
- `CONNECTION_STRING`: MongoDB connection string.

Example `.env` file:
```env
PORT=7001
JWT_SECRET=your_jwt_secret
CONNECTION_STRING=your_mongodb_connection_string
```

###API Endpoints
##Authentication Routes
-POST `/api/auth/register`: Register a new user. Requires username, password, and role.
-POST `/api/auth/login`: Login and receive a JWT token. Requires username and password.
-User Routes
-GET `/api/user/admin`: Accessible only by "admin" role users.
-GET `/api/user/moderator`: Accessible by "admin" or "moderator" role users.
-GET `/api/user/user`: Accessible by "user", "admin", or "moderator" role users.

###Middleware
### `authMiddleware.js`
-Verifies JWT tokens from the Authorization header.
-Attaches decoded user data to the request object.
-Responds with 401 Unauthorized if invalid or missing.

### `roleMiddleware.js`
-Verifies if the user's role is allowed for the route.
-Responds with 403 Forbidden if not authorized.
-Models

### `userModel.js`

-Defines the schema with:

-username: Unique string for user identification.
-password: Hashed password.
-role: Enum ("admin", "moderator", "user").
