import React from 'react';
import './ProductGrid.css';

function ProductGrid({ products, onAddToCart }) {
  return (
    <div className="products-section">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Product';
                }}
              />
              <span className="product-category">{product.category}</span>
            </div>
            
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
