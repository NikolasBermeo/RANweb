import React from 'react';
import './Tienda.css';

const CartMenu = ({ cart, removeFromCart, showCartMenu }) => {
  return (
    <div className={`cart-menu ${showCartMenu ? 'show' : ''}`}>
      <div className="cart-menu-header">
        <h2>Carrito de compras</h2>
        <button onClick={removeFromCart} className="close-button">
          X
        </button>
      </div>
      <div className="cart-menu-content">
        <ul>
          {cart.map(item => (
            <li key={item.ProductoID}>
              {item.NombreProducto} <button onClick={() => removeFromCart(item.ProductoID)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartMenu;
