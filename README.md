# E-Commerce Backend API

A robust and scalable RESTful API for e-commerce applications built with Node.js, Express, and MongoDB.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization with JWT
- Role-based access control (User, Seller, Admin)
- Product management with image upload
- Shopping cart functionality
- Order processing
- Payment integration
- Seller dashboard with statistics
- Category management
- Comprehensive API documentation with Swagger

## Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **API Documentation**: Swagger/OpenAPI 3.0
- **Input Validation**: Custom validation middleware
- **Error Handling**: Custom error handling middleware
- **Security Features**: 
  - bcrypt for password hashing
  - helmet for HTTP headers security
  - cors for Cross-Origin Resource Sharing
  - rate limiting for API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/e-commerce-backend.git

cd e-commerce-backend
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
yarn dev
```

## Environment Variables

Create a .env file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
```

## API Documentation

API documentation is available through Swagger UI at:
```
http://localhost:3000/api-docs
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

## API Endpoints

### Users
- POST `/api/users/register` - Register a new user
- GET `/api/users/login` - User login
- GET `/api/users/me` - Get current user profile
- PUT `/api/users/update` - Update user profile
- DELETE `/api/users/delete` - Delete user account

### Products
- POST `/api/product/create` - Create a new product
- PUT `/api/product/update` - Update a product
- DELETE `/api/product/delete` - Delete a product

### Cart
- GET `/api/cart/get` - Get user's cart
- POST `/api/cart/add` - Add item to cart
- PUT `/api/cart/update` - Update cart item quantity
- DELETE `/api/cart/delete` - Remove item from cart

### Orders
- POST `/api/orders/add` - Create a new order
- DELETE `/api/orders/delete/{orderId}` - Archive an order

### Categories
- POST `/api/category/create` - Create a new category
- PUT `/api/category/update` - Update a category
- DELETE `/api/category/delete` - Delete a category

### Payments
- POST `/api/payment/add` - Process a new payment

### Seller Statistics
- GET `/api/seller/{sellerId}/products` - Get seller's products
- GET `/api/seller/{sellerId}/orders` - Get seller's orders
- GET `/api/seller/{sellerId}/statistics` - Get seller statistics
- GET `/api/seller/{sellerId}/performance` - Get product performance
- GET `/api/seller/{sellerId}/daily-metrics` - Get daily metrics

### Statistics
- GET `/api/statistics/overall` - Get overall sales statistics
- GET `/api/statistics/by-category` - Get sales by category
- GET `/api/statistics/top-products` - Get top selling products
- GET `/api/statistics/daily-report` - Get daily sales report

## Error Handling

The API uses a consistent error response format:

```json
{
  "status": 400,
  "message": "Error message",
  "error": "Detailed error description"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
