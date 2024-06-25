import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-list">
      <h2>Productos</h2>
      {products.map((product) => (
        <ProductItem key={product.ProductoID} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
