import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const InformacionPasajeros = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { 
        selectedOutboundFlight = {}, 
        selectedReturnFlight = {}, 
        selectedOrigin = '', 
        selectedDestination = '', 
        passengerCount = 1 
    } = location.state || {};

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

    const handleValidation = () => {
        const { name, birthDate, document, gender } = passengerData;
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const birthYear = new Date(birthDate).getFullYear();
        const birthDateObject = new Date(birthDate);
        const documentLength = document.toString().length;

        if (!name) {
            alert('Por favor, complete el nombre del pasajero.');
            return false;
        }
        if (!birthDate) {
            alert('Por favor, complete la fecha de nacimiento.');
            return false;
        }
        if (birthYear < 1900 || birthYear > currentYear) {
            alert('Por favor, ingrese un año de nacimiento válido (mayor a 1900 y menor o igual al año actual).');
            return false;
        }
        if (birthDateObject > currentDate) {
            alert('La fecha de nacimiento no puede ser posterior a la fecha actual.');
            return false;
        }
        if (!document) {
            alert('Por favor, complete el documento.');
            return false;
        }
        if (documentLength < 7 || documentLength > 9) {
            alert('Por favor, ingrese un documento válido (entre 7 y 9 dígitos).');
            return false;
        }
        if (!gender) {
            alert('Por favor, seleccione el género.');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            setPassengers(prevPassengers => [...prevPassengers, passengerData]);
            setPassengerData({
                name: '',
                birthDate: '',
                document: '',
                gender: '',
            });
            setPassengerIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleContinue = () => {
        navigate('/extras', {
            state: {
                selectedOutboundFlight,
                selectedReturnFlight,
                selectedOrigin,
                selectedDestination,
                passengerCount,
                passengers
            }
        });
    };

    // Get the current date in YYYY-MM-DD format for the max attribute of the date input
    const today = new Date().toISOString().split('T')[0];

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
                    <form className="formulario-pasajeros" onSubmit={handleSubmit}>
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
                            max={today} // Ensure the date cannot be set in the future
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
                        
                        {passengerIndex < passengerCount && (
                            <button
                                type="submit"
                                className="boton-agregar-pasajero"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                            >
                                Agregar pasajero
                            </button>
                        )}
                        <br />
                        {passengerIndex >= passengerCount && (
                            <button
                                type="button"
                                className="boton-continuar"
                                onClick={handleContinue}
                            >
                                Continuar
                            </button>
                        )}
                        {/* ----- MODAL ---- */}
                        <div
                            className="modal fade"
                            id="staticBackdrop"
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabIndex="-1"
                            aria-labelledby="staticBackdropLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">
                                            Tenga en cuenta la siguiente información de su vuelo
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        Equipaje: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde ab earum cupiditate, optio perspiciatis harum eveniet quisquam veniam laudantium dolorem maiores facere. Consequatur eius labore ipsum beatae deserunt nihil ducimus! Pasajeros: Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ipsum quidem enim explicabo minus doloremque architecto unde tenetur, quae repellendus beatae mayores neque soluta repudiandae ut dignissimos perspiciatis necessitatibus nulla? Fechas: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, nihil dolore dolores nostrum sed pariatur tempora. Vero, iste commodi vel dolorum nobis, expedita magnam deleniti odit maxime magni eligendi quisquam?
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Cerrar
                                        </button>
                                        <button type="submit" className="btn btn-warning">
                                            Continuar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        <b><h3 style={{color:"black"}}>Pasajero {index + 1}</h3></b>
                                        <p>Nombre: {passenger.name || 'No especificado'}</p>
                                        <p>Fecha de nacimiento: {passenger.birthDate || 'No especificado'}</p>
                                        <p>Documento: {passenger.document || 'No especificado'}</p>
                                        <p>Género: {passenger.gender || 'No especificado'}</p>
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
