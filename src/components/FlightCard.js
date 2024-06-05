// FlightCard.js
import React from 'react';

const FlightCard = ({ flight, onSelect }) => {
    return (
        <div className="card" style={{ width: '18rem', cursor: 'pointer' }} onClick={onSelect}>
            <img className="card-img-top" src="img/flight.jpg" alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">Vuelo de {flight.flight_origin} a {flight.flight_destination}</h5>
                <p className="card-text">Fecha: {flight.flight_date}</p>
                <p className="card-text">Precio: ${flight.flight_price}</p>
                <p className="card-text">Disponibilidad: {flight.flight_availability}</p>
                <button className="btn btn-primary">Seleccionar</button>
            </div>
        </div>
    );
}

export default FlightCard;
