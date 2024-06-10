import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';

const InformacionPasajeros = () => {
    const location = useLocation();
    const { selectedOutboundFlight, selectedReturnFlight, selectedOrigin, selectedDestination, passengerCount } = location.state || {};

    return (
        <div className="div-info-pasajeros">
            <section>
                <div className="seccion-titulo-pasajeros">
                    <h1 className="titulo-pasajeros">
                        Informacion de los pasajeros
                    </h1>
                </div>
            </section>
            <section>
                <div className="contenedor-principal">
                    <form className="formulario-pasajeros">
                        <input type="text" id="nombre" placeholder="Nombre del pasajero" required />
                        <br />
                        <label htmlFor="fecha-nacimiento">Fecha de nacimiento</label>
                        <input type="date" id="fecha-nacimiento" className="item-1" placeholder="Fecha de nacimiento" required />
                        <input type="number" id="documento" className="item-1" placeholder="Documento" required />
                        <div>
                            <label htmlFor="">Indique su sexo</label>
                            <br />
                            <label htmlFor="femenino">Femenino</label>
                            <input type="radio" className="checkbox" id="femenino" name="sexo" value="Femenino" />
                            <br />
                            <label htmlFor="masculino">Masculino</label>
                            <input type="radio" id="masculino" name="sexo" value="Masculino" />
                        </div>

                        <button type="button" className="boton-continuar" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Continuar
                        </button>
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="staticBackdropLabel">Tenga en cuenta la siguiente informacion de su vuelo</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        Equipaje: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde ab earum cupiditate, optio perspiciatis harum eveniet quisquam veniam laudantium dolorem maiores facere. Consequatur eius labore ipsum beatae deserunt nihil ducimus! Pasajeros: Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ipsum quidem enim explicabo minus doloremque architecto unde tenetur, quae repellendus beatae maiores neque soluta repudiandae ut dignissimos perspiciatis necessitatibus nulla? Fechas: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, nihil dolore dolores nostrum sed pariatur tempora. Vero, iste commodi vel dolorum nobis, expedita magnam deleniti odit maxime magni eligendi quisquam?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" className="btn btn-warning">Continuar</button>
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
                        {selectedOutboundFlight && <p>Fecha del vuelo de ida: {selectedOutboundFlight.flight_price}</p>}
                        {selectedReturnFlight && <p>Precio del vuelo de vuelta: ${selectedReturnFlight.price}</p>}
                        {selectedReturnFlight && <p>Fecha del vuelo de vuelta: {selectedReturnFlight.flight_date}</p>}

                    </div>
                </div>
            </section>
        </div>
    );
};

export default InformacionPasajeros;
