import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import CheckoutModal from '../components/CheckoutModal';
import ReceiptModal from '../components/ReceiptModal';
import Header from '../components/Header';
import { getProducts, getCart, addToCart, removeFromCart, updateCartItem, checkout } from '../api';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

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
      const errorMsg = error.response?.data?.message || 'Failed to add item to cart';
      showNotification(errorMsg, 'error');
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
      const errorMsg = error.response?.data?.message || 'Failed to update quantity';
      showNotification(errorMsg, 'error');
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goToAdmin = () => {
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div 
          className="spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading Vibe Commerce...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header 
        cartItemCount={cart.itemCount}
        onCartClick={toggleCart}
        user={user}
        onLogout={handleLogout}
        isAdmin={isAdmin}
        onAdminClick={goToAdmin}
      />

      <AnimatePresence>
        {notification.show && (
          <motion.div 
            className={`notification ${notification.type}`}
            initial={{ opacity: 0, y: -50, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="main-content">
        <div className="container">
          <motion.div 
            className="hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Welcome Back, {user?.name}!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Discover amazing products at great prices
            </motion.p>
          </motion.div>

          <ProductGrid 
            products={products}
            onAddToCart={handleAddToCart}
          />
        </div>
      </main>

      <AnimatePresence>
        {showCart && (
          <Cart
            cart={cart}
            onClose={() => setShowCart(false)}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={openCheckout}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCheckout && (
          <CheckoutModal
            cart={cart}
            onClose={() => setShowCheckout(false)}
            onSubmit={handleCheckout}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {receipt && (
          <ReceiptModal
            receipt={receipt}
            onClose={() => setReceipt(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
