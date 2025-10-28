const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'vibecommerce.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize database schema
const initializeDatabase = () => {
  db.serialize(() => {
    // Products table
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        image TEXT,
        category TEXT
      )
    `);

    // Cart items table
    db.run(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        user_id TEXT DEFAULT 'mock-user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id)
      )
    `);

    // Orders table (for checkout)
    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT DEFAULT 'mock-user',
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        total REAL NOT NULL,
        items TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed products if table is empty
    db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
      if (!err && row.count === 0) {
        seedProducts();
      }
    });
  });
};

// Seed initial product data
const seedProducts = () => {
  const products = [
    {
      name: 'Wireless Headphones',
      price: 79.99,
      description: 'Premium wireless headphones with noise cancellation',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      category: 'Electronics'
    },
    {
      name: 'Smart Watch',
      price: 199.99,
      description: 'Feature-packed smartwatch with fitness tracking',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      category: 'Electronics'
    },
    {
      name: 'Running Shoes',
      price: 89.99,
      description: 'Comfortable running shoes for all terrains',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      category: 'Footwear'
    },
    {
      name: 'Laptop Backpack',
      price: 49.99,
      description: 'Durable backpack with laptop compartment',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      category: 'Accessories'
    },
    {
      name: 'Bluetooth Speaker',
      price: 59.99,
      description: 'Portable speaker with rich sound quality',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
      category: 'Electronics'
    },
    {
      name: 'Coffee Maker',
      price: 129.99,
      description: 'Programmable coffee maker with thermal carafe',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
      category: 'Appliances'
    },
    {
      name: 'Yoga Mat',
      price: 34.99,
      description: 'Non-slip yoga mat with carrying strap',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
      category: 'Fitness'
    },
    {
      name: 'Desk Lamp',
      price: 44.99,
      description: 'LED desk lamp with adjustable brightness',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
      category: 'Home'
    },
    {
      name: 'Water Bottle',
      price: 24.99,
      description: 'Insulated stainless steel water bottle',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
      category: 'Accessories'
    },
    {
      name: 'Sunglasses',
      price: 69.99,
      description: 'Polarized sunglasses with UV protection',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      category: 'Accessories'
    }
  ];

  const stmt = db.prepare('INSERT INTO products (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)');
  
  products.forEach(product => {
    stmt.run(product.name, product.price, product.description, product.image, product.category);
  });
  
  stmt.finalize();
  console.log('Database seeded with products');
};

initializeDatabase();

module.exports = db;
