import React from "react";

const MetodosDePago = () => {

    const globalStyle = {
        fontFamily: 'Arial, Helvetica, sans-serif',
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
                            <b>Para pagar con mercado pago:</b>
                        </p>
                        <button
                            style={botonMPStyle}
                            onMouseOver={(e) => e.currentTarget.style.transform = botonHoverStyle.transform}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                        >
                            Continuar hacia MP
                        </button>
                    </div>
                    <div style={datosDelUsuarioStyle}>
                        <button
                            style={botonContinuarStyle}
                            onMouseOver={(e) => e.currentTarget.style.transform = botonHoverStyle.transform}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                            
                        >
                            <b>Continuar</b>
                        </button>
                    </div>
                </div>
                <div style={textoDerechaStyle}>
                    <ul style={contenidoStyle}>
                        <li>Fecha:</li>
                        <li>Lugar de ida:</li>
                        <li>Lugar de vuelta:</li>
                        <li>Horarios:</li>
                        <li>Información del usuario:</li>
                    </ul>
                </div>
            </section>

        </div>
    );
};

export default MetodosDePago;
