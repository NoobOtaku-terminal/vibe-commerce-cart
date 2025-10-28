# 🛍️ Vibe Commerce Cart

A production-ready full-stack e-commerce shopping cart application built with React, Node.js/Express, and SQLite. Features complete user authentication, admin dashboard, and smooth animations powered by Framer Motion.

![Vibe Commerce](https://img.shields.io/badge/Status-Production-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Framer Motion](https://img.shields.io/badge/Animations-Framer%20Motion-purple)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Default Accounts](#default-accounts)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Features Implemented](#features-implemented)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Core Features
- **User Authentication**: JWT-based login/register system with bcrypt password hashing
- **Role-Based Access**: Admin and regular user roles with protected routes
- **Product Catalog**: Browse 10 curated products with stock management
- **Shopping Cart**: Add, remove, and update quantities with real-time stock validation
- **Checkout System**: Complete checkout flow with order processing
- **Order Receipt**: Animated receipt with order details and confirmation
- **Admin Dashboard**: Comprehensive admin panel for managing users, orders, and products

### User Experience
- ✅ Production-level animations with Framer Motion (stagger, spring, exit animations)
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Protected routes with authentication middleware
- ✅ Real-time stock badges (low stock warnings, out of stock indicators)
- ✅ Smooth page transitions and micro-interactions
- ✅ Clean, modern UI with gradient accents and floating animations
- ✅ Error handling with user-friendly messages

### Admin Features
- 📊 **Dashboard Statistics**: View total users, orders, revenue, and pending orders
- 👥 **User Management**: View all users and their roles
- 📦 **Order Management**: Update order status (pending, processing, shipped, delivered, cancelled)
- 🛍️ **Product Management**: Create, update, and delete products with stock control

### Authentication & Security
- 🔐 JWT token-based authentication with 7-day expiry
- 🔒 Bcrypt password hashing with salt rounds
- 🛡️ Protected API routes with auth middleware
- 👨‍💼 Admin-only routes with role checking
- 🚪 Automatic token validation and logout on expiry

## 🛠️ Tech Stack

### Frontend
- **React** 18.2 - UI library
- **React Router DOM** 6.20 - Client-side routing
- **Framer Motion** 10.16 - Production-quality animations
- **Axios** 1.6 - HTTP client with interceptors
- **CSS3** - Modern styling with animations, gradients, and responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express** 4.18 - Web framework
- **SQLite3** 5.1 - Embedded database
- **JWT** (jsonwebtoken) 9.0 - Token-based authentication
- **Bcrypt** 2.4 - Password hashing
- **Express Validator** 7.0 - Request validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Authentication & Security
- **JWT Tokens** - Secure token-based auth with 7-day expiry
- **Bcrypt** - Password hashing with salt rounds
- **Auth Middleware** - Protected routes and role checking
- **Token Storage** - localStorage with automatic validation

## 👤 Default Accounts

The application comes with two pre-seeded accounts for testing:

### Admin Account
- **Email**: `admin@vibecommerce.com`
- **Password**: `admin123`
- **Access**: Full admin dashboard access, user management, order management, product management

### Regular User Account
- **Email**: `user@example.com`
- **Password**: `user123`
- **Access**: Shopping, cart, checkout, order history

> 💡 **Tip**: Use the admin account to access the admin dashboard at `/admin` after logging in.
- **CSS3** - Styling with responsive design
- **React Hooks** - State management

### Backend
- **Node.js** - Runtime environment
- **Express** 4.18 - Web framework
- **SQLite3** - Database
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request parsing

## 📁 Project Structure

```
vibe-commerce-cart/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── database.js          # Database initialization & seeding
│   ├── server.js            # Express server & API routes
│   ├── package.json         # Backend dependencies
│   ├── .env                 # Environment variables (JWT secret)
│   └── vibecommerce.db      # SQLite database (auto-generated)
│
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.js / .css
│   │   │   ├── ProductGrid.js / .css
│   │   │   ├── Cart.js / .css
│   │   │   ├── CheckoutModal.js / .css
│   │   │   ├── ReceiptModal.js / .css
│   │   │   ├── Login.js / .css
│   │   │   ├── Register.js
│   │   │   ├── AdminDashboard.js / .css
│   │   │   └── ProtectedRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js    # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.js / .css    # Main shopping page
│   │   ├── App.js           # Router configuration
│   │   ├── App.css          # Main styles
│   │   ├── index.js         # React entry point
│   │   ├── index.css        # Global styles
│   │   └── api.js           # API service with auth interceptors
│   └── package.json         # Frontend dependencies
│
├── .gitignore
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/NoobOtaku-terminal/vibe-commerce-cart.git
cd vibe-commerce-cart
```

### Step 2: Setup Backend
```bash
cd backend
npm install
npm start
```

The backend server will start on `http://localhost:5000` and automatically:
- Create the SQLite database
- Seed products, users, and initial data
- Display default account credentials in the console

### Step 3: Setup Frontend
```bash
cd ../frontend
npm install
npm start
```

The React app will start on `http://localhost:3000` and automatically open in your browser.

### Step 4: Login & Test

1. **Regular User Experience**:
   - Login with `user@example.com` / `user123`
   - Browse products and add to cart
   - Complete checkout process
   - View order receipt

2. **Admin Experience**:
   - Login with `admin@vibecommerce.com` / `admin123`
   - Click "Admin Dashboard" button in header
   - View statistics, manage orders, and users
   - Update order statuses

## 🔑 Environment Variables

The backend uses a `.env` file with the following variables:

```env
JWT_SECRET=vibe-commerce-super-secret-jwt-key-2025
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
```

> ⚠️ **Security Note**: In production, use a strong, randomly generated JWT_SECRET and store it securely.

### Step 2: Setup Backend
```bash
cd backend
npm install
npm start
```
The backend server will start on `http://localhost:5000`

### Step 3: Setup Frontend (New Terminal)
```bash
cd frontend
npm install
npm start
```
The frontend will start on `http://localhost:3000` and automatically open in your browser.

### Step 4: Start Shopping! 🎉
- Browse products on the home page
- Click "Add to Cart" to add items
- View cart by clicking the cart icon in the header
- Adjust quantities or remove items as needed
- Click "Proceed to Checkout"
- Fill in your name and email
- Complete the order and view your receipt!

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register     # Register new user
                              # Body: { name, email, password }
POST   /api/auth/login        # Login user
                              # Body: { email, password }
                              # Returns: { token, user }
GET    /api/auth/me           # Get current user (Protected)
                              # Headers: Authorization: Bearer <token>
```

### Products
```
GET    /api/products          # Get all products (Public)
GET    /api/products/:id      # Get single product (Public)
```

### Cart Management (Protected - Requires Auth)
```
GET    /api/cart              # Get user's cart items with total
                              # Headers: Authorization: Bearer <token>
POST   /api/cart              # Add item to cart
                              # Body: { productId, quantity }
                              # Validates stock availability
PUT    /api/cart/:id          # Update cart item quantity
                              # Body: { quantity }
                              # Validates stock
DELETE /api/cart/:id          # Remove item from cart
```

### Checkout & Orders (Protected)
```
POST   /api/checkout          # Process order
                              # Body: { customerName, customerEmail }
                              # Returns: Order confirmation with receipt
GET    /api/orders            # Get user's order history
```

### Admin Endpoints (Protected - Admin Only)
```
GET    /api/admin/stats       # Get dashboard statistics
                              # Returns: totalUsers, totalOrders, totalRevenue, pendingOrders
GET    /api/admin/users       # Get all users
GET    /api/admin/orders      # Get all orders with user details
PUT    /api/admin/orders/:id/status  # Update order status
                              # Body: { status: 'pending'|'processing'|'shipped'|'delivered'|'cancelled' }
POST   /api/admin/products    # Create new product
                              # Body: { name, price, description, image, category, stock }
PUT    /api/admin/products/:id # Update product
                              # Body: Product fields to update
DELETE /api/admin/products/:id # Delete product
```

### Health Check
```
GET    /api/health            # API health status
```

### Example API Responses

**POST /api/auth/login**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@vibecommerce.com",
    "name": "Admin User",
    "role": "admin"
  }
}
```

**GET /api/products**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "price": 79.99,
      "description": "Premium wireless headphones with noise cancellation",
      "image": "https://images.unsplash.com/...",
      "category": "Electronics",
      "stock": 50
    }
  ]
}
```

**GET /api/admin/stats**
```json
{
  "success": true,
  "data": {
    "totalUsers": 2,
    "totalOrders": 5,
    "totalRevenue": 524.95,
    "pendingOrders": 2
  }
}
```

**GET /api/cart**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "quantity": 2,
        "product_id": 1,
        "name": "Wireless Headphones",
        "price": 79.99,
        "subtotal": 159.98,
        "image": "...",
        "description": "..."
      }
    ],
    "total": 159.98,
    "itemCount": 1
  }
}
```

