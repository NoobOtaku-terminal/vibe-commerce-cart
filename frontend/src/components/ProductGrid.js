import React from 'react';
import { motion } from 'framer-motion';
import './ProductGrid.css';

function ProductGrid({ products, onAddToCart }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="products-section">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Products
      </motion.h2>
      <motion.div 
        className="products-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {products.map((product) => (
          <motion.div 
            key={product.id} 
            className="product-card"
            variants={item}
            whileHover={{ 
              y: -8,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <div className="product-image-wrapper">
              <motion.img 
                src={product.image} 
                alt={product.name}
                className="product-image"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Product';
                }}
              />
              <span className="product-category">{product.category}</span>
              {product.stock <= 10 && product.stock > 0 && (
                <motion.span 
                  className="product-stock-badge low-stock"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  Only {product.stock} left!
                </motion.span>
              )}
              {product.stock === 0 && (
                <span className="product-stock-badge out-of-stock">
                  Out of Stock
                </span>
              )}
            </div>
            
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <motion.button 
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(product.id)}
                  disabled={product.stock === 0}
                  whileHover={{ scale: product.stock > 0 ? 1.05 : 1 }}
                  whileTap={{ scale: product.stock > 0 ? 0.95 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ProductGrid;
