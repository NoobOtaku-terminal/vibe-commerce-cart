import React, { useState } from 'react';
import './CheckoutModal.css';

function CheckoutModal({ cart, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData.customerName, formData.customerEmail);
      setFormData({ customerName: '', customerEmail: '' });
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Checkout</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cart.items.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${item.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <strong>Total:</strong>
              <strong>${cart.total.toFixed(2)}</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="customerName">Full Name *</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className={errors.customerName ? 'error' : ''}
                placeholder="John Doe"
              />
              {errors.customerName && (
                <span className="error-message">{errors.customerName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="customerEmail">Email Address *</label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className={errors.customerEmail ? 'error' : ''}
                placeholder="john@example.com"
              />
              {errors.customerEmail && (
                <span className="error-message">{errors.customerEmail}</span>
              )}
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
