import React, { useState, useEffect } from 'react';

const ProductItem = ({ product, addToCart, cart }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/productImage/${product.ProductoID}`);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            } catch (error) {
                console.error('Error fetching product image:', error);
            }
        };

        fetchImage();

        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [product]);

    const handleAddToCart = () => {
        if (isLoggedIn) {
            const productInCart = cart.find(item => item.ProductoID === product.ProductoID);
            if (product.Stock > 0 && (!productInCart || productInCart.cantidad < product.Stock)) {
                addToCart({ ...product, imageUrl });
            } else {
                alert('No hay suficiente stock disponible.');
            }
        } else {
            alert('Debes iniciar sesión para agregar productos al carrito');
        }
    };

    return (
        <div className="product-item">
            <img src={imageUrl} alt={product.NombreProducto} />
            <h3 className='titulo-producto'>{product.NombreProducto}</h3>
            <p>{product.Descripcion}</p>
            <p>Precio: ${product.Precio}</p>
            <p>Stock: {product.Stock}</p> {/* Mostrar el stock disponible */}
            <button onClick={handleAddToCart}>Agregar al carrito</button>
        </div>
    );
};

export default ProductItem;
