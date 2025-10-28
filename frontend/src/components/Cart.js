import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Cart.css';

function Cart({ cart, onClose, onRemove, onUpdateQuantity, onCheckout }) {
  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(cartItemId, newQuantity);
  };

  return (
    <motion.div 
      className="cart-overlay" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="cart-panel" 
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <motion.button 
            className="close-btn" 
            onClick={onClose}
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>

        <div className="cart-content">
          {cart.items.length === 0 ? (
            <motion.div 
              className="empty-cart"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span 
                className="empty-cart-icon"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                🛒
              </motion.span>
              <p>Your cart is empty</p>
              <motion.button 
                className="continue-shopping-btn" 
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          ) : (
            <>
              <div className="cart-items">
                <AnimatePresence mode="popLayout">
                  {cart.items.map((item, index) => (
                    <motion.div 
                      key={item.id} 
                      className="cart-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                    >
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="cart-item-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80?text=Product';
                        }}
                      />
                      
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p className="cart-item-price">${item.price.toFixed(2)}</p>
                        
                        <div className="quantity-controls">
                          <motion.button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            −
                          </motion.button>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="cart-item-actions">
                        <p className="cart-item-subtotal">${item.subtotal.toFixed(2)}</p>
                        <motion.button 
                          className="remove-btn"
                          onClick={() => onRemove(item.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Remove
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div 
                className="cart-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="cart-total">
                  <span>Total:</span>
                  <motion.span 
                    className="total-amount"
                    key={cart.total}
                    initial={{ scale: 1.2, color: "#10b981" }}
                    animate={{ scale: 1, color: "#667eea" }}
                    transition={{ duration: 0.3 }}
                  >
                    ${cart.total.toFixed(2)}
                  </motion.span>
                </div>
                <motion.button 
                  className="checkout-btn" 
                  onClick={onCheckout}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Cart;
