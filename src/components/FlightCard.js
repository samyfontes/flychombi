const FlightCard = ({ flight }) => {
    return (
        <div className="card" style={{ width: '18rem', margin: '1rem' }}>
            <div className="card-body">
                <h5 className="card-title">Flight from {flight.flight_origin} to {flight.flight_destination}</h5>
                <p className="card-text">Date: {flight.flight_date}</p>
                <p className="card-text">Price: ${flight.flight_price}</p>
                <p className="card-text">Availability: {flight.flight_availability}</p>
                <a href="#" className="btn btn-primary">Book Now</a>
            </div>
        </div>
    );
}

export default FlightCard;