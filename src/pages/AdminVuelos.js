import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Modal, TextField } from "@mui/material";
import dataset from '../dataset.json';

const AdminVuelos = () => {
    const mainContainer = {
        minHeight: "100vh"
    };
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
        marginTop: "20px",
        overflowX: "auto"
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
        width: "80%",
        maxWidth: 400,
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
    const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
    const [modalAction, setModalAction] = useState("");
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const [newFlight, setNewFlight] = useState({
        flight_origin: "",
        flight_destination: "",
        flight_date: "",
        flight_availability: 0,
        flight_seats: Array(189).fill(false),
        flight_price: 0
    });

    const [updatedFlight, setUpdatedFlight] = useState({
        flight_origin: "",
        flight_destination: "",
        flight_date: "",
        flight_availability: 0,
        flight_seats: Array(189).fill(false),
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
        setAllFlights(dataset.flights);
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

    const handleOpenModal = (flightIndex, action) => {
        setSelectedFlightIndex(flightIndex);
        if (action === "modificar") {
            setUpdatedFlight({ ...allFlights[flightIndex] });
        }
        setModalAction(action);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedFlightIndex(null);
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

    const handleCreateFlight = (flightData) => {
        setAllFlights([...allFlights, flightData]);
        handleCloseCreateModal();
    };

    const handleDeleteFlight = (flightIndex) => {
        setAllFlights(allFlights.filter((_, index) => index !== flightIndex));
        handleCloseModal();
    };

    const handleUpdateFlight = (flightIndex, flightData) => {
        setAllFlights(allFlights.map((flight, index) => 
            index === flightIndex ? flightData : flight
        ));
        handleCloseModal();
    };

    return (
        <div style={mainContainer}>
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
                        {currentPageFlights.map((flight, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{flight.flight_origin}</td>
                                <td style={tdStyle}>{flight.flight_destination}</td>
                                <td style={tdStyle}>{flight.flight_date}</td>
                                <td style={tdStyle}>{flight.flight_availability}</td>
                                <td style={tdStyle}>{flight.flight_seats ? flight.flight_seats.length : 0}</td>
                                <td style={tdStyle}>{flight.flight_price}</td>
                                <td style={tdStyle}>
                                    <button
                                        style={buttonStyle}
                                        onClick={() => handleOpenModal(index, "modificar")}
                                    >
                                        Modificar
                                    </button>
                                    <button
                                        style={{ ...buttonStyle, ...buttonHoverStyle }}
                                        onClick={() => handleOpenModal(index, "eliminar")}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button onClick={handlePrevPage} style={buttonStyle} disabled={page === 0}>
                        Anterior
                    </button>
                    <button
                        onClick={handleNextPage}
                        style={buttonStyle}
                        disabled={(page + 1) * itemsPerPage >= allFlights.length}
                    >
                        Siguiente
                    </button>
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
                                    name="flight_origin"
                                    value={updatedFlight.flight_origin}
                                    onChange={handleUpdateInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Destino"
                                    name="flight_destination"
                                    value={updatedFlight.flight_destination}
                                    onChange={handleUpdateInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Fecha"
                                    name="flight_date"
                                    type="date"
                                    value={updatedFlight.flight_date}
                                    onChange={handleUpdateInputChange}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="Disponibilidad"
                                    name="flight_availability"
                                    type="number"
                                    value={updatedFlight.flight_availability}
                                    onChange={handleUpdateInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Precio"
                                    name="flight_price"
                                    type="number"
                                    value={updatedFlight.flight_price}
                                    onChange={handleUpdateInputChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button onClick={() => handleUpdateFlight(selectedFlightIndex, updatedFlight)}>Modificar</Button>
                            </div>
                        ) : (
                            <div>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    ¿Está seguro que desea eliminar este vuelo?
                                </Typography>
                                <Button onClick={() => handleDeleteFlight(selectedFlightIndex)}>Eliminar</Button>
                            </div>
                        )}
                        <Button onClick={handleCloseModal}>Cerrar</Button>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default AdminVuelos;
