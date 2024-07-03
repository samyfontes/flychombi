import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from "axios";

// Initialize MercadoPago with your public key
initMercadoPago('TEST-ad4c6a2f-4902-4fbf-917a-9b08c244665f', { locale: "es-AR" });

const MetodosDePago = () => {
    const navigate = useNavigate();
    const [preferenceId, setPreferenceId] = useState(null);
    const location = useLocation();

    // Extract state data passed via navigation
    const { 
        selectedOutboundFlight, selectedReturnFlight, 
        selectedOrigin, selectedDestination, 
        passengerCount, passengers, 
        selectedBaggage, selectedEspecialBaggage 
    } = location.state || {};

    // Calculate the total cost
    const precioVueloIda = selectedOutboundFlight?.flight_price || 0;
    const precioVueloVuelta = selectedReturnFlight?.flight_price || 0;
    const precioEquipaje = selectedBaggage?.price || 0;
    const precioEquipajeEspecial = selectedEspecialBaggage?.price || 0;
    const costoTotal = precioVueloIda + precioVueloVuelta + precioEquipaje + precioEquipajeEspecial;

    // Create payment preference
    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:3000/create_preference", {
                title: "Total de compra",
                quantity: 1,
                price: costoTotal,
            });
            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    };

    // Handle payment initiation
    const handleBuy = async () => {
        try {
            const id = await createPreference();
            if (id) setPreferenceId(id);
        } catch (error) {
            console.error('Error creating preference', error);
        }
    };

    // Navigate to the confirmation page
    const handlePagoClick = () => {
        navigate('/confirmacion-compra', { state: { costoTotal } });
    };

    // Styles
    const styles = {
        globalStyle: { fontFamily: 'Arial, Helvetica, sans-serif', minHeight: '100vh', margin: '1%' },
        containerStyle: { display: 'flex', flexDirection: 'row' },
        textoIzquierdoStyle: { backgroundColor: '#fdbe0f', borderRadius: '15px', flexDirection: 'column', flex: 2, padding: '20px', height: 'auto' },
        subtituloStyle: { backgroundColor: 'white', fontSize: '32px', color: 'black', textAlign: 'center', padding: '10px', borderRadius: '10px', marginBottom: '20px' },
        datosDelUsuarioStyle: { backgroundColor: 'white', textAlign: 'center', padding: '20px', borderRadius: '10px', marginBottom: '20px' },
        textoDerechaStyle: { backgroundColor: '#fdbe0f', borderRadius: '15px', padding: '30px', marginLeft: '25px', flex: 1, minHeight: 'auto' },
        contenidoStyle: { display: 'flex', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: 'white', padding: '20px', borderRadius: '10px', fontSize: '20px', listStyleType: 'none', height: '100%' },
        mpStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', marginBottom: '20px' },
        datos1Style: { padding: '5px', fontSize: '20px', margin: '10px 0' },
        inputFormasDePagoStyle: { outline: 'none', width: '70%', borderStyle: 'none', borderBottom: '2px solid black', textAlign: 'center', fontSize: 'medium', padding: '10px', margin: '5px' },
        botonMPStyle: { backgroundColor: 'white', cursor: 'pointer', borderRadius: '50px', padding: '10px 20px', border: '1px solid #fdbe0f', marginLeft: '10px' },
        textoMPStyle: { padding: '10px', fontSize: '20px' },
        botonContinuarStyle: { backgroundColor: '#fdbe0f', color: 'black', border: 'none', padding: '15px 30px', cursor: 'pointer', borderRadius: '20px', fontSize: '16px', textAlign: 'center' },
        botonHoverStyle: { transform: 'scale(1.1)', transition: '.2s' }
    };

    return (
        <div style={styles.globalStyle}>
            <section style={styles.containerStyle}>
                <div style={styles.textoIzquierdoStyle}>
                    <p style={styles.subtituloStyle}><b>Tarjeta de Crédito/Debito</b></p>
                    <form style={styles.datosDelUsuarioStyle}>
                        <div style={styles.datos1Style}>
                            <label htmlFor="Tarjeta"></label>
                            <input type="number" style={styles.inputFormasDePagoStyle} id="Tarjeta" name="NumeroDeTarjeta" placeholder="Número de tarjeta" maxLength="16" required />
                            <label htmlFor="nombre"></label>
                            <input type="text" style={styles.inputFormasDePagoStyle} id="nombre" name="nombre" placeholder="Nombre del titular" required />
                            <label htmlFor="documento"></label>
                            <input type="number" style={styles.inputFormasDePagoStyle} id="documento" name="documento" placeholder="Ingresa el documento" required />
                            <label htmlFor="FechaDeCaducidad"></label>
                            <input type="date" style={styles.inputFormasDePagoStyle} id="FechaDeCaducidad" name="FechaDeCaducidad" required />
                            <label htmlFor="codigo"></label>
                            <input type="number" style={styles.inputFormasDePagoStyle} id="codigo" name="codigo" placeholder="Ingresa el código" maxLength="3" required />
                        </div>
                    </form>
                    <div style={styles.mpStyle}>
                        <p style={styles.textoMPStyle}><b>METODOS DE PAGO</b></p>
                        <div style={styles.mpStyle}>
                        <button style={styles.botonMPStyle}
                            onMouseOver={(e) => e.currentTarget.style.transform = styles.botonHoverStyle.transform}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                            onClick={handleBuy}>
                            Continuar hacia Mercado PAGO
                        </button>
                        {preferenceId && <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}
        </div>
                </div>
                </div>
                <div style={styles.textoDerechaStyle}>
                    <div style={{ height: '100%', backgroundColor: 'white', borderRadius: '20px', padding: '2.5%', fontSize: 'medium' }}>
                        <h4 style={{ fontSize: 'medium' }}>RESUMEN DE VUELO</h4>
                        <p>Origen: {selectedOrigin}</p>
                        <p>Destino: {selectedDestination}</p>
                        <p>Cantidad de pasajeros: {passengerCount}</p>
                        {selectedOutboundFlight && <p>Precio del vuelo de ida: ${selectedOutboundFlight.flight_price}</p>}
                        {selectedOutboundFlight && <p>Fecha del vuelo de ida: {selectedOutboundFlight.flight_date}</p>}
                        {selectedReturnFlight && <p>Precio del vuelo de vuelta: ${selectedReturnFlight.flight_price}</p>}
                        {selectedReturnFlight && <p>Fecha del vuelo de vuelta: {selectedReturnFlight.flight_date}</p>}
                        {passengers && passengers.length > 0 && (
                            <div>
                                <h2>Información de los pasajeros:</h2>
                                {passengers.map((passenger, index) => (
                                    <div key={index}>
                                        <h3>Pasajero {index + 1}</h3>
                                        <p>Nombre: {passenger.name || 'No especificado'}</p>
                                        <p>Fecha de nacimiento: {passenger.birthDate || 'No especificado'}</p>
                                        <p>Documento: {passenger.document || 'No especificado'}</p>
                                        <p>Género: {passenger.gender || 'No especificado'}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {selectedBaggage && <p>Equipaje: {selectedBaggage.name} - ${selectedBaggage.price}</p>}
                        {selectedEspecialBaggage && <p>Equipaje especial: {selectedEspecialBaggage.name} - ${selectedEspecialBaggage.price}</p>}
                        <h3>Total: ${costoTotal}</h3>
                        <div style={styles.mpStyle}>
                            <button style={styles.botonMPStyle}
                                onMouseOver={(e) => e.currentTarget.style.transform = styles.botonHoverStyle.transform}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                                onClick={handlePagoClick}>
                                PAGAR
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MetodosDePago;
