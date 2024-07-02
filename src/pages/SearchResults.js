import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dataset from '../dataset.json';
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
    const buttonRef = useRef(null);

    useEffect(() => {
        fetchFlightData();
    }, []);

    useEffect(() => {
        filterFlights();
    }, [departureMonthYear, arrivalMonthYear, flights, selectedOutboundFlight]);

    useEffect(() => {
        if (selectedReturnFlight && buttonRef.current) {
            buttonRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedReturnFlight]);

    const fetchFlightData = async () => {
        if (dataset && Array.isArray(dataset.flights)) {
            const flightData = dataset.flights;
            setFlights(flightData);
            console.log('Fetched flight data:', flightData);
        } else {
            console.error('Error: el dataset no contiene un array de vuelos válido.');
        }
    };

    const getCurrentDateTime = () => {
        return new Date().toISOString();
    };

    const filterFlights = () => {
        console.log('Filtering flights with:', { departureMonthYear, arrivalMonthYear });

        const currentDateTime = getCurrentDateTime();

        const filteredOutboundFlights = flights.filter(f =>
            f.flight_origin === selectedOrigin &&
            f.flight_destination === selectedDestination &&
            f.flight_availability >= passengerCount &&
            (!departureMonthYear || (f.flight_date && f.flight_date.startsWith(departureMonthYear))) &&
            new Date(f.flight_date) > new Date(currentDateTime)
        );

        setOutboundFlights(filteredOutboundFlights);
        console.log('Filtered outbound flights:', filteredOutboundFlights);

        if (selectedOutboundFlight && tripType === 'round-trip') {
            const filteredReturnFlights = flights.filter(f =>
                f.flight_origin === selectedDestination &&
                f.flight_destination === selectedOrigin &&
                f.flight_availability >= passengerCount &&
                (!arrivalMonthYear || (f.flight_date && f.flight_date.startsWith(arrivalMonthYear))) &&
                new Date(f.flight_date) > new Date(selectedOutboundFlight.flight_date) &&
                new Date(f.flight_date) > new Date(currentDateTime)
            ).sort((a, b) => new Date(a.flight_date) - new Date(b.flight_date));

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
                (!arrivalMonthYear || (f.flight_date && f.flight_date.startsWith(arrivalMonthYear))) &&
                new Date(f.flight_date) > new Date(flight.flight_date) &&
                new Date(f.flight_date) > new Date(getCurrentDateTime())
            ).sort((a, b) => new Date(a.flight_date) - new Date(b.flight_date));

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
        const confirmButton = document.getElementById('confirmButton');
        if (confirmButton) {
            confirmButton.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleConfirmSelection = () => {
        if (selectedOutboundFlight && (tripType === 'one-way' || (tripType === 'round-trip' && selectedReturnFlight))) {
            navigate('/informacion-pasajeros', {
                state: {
                    selectedOutboundFlight,
                    selectedReturnFlight,
                    selectedOrigin,
                    selectedDestination,
                    passengerCount
                }
            });
        } else {
            setErrorMessage('Por favor seleccione los vuelos de ida y vuelta.');
        }
    };

    useEffect(() => {
        if (selectedOutboundFlight && (tripType === 'one-way' || (tripType === 'round-trip' && selectedReturnFlight))) {
            navigate('/informacion-pasajeros', {
                state: {
                    selectedOutboundFlight,
                    selectedReturnFlight,
                    selectedOrigin,
                    selectedDestination,
                    passengerCount
                }
            });
        }
    }, [selectedOutboundFlight, selectedReturnFlight]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '180px', minHeight: '100vh' }}>
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

            <div style={{ gridColumn: '1 / -1', textAlign: 'center', }}>
                {(selectedOutboundFlight && (tripType === 'one-way' || (tripType === 'round-trip' && selectedReturnFlight))) && (
                    <button style={{ backgroundColor: '#ffa800', width: '60%', height: '40px', borderRadius: '50px', fontSize: 'medium', cursor: 'pointer' }} ref={buttonRef} onClick={handleConfirmSelection}>Confirmar selección de vuelos</button>
                )}
            </div>

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default SearchResults;