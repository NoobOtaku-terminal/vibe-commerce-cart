import React from 'react';
import { motion } from 'framer-motion';
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
    <motion.div 
      className="modal-overlay" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="modal-content receipt-modal" 
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="modal-header">
          <h2>Order Confirmation</h2>
          <motion.button 
            className="close-btn" 
            onClick={onClose}
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>

        <div className="modal-body">
          <motion.div 
            className="success-icon"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 
            }}
          >
            ✓
          </motion.div>
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
            <h3>Items</h3>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {receipt.items.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="receipt-item"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            className="receipt-total"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>Total</span>
            <span className="total-amount">${receipt.total.toFixed(2)}</span>
          </motion.div>

          <motion.button 
            className="close-receipt-btn" 
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ReceiptModal;
