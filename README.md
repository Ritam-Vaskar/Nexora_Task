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
- Tailwind for styling

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
│   │   │   └── db.js              # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.js            # User schema
│   │   │   ├── Product.js         # Product schema
│   │   │   ├── CartItem.js        # Cart item schema
│   │   │   └── Order.js           # Order schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Auth endpoints
│   │   │   ├── productRoutes.js   # Product endpoints
│   │   │   ├── cartRoutes.js      # Cart endpoints
│   │   │   ├── checkoutRoutes.js  # Checkout/Order endpoints
│   │   │   └── adminRoutes.js     # Admin endpoints
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   ├── checkoutController.js
│   │   │   └── adminController.js
│   │   ├── middleware/
│   │   │   └── auth.js            # JWT authentication
│   │   └── server.js              # Server entry point
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx         # Main layout wrapper
│   │   │   ├── Navbar.jsx         # Navigation with cart badge
│   │   │   ├── Modal.jsx          # Reusable modal
│   │   │   ├── ProtectedRoute.jsx # Route guard
│   │   │   ├── AdminRoute.jsx     # Admin route guard
│   │   │   └── ScrollToTop.jsx    # Auto scroll on navigation
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Product listing
│   │   │   ├── Login.jsx          # Login/Register
│   │   │   ├── Cart.jsx           # Shopping cart
│   │   │   ├── Checkout.jsx       # Checkout with receipt modal
│   │   │   ├── Orders.jsx         # User order history
│   │   │   └── Admin.jsx          # Admin dashboard
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx    # Auth state management
│   │   │   └── CartContext.jsx    # Cart state management
│   │   ├── utils/
│   │   │   └── api.js             # Axios instance
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Tailwind imports
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
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
MONGODB_URI=mongodb+srv://ritamvaskar0:Ritam%402005@cluster0.5hpn8m5.mongodb.net/vibecommerce
JWT_SECRET=vibe_commerce_secret_key_2024
NODE_ENV=development
```

4. Start the backend server:
```bash
node src/server.js
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

The frontend will run on `http://localhost:5173` (or configured port)

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

Use these credentials to test the application:

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `123456`
- **Access**: Full admin dashboard, order management, and all user features

### Regular User Account
- **Email**: `user1@example.com`
- **Password**: `123456`
- **Access**: Product browsing, cart, checkout, and order history

**Note**: The database is already seeded with 10 products and these user accounts.

## Features Overview

### For Users:
1. **Browse Products**: View all available products with images, descriptions, and prices
2. **Add to Cart**: Add products to cart with real-time cart badge counter
3. **Manage Cart**: Update quantities or remove items with instant updates
4. **Checkout**: Complete purchase with customer information
5. **Order Confirmation**: Beautiful receipt modal with order details
6. **View Orders**: Access order history with product images and details

### For Admins:
1. **Admin Dashboard**: View total orders, revenue, and pending orders statistics
2. **Order Management**: View all customer orders with filtering by status
3. **Order Details**: View detailed order information including customer details and items
4. **Status Updates**: Update order status (pending/completed/cancelled) in real-time
5. **Customer Information**: Access customer name and email for each order

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
- items (array with productId, name, price, quantity, image)
- total, status (pending/completed/cancelled)
- timestamps (createdAt, updatedAt)

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes requiring authentication
- Admin-only routes for privileged operations
- CORS enabled for cross-origin requests

## Development Notes

- Frontend uses Context API for global state management (Auth & Cart)
- Backend follows MVC architecture pattern
- RESTful API design with consistent response formats
- Proper error handling and validation
- Fully responsive Tailwind CSS design for all screen sizes
- Auto scroll-to-top on route navigation
- Cart operations return full cart state for UI consistency
- Product images stored and displayed in orders

## Key Implementation Highlights

✅ **Cart Badge Counter**: Real-time cart item count displayed on navbar  
✅ **Receipt Modal**: Beautiful order confirmation popup after checkout  
✅ **Order Images**: Product images preserved and displayed in order history  
✅ **Scroll to Top**: Automatic scroll on page navigation for better UX  
✅ **Admin Portal**: Complete order management with filtering and status updates  
✅ **Protected Routes**: Secure authentication with JWT and route guards  
✅ **Responsive Design**: Tailwind CSS for mobile-first responsive UI  
✅ **Error Handling**: Comprehensive error messages and loading states  

## Production Deployment

### Backend
- Ensure MongoDB Atlas connection string is configured
- Set `NODE_ENV=production` in environment
- Use process manager like PM2 for production

### Frontend
- Run `npm run build` to create production build
- Deploy the `dist` folder to hosting service (Vercel, Netlify, etc.)
- Update `VITE_API_URL` to production backend URL

## License

This project is created for educational and demonstration purposes.

## Author

**Ritam Vaskar**  
GitHub: [@Ritam-Vaskar](https://github.com/Ritam-Vaskar)  
Repository: [Nexora_Task](https://github.com/Ritam-Vaskar/Nexora_Task)
## Contact

For any questions or issues, please contact the development team.
