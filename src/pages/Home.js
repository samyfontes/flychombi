import react, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import FlightCard from '../components/FlightCard';


const Home = () => {
    const [origins, setOrigins] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);

    useEffect(() => {
        fetchFlightData();
    }, []);

    useEffect(() => {
        filterFlights();
    }, [selectedOrigin, selectedDestination, flights]);

    const fetchFlightData = async () => {
        try {
            console.log("fetching flight data");
            const q = query(collection(db, "flights"));
            const querySnapshot = await getDocs(q);
            const flightData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            const originSet = new Set();
            const destinationSet = new Set();

            flightData.forEach(flight => {
                originSet.add(flight.flight_origin);
                destinationSet.add(flight.flight_destination);
            });

            console.log('origins:', originSet);
            console.log('destinations:', destinationSet);

            setOrigins([...originSet]);
            setDestinations([...destinationSet]);
            setFlights(flightData);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }

    const filterFlights = () => {
        if (selectedOrigin && selectedDestination) {
            const filtered = flights.filter(flight => 
                flight.flight_origin === selectedOrigin && 
                flight.flight_destination === selectedDestination
            );
            setFilteredFlights(filtered);
        } else {
            setFilteredFlights([]);
        }
    }

    return (
        <div>
            <div className="button-container">
                <div>
                    <select className="form-select" id="select-origin" aria-label="Select origin"
                        value={selectedOrigin} onChange={(e) => setSelectedOrigin(e.target.value)}>
                        <option value="" disabled>Select origin</option>
                        {origins.map((origin, index) => (
                            <option key={index} value={origin}>{origin}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select className="form-select" id="select-destination" aria-label="Select destination"
                        value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)}>
                        <option value="" disabled>Select destination</option>
                        {destinations.map((destination, index) => (
                            <option key={index} value={destination}>{destination}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flight-cards-container">
                {filteredFlights.map(flight => (
                    <div className="col-md-4" key={flight.id}>
                        <FlightCard flight={flight} />
                    </div>
                ))}
            </div>
            <div className="slider-box">
                <ul>
                    <li><img src="img/s1.jpg" alt="" /></li>
                    <li><img src="img/s2.jpg" alt="" /></li>
                    <li><img src="img/s3.jpg" alt="" /></li>
                    <li><img src="img/s4.jpg" alt="" /></li>
                </ul>
            </div>
        </div>
    )
}

export default Home;