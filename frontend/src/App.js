import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';
import Header from './components/Header';
import { getProducts, getCart, addToCart, removeFromCart, updateCartItem, checkout } from './api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      await Promise.all([loadProducts(), loadCart()]);
    } catch (error) {
      showNotification('Failed to load data', 'error');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      throw error;
    }
  };

  const loadCart = async () => {
    try {
      const response = await getCart();
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      throw error;
    }
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      const response = await addToCart(productId, quantity);
      if (response.success) {
        await loadCart();
        const product = products.find(p => p.id === productId);
        showNotification(`${product?.name || 'Item'} added to cart!`, 'success');
      }
    } catch (error) {
      showNotification('Failed to add item to cart', 'error');
      console.error('Error adding to cart:', error);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const response = await removeFromCart(cartItemId);
      if (response.success) {
        await loadCart();
        showNotification('Item removed from cart', 'success');
      }
    } catch (error) {
      showNotification('Failed to remove item', 'error');
      console.error('Error removing from cart:', error);
    }
  };

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    try {
      const response = await updateCartItem(cartItemId, quantity);
      if (response.success) {
        await loadCart();
      }
    } catch (error) {
      showNotification('Failed to update quantity', 'error');
      console.error('Error updating quantity:', error);
    }
  };

  const handleCheckout = async (customerName, customerEmail) => {
    try {
      const response = await checkout(customerName, customerEmail, cart.items);
      if (response.success) {
        setReceipt(response.data);
        setShowCheckout(false);
        setShowCart(false);
        await loadCart();
        showNotification('Order placed successfully!', 'success');
      }
    } catch (error) {
      showNotification('Failed to process checkout', 'error');
      console.error('Error during checkout:', error);
    }
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const openCheckout = () => {
    if (cart.items.length === 0) {
      showNotification('Your cart is empty', 'error');
      return;
    }
    setShowCheckout(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Vibe Commerce...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header 
        cartItemCount={cart.itemCount}
        onCartClick={toggleCart}
      />

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <main className="main-content">
        <div className="container">
          <div className="hero">
            <h1>Welcome to Vibe Commerce</h1>
            <p>Discover amazing products at great prices</p>
          </div>

          <ProductGrid 
            products={products}
            onAddToCart={handleAddToCart}
          />
        </div>
      </main>

      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={openCheckout}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckout}
        />
      )}

      {receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={() => setReceipt(null)}
        />
      )}
    </div>
  );
}

export default App;
