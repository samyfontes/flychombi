import React, { useEffect, useState } from "react";
import { db } from '../firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { Button, Box, Typography, Modal, TextField } from "@mui/material";
import axios from 'axios';
import dataset from '../dataset.json';

const AdminVuelos = () => {
    const containerStyle = {
        width: "100%",  // Full width
        maxWidth: "1200px",  // Maximum width for larger screens
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#faebd7",
        borderRadius: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
    };

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        overflowX: "auto",  // Allow horizontal scrolling on smaller screens
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
        padding: "7px 12px",
        margin: "8px",
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

    const modalBoxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",  // Adjust width for smaller screens
        maxWidth: 400,  // Maximum width
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: "24px",
        padding: 4,
    };
    

    const [allFlights, setAllFlights] = useState([]);
    const [currentPageFlights, setCurrentPageFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const itemsPerPage = 10;

    const [open, setOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [modalAction, setModalAction] = useState("");
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const [newFlight, setNewFlight] = useState({
        flight_origin: "",
        flight_destination: "",
        flight_date: "",
        flight_availability: 0,
        flight_totalSeats: 189,
        flight_price: 0
    });

    const [updatedFlight, setUpdatedFlight] = useState({
        flight_origin: "",
        flight_destination: "",
        flight_date: "",
        flight_availability: 0,
        flight_totalSeats: 189,
        flight_price: 0
    });

    useEffect(() => {
        fetchAllFlights();
    }, []);

    useEffect(() => {
        updateCurrentPageFlights();
    }, [allFlights, page]);

    const fetchAllFlights = async () => {
        setLoading(true);

        setAllFlights(dataset);



        // try {
        //     const flightsRef = collection(db, "flights");
        //     const q = query(flightsRef, orderBy("flight_date"));
        //     const querySnapshot = await getDocs(q);
        //     const flightData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        //     console.log(flightData);
        //     setAllFlights(flightData);
        // } catch (error) {
        //     console.error('Error fetching flights:', error);
        // }
        setLoading(false);
    };

    const updateCurrentPageFlights = () => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentPageFlights(allFlights.slice(startIndex, endIndex));
    };

    const handleNextPage = () => {
        if ((page + 1) * itemsPerPage < allFlights.length) {
            setPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(prev => prev - 1);
        }
    };

    const handleOpenModal = (flight, action) => {
        setSelectedFlight(flight);
        if (action === "modificar") {
            setUpdatedFlight({
                flight_origin: flight.flight_origin,
                flight_destination: flight.flight_destination,
                flight_date: flight.flight_date,
                flight_availability: flight.flight_availability,
                flight_totalSeats: flight.flight_seats.length,
                flight_price: flight.flight_price
            });
        }
        setModalAction(action);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedFlight(null);
        setModalAction("");
    };

    const handleOpenCreateModal = () => {
        setCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFlight(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFlight(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateFlight = async (flightData) => {
        try {
            console.log(flightData);
            const response = await axios.post('https://us-central1-flychombi.cloudfunctions.net/createFlight', flightData);
            console.log(response.data);
            fetchAllFlights();
            handleCloseCreateModal();
        } catch (error) {
            console.error('Error adding flight: ', error);
        }
    };

    const handleDeleteFlight = async (flightId) => {
        try {
            const response = await axios.post('https://us-central1-flychombi.cloudfunctions.net/deleteFlight', { id: flightId });
            console.log(response.data);
            fetchAllFlights();
            handleCloseModal();
        } catch (error) {
            console.error('Error deleting flight: ', error);
        }
    };

    const handleUpdateFlight = async (flightId, flightData) => {
        try {
            // Retrieve the current flight from allFlights state
            const currentFlight = allFlights.find(flight => flight.id === flightId);
            console.log(currentFlight);
            console.log(flightData);
            
            // Merge updated fields with current flight data
            const updatedFields = {
                flight_origin: flightData.origin || currentFlight.flight_origin,
                flight_destination: flightData.destination || currentFlight.flight_destination,
                flight_date: flightData.date || currentFlight.flight_date,
                flight_availability: flightData.availability || currentFlight.flight_availability,
                flight_price: flightData.price || currentFlight.flight_price
            };

            console.log(updatedFields);
    
            const response = await axios.post('https://us-central1-flychombi.cloudfunctions.net/updateFlight', {
                id: flightId,
                ...updatedFields
            });
            console.log(response.data);
            fetchAllFlights();
            handleCloseModal();
        } catch (error) {
            console.error('Error updating flight: ', error);
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Administrar Vuelos</h1>
            <button
                style={{ ...buttonStyle, marginTop: "20px" }}
                onClick={handleOpenCreateModal}
            >
                Agregar Vuelo
            </button>
            <Modal
                open={createModalOpen}
                onClose={handleCloseCreateModal}
                aria-labelledby="create-flight-modal-title"
                aria-describedby="create-flight-modal-description"
            >
                <Box sx={modalBoxStyle}>
                    <Typography id="create-flight-modal-title" variant="h6" component="h2">
                        Agregar Vuelo
                    </Typography>
                    <TextField
                        label="Origen"
                        name="flight_origin"
                        value={newFlight.flight_origin}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Destino"
                        name="flight_destination"
                        value={newFlight.flight_destination}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Fecha"
                        name="flight_date"
                        type="date"
                        value={newFlight.flight_date}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Precio"
                        name="flight_price"
                        type="number"
                        value={newFlight.flight_price}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button onClick={() => handleCreateFlight(newFlight)}>Agregar</Button>
                </Box>
            </Modal>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Origen</th>
                        <th style={thStyle}>Destino</th>
                        <th style={thStyle}>Fecha</th>
                        <th style={thStyle}>Disponibilidad</th>
                        <th style={thStyle}>Capacidad Total</th>
                        <th style={thStyle}>Precio</th>
                        <th style={thStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageFlights.map(flight => (
                        <tr key={flight.id}>
                            <td style={tdStyle}>{flight.flight_origin}</td>
                            <td style={tdStyle}>{flight.flight_destination}</td>
                            <td style={tdStyle}>{flight.flight_date}</td>
                            <td style={tdStyle}>{flight.flight_availability}</td>
                            <td style={tdStyle}>{flight.flight_seats?.length || 0}</td>
                            <td style={tdStyle}>{flight.flight_price}</td>
                            <td style={tdStyle}>
                                <button
                                    style={buttonStyle}
                                    onClick={() => handleOpenModal(flight, "modificar")}
                                >
                                    Modificar
                                </button>
                                <button
                                    style={{ ...buttonStyle, ...buttonHoverStyle }}
                                    onClick={() => handleOpenModal(flight, "eliminar")}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                <button onClick={handlePrevPage} style={buttonStyle} disabled={page === 0}>Anterior</button>
                <button onClick={handleNextPage} style={buttonStyle} disabled={(page + 1) * itemsPerPage >= allFlights.length}>Siguiente</button>
            </div>
            {loading && <p>Cargando...</p>}
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalBoxStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalAction === "modificar" ? "Modificar Vuelo" : "Eliminar Vuelo"}
                    </Typography>
                    {modalAction === "modificar" ? (
                        <div>
                            <TextField
                                label="Origen"
                                name="origin"
                                value={updatedFlight.origin}
                                onChange={handleUpdateInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Destino"
                                name="destination"
                                value={updatedFlight.destination}
                                onChange={handleUpdateInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Fecha"
                                name="date"
                                type="date"
                                value={updatedFlight.date}
                                onChange={handleUpdateInputChange}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Disponibilidad"
                                name="availability"
                                type="number"
                                value={updatedFlight.availability}
                                onChange={handleUpdateInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Precio"
                                name="price"
                                type="number"
                                value={updatedFlight.price}
                                onChange={handleUpdateInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <Button onClick={() => handleUpdateFlight(selectedFlight.id, updatedFlight)}>Modificar</Button>
                        </div>
                    ) : (
                        <div>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                ¿Está seguro que desea eliminar este vuelo?
                            </Typography>
                            <Button onClick={() => handleDeleteFlight(selectedFlight.id)}>Eliminar</Button>
                        </div>
                    )}
                    <Button onClick={handleCloseModal}>Cerrar</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default AdminVuelos;
