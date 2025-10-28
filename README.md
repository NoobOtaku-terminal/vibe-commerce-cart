# 🛍️ Vibe Commerce Cart

A full-stack e-commerce shopping cart application built with React, Node.js/Express, and SQLite. This project demonstrates a complete shopping experience with product browsing, cart management, and checkout functionality.

![Vibe Commerce](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Features Implemented](#features-implemented)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Core Features
- **Product Catalog**: Browse 10 curated products with images, descriptions, and prices
- **Shopping Cart**: Add, remove, and update quantities of items
- **Real-time Updates**: Cart total and item count update dynamically
- **Checkout System**: Mock checkout with customer information collection
- **Order Receipt**: Detailed receipt with order ID, items, and timestamp
- **Persistent Storage**: SQLite database for products, cart items, and orders

### User Experience
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Smooth animations and transitions
- ✅ Real-time notifications for user actions
- ✅ Clean, modern UI with gradient accents
- ✅ Error handling with user-friendly messages

### Bonus Features
- ✅ Database persistence with SQLite
- ✅ Mock user system (single user: 'mock-user')
- ✅ Order history API endpoint
- ✅ Comprehensive error handling
- ✅ RESTful API design

## 🛠️ Tech Stack

### Frontend
- **React** 18.2 - UI library
- **Axios** - HTTP client
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
│   ├── database.js          # Database initialization & seeding
│   ├── server.js            # Express server & API routes
│   ├── package.json         # Backend dependencies
│   └── vibecommerce.db      # SQLite database (auto-generated)
│
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.js
│   │   │   ├── ProductGrid.js
│   │   │   ├── Cart.js
│   │   │   ├── CheckoutModal.js
│   │   │   ├── ReceiptModal.js
│   │   │   └── *.css        # Component styles
│   │   ├── App.js           # Main application component
│   │   ├── App.css          # Main styles
│   │   ├── index.js         # React entry point
│   │   ├── index.css        # Global styles
│   │   └── api.js           # API service layer
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

### Products
```
GET    /api/products          # Get all products
GET    /api/products/:id      # Get single product
```

### Cart Management
```
GET    /api/cart              # Get cart items with total
POST   /api/cart              # Add item to cart
                              # Body: { productId, quantity }
PUT    /api/cart/:id          # Update cart item quantity
                              # Body: { quantity }
DELETE /api/cart/:id          # Remove item from cart
```

### Checkout & Orders
```
POST   /api/checkout          # Process checkout
                              # Body: { customerName, customerEmail, cartItems }
GET    /api/orders            # Get order history (bonus feature)
```

### Health Check
```
GET    /api/health            # API health status
```

### Example API Responses

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
      "category": "Electronics"
    }
  ]
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

### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  image TEXT,
  category TEXT
);
```

### Cart Items Table
```sql
CREATE TABLE cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  user_id TEXT DEFAULT 'mock-user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products (id)
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT DEFAULT 'mock-user',
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  total REAL NOT NULL,
  items TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
- [ ] Order tracking
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Email notifications
- [ ] Multiple user support
- [ ] Integration with Fake Store API

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

- This is a mock e-commerce application for demonstration purposes
- No real payment processing is implemented
- Uses a single mock user ('mock-user') for cart persistence
- Products use Unsplash images for demonstration
- Database is automatically created and seeded on first run

## 🤝 Contributing

This is a screening project for Vibe Commerce. For any questions or feedback, please contact the repository owner.

## 📄 License

MIT License - feel free to use this project for learning purposes.

---

**Built with ❤️ for Vibe Commerce Screening**
Full-stack shopping cart application with React, Node.js/Express, and SQLite - Vibe Commerce screening project
