import React from 'react';

const Cart = ({ cart, removeFromCart, isVisible, toggleCartVisibility, handleCheckout }) => {
    return (
        <div className={`cart ${isVisible ? 'show' : ''}`}>
            <button className="close-button" onClick={toggleCartVisibility}>X</button>
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <img
                        src="../../assets/img/iconos/cactus.png"
                        alt="Empty Cart"
                        style={{ maxWidth: '200px', maxHeight: '200px', width: '100%', height: 'auto' }}
                    />
                    <p>No has seleccionado ningún producto</p>
                </div>
            ) : (
                <>
                    <button onClick={handleCheckout}>Ir a Pagar</button>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={`${item.ProductoID}-${index}`} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={item.imageUrl}
                                    alt={item.NombreProducto}
                                    style={{ maxWidth: '100px', maxHeight: '100px', width: 'auto', height: 'auto', marginRight: '10px' }}
                                />
                                <div style={{ flexGrow: 1 }}>
                                    <p>{item.NombreProducto}</p>
                                    <p>Precio: ${item.Precio}</p>
                                    <p>Cantidad: {item.cantidad}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.ProductoID)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Cart;
