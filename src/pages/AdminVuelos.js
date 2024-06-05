import React, { useEffect, useState } from "react";
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';

// El componente AdminVuelos se encarga de renderizar la vista del admin para la administración de vuelos.
// Esta vista consta de una tabla que muestra los vuelos existentes en la base de datos y permite al admin
// modificar y eliminar vuelos con una columna de botones para cada uno de estos casos y un botón para agregar
// un nuevo vuelo.

const AdminVuelos = () => {
    const containerStyle = {
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#faebd7",
        borderRadius: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
    };

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px"
    };

    const thStyle = {
        backgroundColor: "#ffa800",
        color: "black",
        padding: "10px",
        border: "1px solid #ddd",
        fontSize: "18px"
    };

    const tdStyle = {
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "center"
    };

    const buttonStyle = {
        backgroundColor: "#ffa800",
        border: "none",
        borderRadius: "5px",
        color: "black",
        padding: "10px 20px",
        cursor: "pointer",
        transition: "transform 0.2s"
    };

    const buttonHoverStyle = {
        backgroundColor: "#d78f00",
        transform: "scale(1.1)"
    };

    const headerStyle = {
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#FDBE0F",
        fontSize: "24px",
        borderRadius: "16px",
        fontStyle: "italic",
        fontWeight: "bold"
    };

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        fetchFlightData();
    }, []);


    const fetchFlightData = async () => {
        try {
            console.log("fetching flight data");
            const q = query(collection(db, "flights"));
            const querySnapshot = await getDocs(q);
            const flightData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFlights(flightData);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Administrar Vuelos</h1>
            <button style={{ ...buttonStyle, marginTop: "20px" }}>Agregar Vuelo</button>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Origen</th>
                        <th style={thStyle}>Destino</th>
                        <th style={thStyle}>Fecha</th>
                        <th style={thStyle}>Hora</th>
                        <th style={thStyle}>Disponibilidad</th>
                        <th style={thStyle}>Capacidad Total</th>
                        <th style={thStyle}>Precio</th>
                        <th style={thStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {flights.map(flight => (
                        <tr key={flight.id}>
                            <td style={tdStyle}>{flight.flight_origin}</td>
                            <td style={tdStyle}>{flight.flight_destination}</td>
                            <td style={tdStyle}>{flight.flight_date}</td>
                            <td style={tdStyle}>{"10:00"}</td>
                            <td style={tdStyle}>{flight.flight_availability}</td>
                            <td style={tdStyle}>{flight.flight_seats.length}</td>
                            <td style={tdStyle}>{flight.flight_price}</td>
                            <td style={tdStyle}>
                                <button style={buttonStyle}>Modificar</button>
                                <button style={{ ...buttonStyle, ...buttonHoverStyle }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminVuelos;
