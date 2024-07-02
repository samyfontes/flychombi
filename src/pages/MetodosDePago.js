import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const MetodosDePago = () => {
    const navigate = useNavigate();

    const globalStyle = {
        fontFamily: 'Arial, Helvetica, sans-serif',
        minHeight: '100vh',
        margin: '1%'
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
    };

    const textoIzquierdoStyle = {
        backgroundColor: '#fdbe0f',
        borderRadius: '15px',
        flexDirection: 'column',
        flex: 2,
        padding: '20px',
        height: 'auto',
    };

    const subtituloStyle = {
        backgroundColor: 'white',
        fontSize: '32px',
        color: 'black',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '10px',
        marginBottom: '20px',
    };

    const datosDelUsuarioStyle = {
        backgroundColor: 'white',
        textAlign: 'center',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
    };

    const textoDerechaStyle = {
        backgroundColor: '#fdbe0f',
        borderRadius: '15px',
        padding: '30px',
        marginLeft: '25px',
        flex: 1,
        minHeight: 'auto',
    };

    const contenidoStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        fontSize: '20px',
        listStyleType: 'none',
        height: '100%',
    };

    const mpStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '15px',
        marginBottom: '20px',
    };

    const datos1Style = {
        padding: '5px',
        fontSize: '20px',
        margin: '10px 0',
    };

    const inputFormasDePagoStyle = {
        outline: 'none',
        width: '70%',
        borderStyle: 'none',
        borderBottom: '2px solid black',
        textAlign: 'center',
        fontSize: 'medium',
        padding: '10px',
        margin: '5px',
    };

    const botonMPStyle = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        cursor: 'pointer',
        borderRadius: '50px',
        padding: '10px 20px',
        border: '1px solid #fdbe0f',
        marginLeft: '10px',
    };

    const textoMPStyle = {
        padding: '10px',
        fontSize: '20px',
    };

    const botonContinuarStyle = {
        backgroundColor: '#fdbe0f',
        color: 'black',
        border: 'none',
        padding: '15px 30px',
        cursor: 'pointer',
        borderRadius: '20px',
        fontSize: '16px',
        textAlign: 'center',
    };

    const botonHoverStyle = {
        transform: 'scale(1.1)',
        transition: '.2s',
    };

    const location = useLocation();
    const { selectedOutboundFlight, selectedReturnFlight, selectedOrigin, selectedDestination, passengerCount, passengers, selectedBaggage, selectedEspecialBaggage } = location.state || {};

    // Calcular el costo total
    const precioVueloIda = selectedOutboundFlight ? selectedOutboundFlight.flight_price : 0;
    const precioVueloVuelta = selectedReturnFlight ? selectedReturnFlight.flight_price : 0;
    const precioEquipaje = selectedBaggage ? selectedBaggage.price : 0;
    const precioEquipajeEspecial = selectedEspecialBaggage ? selectedEspecialBaggage.price : 0;

    const costoTotal = precioVueloIda + precioVueloVuelta + precioEquipaje + precioEquipajeEspecial;

    console.log(selectedBaggage, selectedEspecialBaggage);

    const handlePagoClick = () => {
        navigate('/confirmacion-compra', { state: { costoTotal } }); // Pasar costoTotal como parte del estado
    };

    return (
        <div style={globalStyle}>
            <section style={containerStyle}>
                <div style={textoIzquierdoStyle}>
                    <p style={subtituloStyle}>
                        <b>Tarjeta de Crédito/Debito</b>
                    </p>
                    <form style={datosDelUsuarioStyle} action="" method="post">
                        <div style={datos1Style}>
                            <label htmlFor="Tarjeta"></label>
                            <input
                                type="number"
                                style={inputFormasDePagoStyle}
                                id="Tarjeta"
                                name="NumeroDeTarjeta"
                                placeholder="Número de tarjeta"
                                maxLength="16"
                                required
                            />
                            <label htmlFor="nombre"></label>
                            <input
                                type="text"
                                style={inputFormasDePagoStyle}
                                id="nombre"
                                name="nombre"
                                placeholder="Nombre del titular"
                                required
                            />
                            <label htmlFor="documento"></label>
                            <input
                                type="number"
                                style={inputFormasDePagoStyle}
                                id="documento"
                                name="documento"
                                placeholder="Ingresa el documento"
                                required
                            />
                            <label htmlFor="FechaDeCaducidad"></label>
                            <input
                                type="date"
                                style={inputFormasDePagoStyle}
                                id="FechaDeCaducidad"
                                name="FechaDeCaducidad"
                                required
                            />
                            <label htmlFor="codigo"></label>
                            <input
                                type="number"
                                style={inputFormasDePagoStyle}
                                id="codigo"
                                name="codigo"
                                placeholder="Ingresa el código"
                                maxLength="3"
                                required
                            />
                        </div>
                    </form>
                    <div style={mpStyle}>
                        <p style={textoMPStyle}>
                            <b>METODOS DE PAGO</b>
                        </p>
                        <button
                            style={botonMPStyle}
                            onMouseOver={(e) => e.currentTarget.style.transform = botonHoverStyle.transform}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                            onClick={() => window.location.href = 'https://www.mercadopago.com'}
                        >
                            <img src="/img/mercadoPagoLogo.png" alt="Mercado Pago" style={{ height: '30px', marginRight: '10px' }} />
                            
                        </button>
                    </div>
                </div>
                <div style={textoDerechaStyle}>
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
                        {selectedBaggage && (
                            <p>Equipaje: {selectedBaggage.name} - ${selectedBaggage.price}</p>
                        )}
                        {selectedEspecialBaggage && (
                            <p>Equipaje especial: {selectedEspecialBaggage.name} - ${selectedEspecialBaggage.price}</p>
                        )}
                        <h3>Total: ${costoTotal}</h3>
                        <div style={mpStyle}>
                            <button
                                style={botonMPStyle}
                                onMouseOver={(e) => e.currentTarget.style.transform = botonHoverStyle.transform}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                                onClick={handlePagoClick}
                            >
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
