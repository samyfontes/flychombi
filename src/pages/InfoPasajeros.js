import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../App.css';

const InformacionPasajeros = () => {
    const location = useLocation();
    const { selectedOutboundFlight, selectedReturnFlight, selectedOrigin, selectedDestination, passengerCount } = location.state || {};

    const [passengerData, setPassengerData] = useState({
        name: '',
        birthDate: '',
        document: '',
        gender: '',
    });

    const [passengerIndex, setPassengerIndex] = useState(0);
    const [passengers, setPassengers] = useState([]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setPassengerData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleRadioChange = (e) => {
        setPassengerData(prevState => ({
            ...prevState,
            gender: e.target.value,
        }));
    };

    const handleAddPassenger = (e) => {
        e.preventDefault();
        // Agrega los datos del pasajero actual a la lista de pasajeros
        setPassengers(prevPassengers => [...prevPassengers, passengerData]);
        // Reinicia el estado de los datos del pasajero para el próximo pasajero
        setPassengerData({
            name: '',
            birthDate: '',
            document: '',
            gender: '',
        });
        // Avanza al siguiente pasajero
        setPassengerIndex(prevIndex => prevIndex + 1);
    };

    const displayPassengerData = () => {
        // Mostrar los datos de los pasajeros después de que se hayan ingresado todos los datos
        if (passengers.length === passengerCount) {
            return passengers.map((passenger, index) => (
                <div key={index}>
                    <h3>Pasajero {index + 1}</h3>
                    <p>Nombre: {passenger.name}</p>
                    <p>Fecha de nacimiento: {passenger.birthDate}</p>
                    <p>Documento: {passenger.document}</p>
                    <p>Género: {passenger.gender}</p>
                </div>
            ));
        }
    };

    return (
        <div className="div-info-pasajeros">
            <section>
                <div className="seccion-titulo-pasajeros">
                    <h1 className="titulo-pasajeros">
                        Información de los pasajeros
                    </h1>
                </div>
            </section>
            <section>
                <div className="contenedor-principal">
                    <form className="formulario-pasajeros" onSubmit={handleAddPassenger}>
                        <input
                            type="text"
                            id="name"
                            placeholder="Nombre del pasajero"
                            required
                            value={passengerData.name}
                            onChange={handleInputChange}
                        />
                        <br />
                        <label htmlFor="birthDate">Fecha de nacimiento</label>
                        <input
                            type="date"
                            id="birthDate"
                            className="item-1"
                            placeholder="Fecha de nacimiento"
                            required
                            value={passengerData.birthDate}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            id="document"
                            className="item-1"
                            placeholder="Documento"
                            required
                            value={passengerData.document}
                            onChange={handleInputChange}
                        />
                        <div>
                            <label htmlFor="">Indique su sexo</label>
                            <br />
                            <label htmlFor="femenino">Femenino</label>
                            <input
                                type="radio"
                                className="checkbox"
                                id="femenino"
                                name="gender"
                                value="Femenino"
                                checked={passengerData.gender === 'Femenino'}
                                onChange={handleRadioChange}
                            />
                            <br />
                            <label htmlFor="masculino">Masculino</label>
                            <input
                                type="radio"
                                id="masculino"
                                name="gender"
                                value="Masculino"
                                checked={passengerData.gender === 'Masculino'}
                                onChange={handleRadioChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="boton-agregar-pasajero"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                        >
                            Agregar pasajero
                        </button>
                        <br></br>
                            {/* Mostrar el botón Continuar solo si todos los pasajeros han sido agregados */}
                        {passengers.length === passengerCount && (
                            <Link to="/extras" state={{ passengers }}>
                                <button className="boton-continuar" style={{width: '100%'}}>
                                    Continuar
                                </button>
                            </Link>
                        )}
                    </form>

                    <div className="informacion-sobre-vuelo">
                        <h2>Información sobre la selección de vuelos:</h2>
                        <p>Origen: {selectedOrigin}</p>
                        <p>Destino: {selectedDestination}</p>
                        <p>Cantidad de pasajeros: {passengerCount}</p>
                        {selectedOutboundFlight && <p>Precio del vuelo de ida: ${selectedOutboundFlight.flight_price}</p>}
                        {selectedOutboundFlight && <p>Fecha del vuelo de ida: {selectedOutboundFlight.flight_date}</p>}
                        {selectedReturnFlight && <p>Precio del vuelo de vuelta: ${selectedReturnFlight.flight_price}</p>}
                        {selectedReturnFlight && <p>Fecha del vuelo de vuelta: {selectedReturnFlight.flight_date}</p>}

                        {passengerIndex > 0 && (
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
                </div>
            </section>
        </div>
    );
};

export default InformacionPasajeros;
