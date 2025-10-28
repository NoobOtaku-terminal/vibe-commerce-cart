const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function to run database queries as promises
const dbAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const dbGet = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbRun = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

// Routes

// GET /api/products - Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await dbAll('SELECT * FROM products');
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// GET /api/products/:id - Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await dbGet('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (product) {
      res.json({
        success: true,
        data: product
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
});

// POST /api/cart - Add item to cart
app.post('/api/cart', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'productId and quantity are required'
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    // Check if product exists
    const product = await dbGet('SELECT * FROM products WHERE id = ?', [productId]);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if item already in cart
    const existingItem = await dbGet(
      'SELECT * FROM cart_items WHERE product_id = ? AND user_id = ?',
      [productId, 'mock-user']
    );

    if (existingItem) {
      // Update quantity
      await dbRun(
        'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?',
        [quantity, existingItem.id]
      );
      res.json({
        success: true,
        message: 'Cart updated',
        data: { id: existingItem.id }
      });
    } else {
      // Insert new cart item
      const result = await dbRun(
        'INSERT INTO cart_items (product_id, quantity, user_id) VALUES (?, ?, ?)',
        [productId, quantity, 'mock-user']
      );
      res.status(201).json({
        success: true,
        message: 'Item added to cart',
        data: { id: result.id }
      });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message
    });
  }
});

// GET /api/cart - Get cart items with product details and total
app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await dbAll(`
      SELECT 
        c.id,
        c.quantity,
        c.created_at,
        p.id as product_id,
        p.name,
        p.price,
        p.description,
        p.image,
        p.category,
        (c.quantity * p.price) as subtotal
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC
    `, ['mock-user']);

    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({
      success: true,
      data: {
        items: cartItems,
        total: parseFloat(total.toFixed(2)),
        itemCount: cartItems.length
      }
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
      error: error.message
    });
  }
});

// PUT /api/cart/:id - Update cart item quantity
app.put('/api/cart/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItemId = req.params.id;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Valid quantity is required'
      });
    }

    const result = await dbRun(
      'UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?',
      [quantity, cartItemId, 'mock-user']
    );

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    res.json({
      success: true,
      message: 'Cart item updated'
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart item',
      error: error.message
    });
  }
});

// DELETE /api/cart/:id - Remove item from cart
app.delete('/api/cart/:id', async (req, res) => {
  try {
    const result = await dbRun(
      'DELETE FROM cart_items WHERE id = ? AND user_id = ?',
      [req.params.id, 'mock-user']
    );

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message
    });
  }
});

// POST /api/checkout - Process checkout
app.post('/api/checkout', async (req, res) => {
  try {
    const { customerName, customerEmail, cartItems } = req.body;

    if (!customerName || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and email are required'
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order
    const result = await dbRun(
      'INSERT INTO orders (user_id, customer_name, customer_email, total, items) VALUES (?, ?, ?, ?, ?)',
      ['mock-user', customerName, customerEmail, total, JSON.stringify(cartItems)]
    );

    // Clear cart
    await dbRun('DELETE FROM cart_items WHERE user_id = ?', ['mock-user']);

    // Generate receipt
    const receipt = {
      orderId: result.id,
      customerName,
      customerEmail,
      items: cartItems,
      total: parseFloat(total.toFixed(2)),
      timestamp: new Date().toISOString(),
      message: 'Thank you for your purchase!'
    };

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: receipt
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process checkout',
      error: error.message
    });
  }
});

// GET /api/orders - Get order history (bonus)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await dbAll(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      ['mock-user']
    );

    const ordersWithParsedItems = orders.map(order => ({
      ...order,
      items: JSON.parse(order.items)
    }));

    res.json({
      success: true,
      data: ordersWithParsedItems
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Vibe Commerce API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Vibe Commerce API running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});

module.exports = app;