**POST /api/checkout**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": 1,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "items": [...],
    "total": 159.98,
    "timestamp": "2025-10-28T12:00:00.000Z",
    "message": "Thank you for your purchase!"
  }
}
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,        -- Bcrypt hashed
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user',      -- 'user' or 'admin'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  image TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0,       -- Stock quantity
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Cart Items Table
```sql
CREATE TABLE cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  user_id INTEGER NOT NULL,      -- Foreign key to users
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  total REAL NOT NULL,
  items TEXT NOT NULL,           -- JSON string of order items
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 📸 Screenshots

### Home Page - Product Grid
*Clean, modern product catalog with hover effects*

### Shopping Cart Panel
*Slide-in cart with quantity controls and totals*

### Checkout Modal
*Simple checkout form with validation*

### Order Receipt
*Detailed receipt with order confirmation*

## ✅ Features Implemented

- [x] Backend REST API with Express
- [x] SQLite database with proper schema
- [x] 10 mock products with images
- [x] Add to cart functionality
- [x] Remove from cart
- [x] Update cart quantities
- [x] Cart total calculation
- [x] Checkout with customer info
- [x] Mock receipt generation
- [x] React frontend with components
- [x] Responsive design
- [x] Error handling
- [x] Loading states
- [x] Notifications
- [x] Database persistence
- [x] Order history storage

## 🎯 Future Enhancements

- [ ] User authentication system
- [ ] Product search and filtering
- [ ] Product categories
- [ ] Payment gateway integration
## 🎯 Features Implemented

### ✅ Core Requirements
- [x] Full-stack shopping cart application
- [x] Product listing with images and details
- [x] Add to cart functionality
- [x] Cart management (add, remove, update quantities)
- [x] Checkout process with customer information
- [x] Order confirmation and receipt
- [x] SQLite database persistence
- [x] RESTful API design
- [x] Responsive design

### ✅ Authentication & Authorization
- [x] User registration and login
- [x] JWT token-based authentication
- [x] Bcrypt password hashing
- [x] Protected routes and API endpoints
- [x] Role-based access control (user/admin)
- [x] Automatic token validation
- [x] Secure logout functionality

### ✅ Admin Features
- [x] Admin dashboard with statistics
- [x] User management interface
- [x] Order management with status updates
- [x] Product CRUD operations
- [x] Stock management
- [x] Revenue tracking

### ✅ User Experience
- [x] Production-level animations with Framer Motion
- [x] Smooth page transitions
- [x] Loading states and micro-interactions
- [x] Real-time stock indicators
- [x] Stagger animations on lists
- [x] Spring physics animations
- [x] Hover and tap interactions
- [x] Exit animations with AnimatePresence

### ✅ Advanced Features
- [x] Stock validation on cart operations
- [x] Low stock warnings
- [x] Out of stock indicators
- [x] Order history
- [x] Comprehensive error handling
- [x] API request interceptors
- [x] Automatic token refresh handling

## 🚀 Future Enhancements

- [ ] Product search and filtering
- [ ] Product categories with navigation
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications for orders
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Advanced admin analytics
- [ ] Export orders to CSV
- [ ] Image upload for products
- [ ] Payment gateway integration
- [ ] Order tracking with timeline

## 🎥 Demo Video

*[Link to demo video will be added here]*

## 👨‍💻 Development

### Available Scripts

**Backend:**
```bash
npm start       # Start server
npm run dev     # Start with nodemon (auto-reload)
```

**Frontend:**
```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
```

## 📝 Notes

- This is a production-ready e-commerce application built for the Vibe Commerce screening
- JWT authentication with 7-day token expiry
- Bcrypt password hashing for security
- Role-based access control for admin features
- Stock management with real-time validation
- Framer Motion animations for premium UX
- Products use Unsplash images for demonstration
- Database is automatically created and seeded on first run
- No real payment processing (mock checkout only)

## 🎥 Screenshots

### Login Page
Beautiful gradient background with floating animations and demo account information.

### Home Page (User)
Product grid with stock badges, add to cart buttons, and smooth hover effects.

### Shopping Cart
Slide-in cart sidebar with animated items, quantity controls, and real-time total updates.

### Checkout Modal
Spring animation modal with form validation and smooth transitions.

### Admin Dashboard
Comprehensive admin panel with statistics cards, order management, and user list.

## 🤝 Contributing

This is a screening project for Vibe Commerce. For any questions or feedback, please contact the repository owner.

## 📄 License

MIT License - feel free to use this project for learning purposes.

---

**Built with ❤️ for Vibe Commerce Screening**
Full-stack shopping cart application with React, Node.js/Express, and SQLite - Vibe Commerce screening project
