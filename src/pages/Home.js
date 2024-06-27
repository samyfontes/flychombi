import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { set } from 'firebase/database';
import dataset from '../dataset.json';

const Home = () => {
    const [origins, setOrigins] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [passengerCount, setPassengerCount] = useState(1);
    const [tripType, setTripType] = useState('one-way');
    const [errorMessage, setErrorMessage] = useState('');
    const [flightData, setFlightData] = useState([]);
    const navigate = useNavigate();
    const carouselRef = useRef(null);


    useEffect(() => {
        fetchFlightData();
        startCarousel();
        // Add event listeners to disable scrolling during carousel animation
        window.addEventListener('wheel', disableScroll);
        window.addEventListener('touchmove', disableScroll);
        return () => {
            stopCarousel();
            // Remove event listeners on component unmount
            window.removeEventListener('wheel', disableScroll);
            window.removeEventListener('touchmove', disableScroll);
        };
    }, []);

    const fetchFlightData = async () => {
        //here we read the file dataset.json and we get the data from the array flights
        setFlightData(dataset);

        console.log('flights:', flightData);

        const originSet = new Set();
        const destinationSet = new Set();
        flightData.forEach(flight => {
            originSet.add(flight.flight_origin);
            destinationSet.add(flight.flight_destination);
        });
        setOrigins([...originSet]);
        setDestinations([...destinationSet]);

        console.log('flights:', flightData);
        console.log('origins:', origins);
        console.log('destinations:', destinations);

        // console.log('flightData:', flightData);
        // console.log('origins:', origins);
        // console.log('destinations:', destinations);

        // try {
        //     const q = query(collection(db, "flights"));
        //     const querySnapshot = await getDocs(q);
        //     const flightData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        //     const originSet = new Set();
        //     const destinationSet = new Set();

        //     flightData.forEach(flight => {
        //         originSet.add(flight.flight_origin);
        //         destinationSet.add(flight.flight_destination);
        //     });

        //     setOrigins([...originSet]);
        //     setDestinations([...destinationSet]);
        // } catch (error) {
        //     console.error('Error fetching flights:', error);
        // }
    }

    const disableScroll = (event) => {
        event.preventDefault();
    }

    const handleSearch = async () => {
        if (!selectedOrigin || !selectedDestination) {
            setErrorMessage('Por favor, selecciona un origen y un destino.');
            return;
        }

        try {
            // const q = query(collection(db, "flights"));
            // const querySnapshot = await getDocs(q);
            // const flightData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            const filteredFlights = flightData.filter(flight =>
                flight.flight_origin === selectedOrigin &&
                flight.flight_destination === selectedDestination &&
                flight.flight_availability >= passengerCount
            );

            if (filteredFlights.length === 0) {
                setErrorMessage('No hay vuelos disponibles para esta selección.');
                return;
            }

            setErrorMessage('');
            navigate('/results', {
                state: {
                    selectedOrigin,
                    selectedDestination,
                    passengerCount,
                    tripType,
                    filteredFlights
                }
            });
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }

    const startCarousel = () => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const carousel = carouselRef.current;
                carousel.style.transition = "transform 0.4s ease-in-out";
                carousel.style.transform = `translateX(-${carousel.clientWidth}px)`;

                setTimeout(() => {
                    carousel.style.transition = "none";
                    carousel.style.transform = "translateX(0)";
                }, 4000); // Adjust the interval duration (4000 milliseconds = 4 seconds)
            }
        }, 5000); // Adjust the interval duration (5000 milliseconds = 5 seconds)

        return () => clearInterval(interval);
    }

    const stopCarousel = () => {
        clearInterval(startCarousel);
    }

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <div className="slider-box" style={{ overflow: 'hidden', position: 'relative' }}>
                <ul ref={carouselRef} className="carousel" style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ minWidth: '100%', flex: '0 0 auto' }}><img src="img/s1.jpg" alt="" style={{ width: '100%' }} /></li>
                    <li style={{ minWidth: '100%', flex: '0 0 auto' }}><img src="img/s2.jpg" alt="" style={{ width: '100%' }} /></li>
                    <li style={{ minWidth: '100%', flex: '0 0 auto' }}><img src="img/s3.jpg" alt="" style={{ width: '100%' }} /></li>
                    <li style={{ minWidth: '100%', flex: '0 0 auto' }}><img src="img/s4.jpg" alt="" style={{ width: '100%' }} /></li>
                </ul>
            </div>
            <div className="button-container" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
                <div className="btn-group" role="group" aria-label="Trip type">
                    <button type="button" className="botonRegistrar" style={{ fontSize: '14px', padding: '10px 20px' }} onClick={() => setTripType('one-way')}>Solo ida</button>
                    <button type="button" className="botonRegistrar" style={{ fontSize: '14px', padding: '10px 20px' }} onClick={() => setTripType('round-trip')}>Ida y vuelta</button>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <select className="form-select" id="select-origin" aria-label="Select origin"
                        value={selectedOrigin} onChange={(e) => setSelectedOrigin(e.target.value)}>
                        <option value="" disabled>Select origin</option>
                        {origins.map((origin, index) => (
                            <option key={index} value={origin}>{origin}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <select className="form-select" id="select-destination" aria-label="Select destination"
                        value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)}>
                        <option value="" disabled>Select destination</option>
                        {destinations.map((destination, index) => (
                            <option key={index} value={destination}>{destination}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="number"
                        className="form-control"
                        id="select-passenger-count"
                        aria-label="Select passenger count"
                        value={passengerCount}
                        min="1"
                        onChange={(e) => setPassengerCount(Number(e.target.value))}
                        style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <button className="botonRegistrar" onClick={handleSearch} style={{ fontSize: '16px', padding: '12px 24px' }}>Buscar vuelos</button>
                {errorMessage && <div className="alert alert-danger mt-3" style={{ fontSize: '14px', padding: '10px', borderRadius: '5px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }}>{errorMessage}</div>}
            </div>
        </div>
    )
}

export default Home;
