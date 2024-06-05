// SearchResults.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import FlightCard from '../components/FlightCard';

const SearchResults = () => {
    const location = useLocation();
    const { selectedOrigin, selectedDestination, passengerCount, tripType, filteredFlights } = location.state;

    const [flights, setFlights] = useState([]);
    const [outboundFlights, setOutboundFlights] = useState(filteredFlights);
    const [returnFlights, setReturnFlights] = useState([]);
    const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchFlightData();
    }, []);

    const fetchFlightData = async () => {
        try {
            const q = query(collection(db, "flights"));
            const querySnapshot = await getDocs(q);
            const flightData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setFlights(flightData);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }

    const handleOutboundFlightSelect = (flight) => {
        setSelectedOutboundFlight(flight);

        const filteredReturnFlights = flights.filter(f =>
            f.flight_origin === selectedDestination &&
            f.flight_destination === selectedOrigin &&
            f.flight_availability >= passengerCount
        );

        setReturnFlights(filteredReturnFlights);

        if (filteredReturnFlights.length === 0) {
            setErrorMessage('No hay vuelos de vuelta disponibles para esta selección.');
        } else {
            setErrorMessage('');
        }
    };

    const handleReturnFlightSelect = (flight) => {
        console.log('Selected return flight:', flight);
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    {!selectedOutboundFlight && (
                        <>
                            <h4>Selecciona el vuelo de ida</h4>
                            {outboundFlights.map(flight => (
                                <div className="col-md-4" key={flight.id}>
                                    <FlightCard flight={flight} onSelect={() => handleOutboundFlightSelect(flight)} />
                                </div>
                            ))}
                        </>
                    )}

                    {tripType === 'round-trip' && selectedOutboundFlight && (
                        <>
                            <h4>Selecciona el vuelo de vuelta</h4>
                            {returnFlights.map(flight => (
                                <div className="col-md-4" key={flight.id}>
                                    <FlightCard flight={flight} onSelect={() => handleReturnFlightSelect(flight)} />
                                </div>
                            ))}
                        </>
                    )}
                </div>
                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default SearchResults;
