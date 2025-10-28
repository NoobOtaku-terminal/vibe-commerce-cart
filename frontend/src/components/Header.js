import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

function Header({ cartItemCount, onCartClick, user, onLogout, isAdmin, onAdminClick }) {
  return (
    <header className="header">
      <div className="container header-content">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">Vibe Commerce</span>
        </motion.div>
        
        <div className="header-actions">
          {user && (
            <motion.div 
              className="user-info"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="user-greeting">Hi, {user.name}!</span>
              {isAdmin && (
                <motion.button 
                  className="admin-button"
                  onClick={onAdminClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ⚙️ Admin
                </motion.button>
              )}
            </motion.div>
          )}

          <motion.button 
            className="cart-button" 
            onClick={onCartClick}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            {cartItemCount > 0 && (
              <motion.span 
                className="cart-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                {cartItemCount}
              </motion.span>
            )}
          </motion.button>

          {user && (
            <motion.button 
              className="logout-button"
              onClick={onLogout}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
