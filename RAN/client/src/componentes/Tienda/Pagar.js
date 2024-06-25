import React, { useState } from 'react';

const Pagar = ({ cart, updateStockAfterPayment }) => {
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleConfirmPayment = () => {
        // Aquí puedes enviar la información del carrito y el método de pago al servidor
        updateStockAfterPayment(cart);
        alert('Pago confirmado');
    };

    return (
        <div>
            <h1>Pagar</h1>
            <ul>
                {cart.map((item) => (
                    <li key={item.ProductoID}>
                        <img src={item.imageUrl} alt={item.NombreProducto} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        {item.NombreProducto} - ${item.Precio} x {item.cantidad}
                    </li>
                ))}
            </ul>
            <div>
                <label htmlFor="paymentMethod">Método de Pago:</label>
                <select id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <option value="creditCard">Tarjeta de Crédito</option>
                    <option value="debitCard">Tarjeta de Débito</option>
                    <option value="paypal">PayPal</option>
                    <option value="bankTransfer">Transferencia Bancaria</option>
                </select>
            </div>
            <button onClick={handleConfirmPayment}>Confirmar Pago</button>
        </div>
    );
};

export default Pagar;
