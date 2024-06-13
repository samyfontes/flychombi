import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmacionCompra = () => {
    const location = useLocation();
    const { costoTotal } = location.state || {};

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'Arial, Helvetica, sans-serif',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{
                textAlign: 'center',
                padding: '50px',
                backgroundColor: '#fdbe0f',
                borderRadius: '15px'
            }}>
                <h1>Compra Realizada</h1>
                <p>¡Gracias por su compra! Su transacción ha sido completada con éxito.</p>
                <p>Total pagado: ${costoTotal}</p> {/* Mostrar el total pagado */}
                <a href="/" style={{
                    display: 'inline-block',
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: 'white',
                    color: '#fdbe0f',
                    textDecoration: 'none',
                    borderRadius: '10px',
                    border: '1px solid #fdbe0f',
                    fontWeight: 'bold'
                }}>Volver al inicio</a>
            </div>
        </div>
    );
};

export default ConfirmacionCompra;

