import React from 'react';
import './Header.css';

function Header({ cartItemCount, onCartClick }) {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">Vibe Commerce</span>
        </div>
        
        <button className="cart-button" onClick={onCartClick}>
          <span className="cart-icon">🛒</span>
          <span className="cart-text">Cart</span>
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
