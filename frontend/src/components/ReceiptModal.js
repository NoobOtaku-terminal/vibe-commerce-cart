import React from 'react';
import './ReceiptModal.css';

function ReceiptModal({ receipt, onClose }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content receipt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Confirmation</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="success-icon">✓</div>
          <p className="success-message">{receipt.message}</p>

          <div className="receipt-details">
            <div className="receipt-row">
              <span className="receipt-label">Order ID:</span>
              <span className="receipt-value">#{receipt.orderId}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Customer:</span>
              <span className="receipt-value">{receipt.customerName}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Email:</span>
              <span className="receipt-value">{receipt.customerEmail}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Date:</span>
              <span className="receipt-value">{formatDate(receipt.timestamp)}</span>
            </div>
          </div>

          <div className="receipt-items">
            <h3>Items Ordered</h3>
            {receipt.items.map((item, index) => (
              <div key={index} className="receipt-item">
                <span>{item.name} × {item.quantity}</span>
                <span>${item.subtotal.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="receipt-total">
            <strong>Total Paid:</strong>
            <strong className="total-amount">${receipt.total.toFixed(2)}</strong>
          </div>

          <button className="done-btn" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;
