import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Extras = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedOutboundFlight, selectedReturnFlight, selectedOrigin, selectedDestination, passengerCount, passengers } = location.state || {};

    const extrasContainer = {
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#faebd7',
        marginBottom: '10px'
    };

    const divBody = {
        width: '100%',
        maxWidth: '1200px',
    };

    const divEquipajes = {
        flexDirection: 'column',
        width: '60%',
        margin: '0 auto',
    };

    const formPesoEquipajes = {
        display: 'flex',
        flexDirection: 'row',
    };

    const divPesoEquiapajes = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ffa800',
        margin: '10px',
        padding: '5px',
        textAlign: 'center',
        borderRadius: '10px',
        cursor: 'pointer'
    };

    const imgOpcionesPesoEquipajes = {
        margin: 'auto',
        width: '70px',
        height: '70px',
        borderRadius: '50%'
    };

    const divOpcionesEquipajesEspeciales = {
        display: 'flex',
        lineHeight: '80px',
        height: '80px',
        backgroundColor: '#ffa800',
        margin: '10px',
        padding: '5px',
        textAlign: 'center',
        justifyContent: 'space-around',
        borderRadius: '10px',
        cursor: 'pointer',
    };

    const imgEquipajeEspecial = {
        width: '60px',
        height: '60px',
        marginTop: 'auto',
        marginBottom: 'auto',
        borderRadius: '50%'
    };

    const btnContinuar = {
        backgroundColor: '#ffa800',
        width: '60%',
        height: '40px',
        borderRadius: '50px',
        margin: '5% 0 8% 20%',
        fontSize: 'medium',
        cursor: 'pointer'
    };

    const equipajeEspecial = {
        marginTop: '10px',
    };

    const seccionEquipaje = {
        backgroundColor: "#ffa800",
        width: "58%",
        padding: "25px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        border: "1px solid black",
        borderRadius: "20px",
    };

    const [selectedBaggage, setSelectedBaggage] = useState(null);
    const [selectedEspecialBaggage, setSelectedEspecialBaggage] = useState(null);

    const valorEquipajeEspecial = {name: "equipaje especial", price: 12500};
    const valorEquipajeEspecial2 = {name: "mascota en cabina", price: 15000};
    const valorEquipaje = {name: "equipaje bodega 9kg", price: 10000};
    const valorEquipaje2 = {name: "equipaje bodega 15kg", price: 15000};
    const valorEquipaje3 = {name: "equipaje bodega 20kg", price: 20000};

    const handleBaggageSelection = (event) => {
        console.log("Selected Baggage:", event.target.value);
        setSelectedBaggage(JSON.parse(event.target.value));
    };

    const handleSpecialBaggageSelection = (event) => {
        console.log("Selected Special Baggage:", event.target.value);
        setSelectedEspecialBaggage(JSON.parse(event.target.value));
    };

    const handleContinuar = () => {
        navigate('/metodos-de-pago', {
            state: {
                selectedOutboundFlight,
                selectedReturnFlight,
                selectedOrigin,
                selectedDestination,
                passengerCount,
                passengers,
                selectedBaggage,
                selectedEspecialBaggage
            }
        });
    };
    const seleccionarRadio = (div) => {
        const radio = div.currentTarget.querySelector('input[type="radio"]');
        radio.checked = true;
    };
    return (
        <div style={extrasContainer}>
            <div style={divBody} className='divBody'>
                <main>
                    <div style={divEquipajes}>
                        <form style={formPesoEquipajes} method="post">
                            <div style={divPesoEquiapajes} className="divOpcionesPesoEquipajes" onClick={seleccionarRadio}>
                                <img src="/img/equipaje de bodega 1.png" alt="" style={imgOpcionesPesoEquipajes} className="imgOpcionesPesoEquipajes" />
                                <label>Equipaje hasta 9kg $10000 </label>
                                <br />
                                <input type="radio" name="pesoEquipaje" value={JSON.stringify(valorEquipaje)} onChange={handleBaggageSelection}/>
                            </div>
                            <div style={divPesoEquiapajes} className="divOpcionesPesoEquipajes" onClick={seleccionarRadio}>
                                <img src="/img/equipaje de bodega 1.png" alt="" style={imgOpcionesPesoEquipajes} className="imgOpcionesPesoEquipajes" />
                                <label>Equipaje hasta 15kg $15000 </label>
                                <br />
                                <input type="radio" name="pesoEquipaje" value={JSON.stringify(valorEquipaje2)} onChange={handleBaggageSelection}/>
                            </div>
                            <div style={divPesoEquiapajes} className="divOpcionesPesoEquipajes" onClick={seleccionarRadio}>
                                <img src="/img/equipaje de bodega 1.png" alt="" style={imgOpcionesPesoEquipajes} className="imgOpcionesPesoEquipajes" />
                                <label>Equipaje hasta 20kg $20000 </label>
                                <br />
                                <input type="radio" name="pesoEquipaje" value={JSON.stringify(valorEquipaje3)} onChange={handleBaggageSelection}/>
                            </div>
                        </form>

                        <div style={equipajeEspecial}>
                            <form className="formEquipajeEspecial" method="post">
                                <div style={divOpcionesEquipajesEspeciales} className="divOpcionesEquipajesEspeciales">
                                    <img src="/img/equipaje de mano.png" alt="" style={imgEquipajeEspecial} className="imgEquipajeEspecial" />
                                    <label>Equipaje de mano incluido(6kg)</label>
                                </div>
                                <div style={divOpcionesEquipajesEspeciales} className="divOpcionesEquipajesEspeciales" onClick={seleccionarRadio}>
                                    <img src="/img/equipaje especial.png" alt="" style={imgEquipajeEspecial} className="imgEquipajeEspecial" />
                                    <label>Equipaje especial $12500 </label>
                                    <input type="radio" value={JSON.stringify(valorEquipajeEspecial)} name="tipoDeEquipaje" onChange={handleSpecialBaggageSelection}/>
                                </div>
                                <div style={divOpcionesEquipajesEspeciales} className="divOpcionesEquipajesEspeciales" onClick={seleccionarRadio}>
                                    <img src="/img/mascota en cabina.png" alt="" style={imgEquipajeEspecial} className="imgEquipajeEspecial" />
                                    <label>Mascota en cabina $15000 </label>
                                    <input type="radio" name="tipoDeEquipaje" value={JSON.stringify(valorEquipajeEspecial2)} onChange={handleSpecialBaggageSelection}/>
                                </div>
                            </form>
                        </div>

                        <input style={btnContinuar} type="button" value="Continuar" id="btnContinuar" onClick={handleContinuar}/>
                    </div>
                </main>

                <section style={seccionEquipaje} className='seccionEquipaje'>
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
                                        <p>Nombre: {passenger.name}</p>
                                        <p>Fecha de nacimiento: {passenger.birthDate}</p>
                                        <p>Documento: {passenger.document}</p>
                                        <p>Género: {passenger.gender}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Extras;
