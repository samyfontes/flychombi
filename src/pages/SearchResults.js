import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import FlightCard from '../components/FlightCard';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedOrigin, selectedDestination, passengerCount, tripType, filteredFlights } = location.state;

    const [flights, setFlights] = useState([]);
    const [outboundFlights, setOutboundFlights] = useState(filteredFlights);
    const [returnFlights, setReturnFlights] = useState([]);
    const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
    const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [departureMonthYear, setDepartureMonthYear] = useState('');
    const [arrivalMonthYear, setArrivalMonthYear] = useState('');

    useEffect(() => {
        fetchFlightData();
    }, []);

    useEffect(() => {
        filterFlights();
    }, [departureMonthYear, arrivalMonthYear, flights]);

    const fetchFlightData = async () => {
        try {
            const q = query(collection(db, "flights"));
            const querySnapshot = await getDocs(q);
            const flightData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setFlights(flightData);
            console.log('Fetched flight data:', flightData);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }

    const filterFlights = () => {
        console.log('Filtering flights with:', { departureMonthYear, arrivalMonthYear });

        const filteredOutboundFlights = flights.filter(f =>
            f.flight_origin === selectedOrigin &&
            f.flight_destination === selectedDestination &&
            f.flight_availability >= passengerCount &&
            (!departureMonthYear || (f.flight_date && f.flight_date.startsWith(departureMonthYear)))
        );

        setOutboundFlights(filteredOutboundFlights);
        console.log('Filtered outbound flights:', filteredOutboundFlights);

        if (selectedOutboundFlight && tripType === 'round-trip') {
            const filteredReturnFlights = flights.filter(f =>
                f.flight_origin === selectedDestination &&
                f.flight_destination === selectedOrigin &&
                f.flight_availability >= passengerCount &&
                (!arrivalMonthYear || (f.flight_date && f.flight_date.startsWith(arrivalMonthYear)))
            );

            setReturnFlights(filteredReturnFlights);
            console.log('Filtered return flights:', filteredReturnFlights);

            if (filteredReturnFlights.length === 0) {
                setErrorMessage('No hay vuelos de vuelta disponibles para esta selección.');
            } else {
                setErrorMessage('');
            }
        }
    };

    const handleOutboundFlightSelect = (flight) => {
        setSelectedOutboundFlight(flight);

        if (tripType === 'round-trip') {
            const filteredReturnFlights = flights.filter(f =>
                f.flight_origin === selectedDestination &&
                f.flight_destination === selectedOrigin &&
                f.flight_availability >= passengerCount &&
                (!arrivalMonthYear || (f.departure_date && f.departure_date.startsWith(arrivalMonthYear)))
            );

            setReturnFlights(filteredReturnFlights);

            if (filteredReturnFlights.length === 0) {
                setErrorMessage('No hay vuelos de vuelta disponibles para esta selección.');
            } else {
                setErrorMessage('');
            }
        }
    };

    const handleReturnFlightSelect = (flight) => {
        setSelectedReturnFlight(flight);
    };

    const handleConfirmSelection = () => {
        if (selectedOutboundFlight && (tripType === 'one-way' || (tripType === 'round-trip' && selectedReturnFlight))) {
            navigate('/informacion-pasajeros', { state: { selectedOutboundFlight, selectedReturnFlight } });
        } else {
            setErrorMessage('Por favor seleccione los vuelos de ida y vuelta.');
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '180px' }}>
            <div>
                <h4>Fecha de salida (Mes/Año)</h4>
                <input type="month" value={departureMonthYear} onChange={e => setDepartureMonthYear(e.target.value)} />
            </div>
            <div>
                <h4>Fecha de llegada (Mes/Año)</h4>
                <input
                    type="month"
                    value={arrivalMonthYear}
                    onChange={e => setArrivalMonthYear(e.target.value)}
                    disabled={tripType !== 'round-trip' || !selectedOutboundFlight}
                />
            </div>

            {!selectedOutboundFlight && (
                <>
                    <h4>Selecciona el vuelo de ida</h4>
                    {outboundFlights.length > 0 ? (
                        outboundFlights.map(flight => (
                            <FlightCard key={flight.id} flight={flight} onSelect={() => handleOutboundFlightSelect(flight)} />
                        ))
                    ) : (
                        <p>No hay vuelos disponibles para los filtros seleccionados.</p>
                    )}
                </>
            )}

            {tripType === 'round-trip' && selectedOutboundFlight && (
                <>
                    <h4>Selecciona el vuelo de vuelta</h4>
                    {returnFlights.length > 0 ? (
                        returnFlights.map(flight => (
                            <FlightCard key={flight.id} flight={flight} onSelect={() => handleReturnFlightSelect(flight)} />
                        ))
                    ) : (
                        <p>No hay vuelos de vuelta disponibles para esta selección.</p>
                    )}
                </>
            )}

            {(selectedOutboundFlight && (tripType === 'one-way' || (tripType === 'round-trip' && selectedReturnFlight))) && (
                <button onClick={handleConfirmSelection}>Confirmar selección de vuelos</button>
            )}

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default SearchResults;
