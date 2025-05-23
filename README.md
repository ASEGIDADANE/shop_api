# E-commerce API

A robust and scalable RESTful API for e-commerce applications built with Node.js, Express, and TypeScript.

## Features

- 🔐 Secure Authentication & Authorization
- 📦 Product Management
- 👥 User Management
- 🛒 Shopping Cart Operations
- 🔒 JWT Token-based Security
- 📝 Input Validation using Zod
- 🗄️ MongoDB Database Integration
- 🏗️ TypeScript for Type Safety

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Bcrypt for Password Hashing
- Zod for Schema Validation

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middleware/     # Custom middleware functions
├── models/        # Database models
├── routes/        # API routes
├── services/      # Business logic
├── app.ts         # Express app configuration
└── server.ts      # Server entry point
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ecommerce_api.git
cd ecommerce_api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Build the project:
```bash
npm run build
```

5. Start the server:
```bash
npm start
```

For development:
```bash
npm run dev
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart Endpoints
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:
```json
{
  "status": "error",
  "message": "Error message description"
}
```

## Security

- Password hashing using bcrypt
- JWT token-based authentication
- Input validation and sanitization
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

[Your Name]

## Acknowledgments

- Express.js Documentation
- TypeScript Documentation
- MongoDB Documentation
 
