import React from 'react';
import './Cart.css';

function Cart({ cart, onClose, onRemove, onUpdateQuantity, onCheckout }) {
  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(cartItemId, newQuantity);
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {cart.items.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-cart-icon">🛒</span>
              <p>Your cart is empty</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.items.map((item) => (
                  <div key={item.id} className="cart-item">
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
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="cart-item-actions">
                      <p className="cart-item-subtotal">${item.subtotal.toFixed(2)}</p>
                      <button 
                        className="remove-btn"
                        onClick={() => onRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-amount">${cart.total.toFixed(2)}</span>
                </div>
                <button className="checkout-btn" onClick={onCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
