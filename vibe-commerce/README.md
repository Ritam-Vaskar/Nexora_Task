# Vibe Commerce - Full Stack E-commerce Application

A modern full-stack e-commerce application built with React, Node.js, Express, and MongoDB.

## Features

- 🛍️ Product browsing and catalog
- 🛒 Shopping cart functionality
- 👤 User authentication (Login/Register)
- 💳 Checkout process with order confirmation
- 📦 Order management
- 👨‍💼 Admin portal for viewing all orders
- 🗄️ MongoDB database for persistence
- 🔐 JWT-based authentication
- 📱 Responsive design

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Vite for build tooling
- CSS3 for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
vibe-commerce/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js          # Database configuration
│   │   │   └── seed.js        # Database seeding script
│   │   ├── models/
│   │   │   ├── User.js        # User model
│   │   │   ├── Product.js     # Product model
│   │   │   ├── CartItem.js    # Cart item model
│   │   │   └── Order.js       # Order model
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── checkoutRoutes.js
│   │   │   └── adminRoutes.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   ├── checkoutController.js
│   │   │   └── adminController.js
│   │   ├── middleware/
│   │   │   └── auth.js        # Authentication middleware
│   │   ├── app.js             # Express app setup
│   │   └── server.js          # Server entry point
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── CheckoutForm.jsx
│   │   │   ├── ReceiptModal.jsx
│   │   │   ├── Login.jsx
│   │   │   └── AdminPortal.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CartPage.jsx
│   │   │   └── CheckoutPage.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── utils/
│   │   │   └── api.js         # API client
│   │   ├── styles/
│   │   │   └── main.css
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

4. Seed the database with initial data:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:id` - Update cart item quantity (protected)
- `DELETE /api/cart/:id` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Checkout
- `POST /api/checkout` - Create order from cart (protected)
- `GET /api/checkout/orders` - Get user's orders (protected)

### Admin
- `GET /api/admin/orders` - Get all orders (admin only)
- `GET /api/admin/orders/:id` - Get single order (admin only)
- `PUT /api/admin/orders/:id` - Update order status (admin only)

## Demo Credentials

After running the seed script, use these credentials to login:

### Admin Account
- Email: `admin@vibecommerce.com`
- Password: `admin123`

### Regular User Account
- Email: `user@vibecommerce.com`
- Password: `user123`

## Features Overview

### For Users:
1. **Browse Products**: View all available products with images, descriptions, and prices
2. **Add to Cart**: Add products to cart with quantity selection
3. **Manage Cart**: Update quantities or remove items from cart
4. **Checkout**: Complete purchase with customer information
5. **Order Confirmation**: Receive order receipt with details
6. **View Orders**: Access order history

### For Admins:
1. **Admin Dashboard**: View statistics and metrics
2. **Order Management**: View all customer orders
3. **Order Details**: Access detailed information for each order
4. **Status Updates**: Update order status (pending/completed/cancelled)

## Database Models

### User
- name, email, password (hashed)
- role (user/admin)

### Product
- name, price, description, image
- category, stock

### CartItem
- userId (reference to User)
- productId (reference to Product)
- quantity

### Order
- userId (reference to User)
- customerName, customerEmail
- items (array of products with details)
- total, status
- timestamps

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes requiring authentication
- Admin-only routes for privileged operations
- CORS enabled for cross-origin requests

## Development Notes

- Frontend uses Context API for global state management
- Backend follows MVC architecture pattern
- RESTful API design
- Proper error handling and validation
- Responsive design for mobile and desktop

## Future Enhancements

- Payment gateway integration
- Product search and filtering
- User reviews and ratings
- Product categories and collections
- Order tracking
- Email notifications
- Image upload for products
- Wishlist functionality

## License

This project is created for Vibe Commerce screening purposes.

## Contact

For any questions or issues, please contact the development team.
