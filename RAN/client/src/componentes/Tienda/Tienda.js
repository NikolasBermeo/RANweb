import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import ProductItem from './ProductItem';
import CategorySelector from './CategorySelector';
import Cart from './Cart';
import './estilos/Tienda.css';

const Tienda = ({ cart, setCart }) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('all');
    const [headerBackground, setHeaderBackground] = useState('/../../assets/img/fondos/lauracardona.png');
    const [cartVisible, setCartVisible] = useState(false);
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const currentCategory = queryParams.category || 'all';
    const history = useHistory();

    const categoryTitles = {
        all: 'Todos los productos',
        1: 'Suculentas',
        2: 'Arreglos',
        3: 'Carnívoras',
        4: 'Jardín',
        5: 'Interiores',
        6: 'Orquídeas'
    };

    const categoryGradients = {
        all: 'linear-gradient(to right, hsla(295, 89%, 41%, 0.856), hsla(232, 80%, 39%, 0.856) , hsla(61, 92%, 43%, 0.479))',
        1: 'linear-gradient(to right,#0ae3f35e,#152b4170)',
        2: 'linear-gradient(to right,#f30ab95e,#0281ff70)',
        3: 'linear-gradient(to right,#f32d0a5e,#1e075c70)',
        4: ' linear-gradient(to right,#f006067c,#ebd40770)',
        5: 'linear-gradient(to right,#f006067c,#ebd40770)',
        6: 'linear-gradient(to right,#9306eb9c,#2c102abe)'
    };

    const categoryBackgrounds = useMemo(() => ({
        all: '/../../assets/img/fondos/lauracardona.png',
        1: '/../../assets/img/plantas/suculentas.jpg',
        2: '/../../assets/img/plantas/arreglofloral.jpg',
        3: '/../../assets/jardinb/carnivoras.jpeg',
        4: '/../../assets/img/fondos/portada.jpg',
        5: '/../../assets/jardinb/interior.jpeg',
        6: '/../../assets/img/plantas/imagen1.jpg'
    }), []);

    const fetchProducts = useCallback(async (category) => {
        try {
            let url = 'http://localhost:3001/api/products';
            if (category !== 'all') {
                url += `?category=${category}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
            setCategory(category);
            setHeaderBackground(categoryBackgrounds[category]);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, [categoryBackgrounds]);

    useEffect(() => {
        fetchProducts(currentCategory);
    }, [currentCategory, fetchProducts]);

    const addToCart = (product) => {
        const productInCart = cart.find(item => item.ProductoID === product.ProductoID);
        if (productInCart) {
            if (productInCart.cantidad < product.Stock) {
                setCart(prevCart => prevCart.map(item =>
                    item.ProductoID === product.ProductoID ? { ...item, cantidad: item.cantidad + 1 } : item
                ));
            } else {
                alert('No hay suficiente stock disponible.');
            }
        } else {
            setCart(prevCart => [...prevCart, { ...product, cantidad: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        const productInCart = cart.find(item => item.ProductoID === productId);
        if (productInCart.cantidad > 1) {
            setCart(prevCart => prevCart.map(item =>
                item.ProductoID === productId ? { ...item, cantidad: item.cantidad - 1 } : item
            ));
        } else {
            setCart(prevCart => prevCart.filter(item => item.ProductoID !== productId));
        }
    };

    const toggleCartVisibility = () => {
        setCartVisible(!cartVisible);
    };

    const handleCategoryChange = (newCategory) => {
        fetchProducts(newCategory);
    };

    const handleCheckout = () => {
        history.push('/pagar');
    };

    return (
        <div>
            <header className="header" style={{
                backgroundImage: `${categoryGradients[category]}, url(${headerBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <CategorySelector onSelectCategory={handleCategoryChange} />
                <h1 className="titulo-tienda">{categoryTitles[category]}</h1>
                <a href="/" className="logo">
                    <img className="logo" src="../../assets/img/ran__1_-removebg-preview.png" alt="Logo" />
                </a>
                <div className="cart-button-container">
                    <button className="cart-button" onClick={toggleCartVisibility}>
                        <img src="../../assets/img/iconos/carrito-de-compras.png" alt="Carrito" />
                        <span>{cart.reduce((acc, item) => acc + item.cantidad, 0)}</span>
                    </button>
                </div>
            </header>
            <div className="tienda">
                <div className="product-list">
                    {products.map((product) => (
                        <ProductItem
                            key={product.ProductoID}
                            product={product}
                            addToCart={addToCart}
                            cart={cart}
                        />
                    ))}
                </div>
            </div>

            <Cart cart={cart} removeFromCart={removeFromCart} isVisible={cartVisible} toggleCartVisibility={toggleCartVisibility} handleCheckout={handleCheckout} />
        </div>
    );
};

export default Tienda;
