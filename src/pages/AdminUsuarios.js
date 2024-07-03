import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Modal } from "@mui/material";
import axios from 'axios';
import { collection, getDocs, query, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const AdminUsuarios = () => {

    const mainContainer ={
        minHeight: "90vh"
    };
    const containerStyle = {
        width: "100%",
        maxWidth: "1200px",
        
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#faebd7",
        borderRadius: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
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
    };

    const modalBoxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        padding: 4,
    };

    const [allUsers, setAllUsers] = useState([]);
    const [currentPageUsers, setCurrentPageUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const itemsPerPage = 10;

    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalAction, setModalAction] = useState("");

    useEffect(() => {
        fetchAllUsers();
    }, []);

    useEffect(() => {
        updateCurrentPageUsers();
    }, [allUsers, page]);

    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef);
            const querySnapshot = await getDocs(q);
            const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);
    };

    const updateCurrentPageUsers = () => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentPageUsers(allUsers.slice(startIndex, endIndex));
    };

    const handleNextPage = () => {
        if ((page + 1) * itemsPerPage < allUsers.length) {
            setPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(prev => prev - 1);
        }
    };

    const handleOpenModal = (user, action) => {
        setSelectedUser(user);
        setModalAction(action);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedUser(null);
        setModalAction("");
    };

    const handleDeleteUser = async (userId) => {
        try {
            // Replace with your API call to delete user
            const response = await axios.delete(`https://your-api-endpoint.com/deleteUser/${userId}`);
            console.log(response.data);
            fetchAllUsers();
            handleCloseModal();
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
    };

    const handleMakeAdmin = async (userId) => {
        try {
            // Check if user already has admin roles
            const user = allUsers.find(user => user.id === userId);
            const isAdmin = user.roles.includes("admin");

            if (isAdmin) {
                // Remove admin role
                const updatedRoles = user.roles.filter(role => role !== "admin");
                await updateDoc(doc(db, "users", userId), {
                    roles: updatedRoles
                });
                console.log('Admin role removed successfully.');
            } else {
                // Add admin role
                await updateDoc(doc(db, "users", userId), {
                    roles: [...user.roles, "admin"]
                });
                console.log('Admin role added successfully.');
            }

            fetchAllUsers();
            handleCloseModal();
        } catch (error) {
            console.error('Error updating user roles:', error);
        }
    };

    return (
        <div style={mainContainer}>
            <div style={containerStyle}>
                <h1 style={headerStyle}>Administrar Usuarios</h1>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Nombre</th>
                            <th style={thStyle}>Apellido</th>
                            <th style={thStyle}>Teléfono</th>
                            <th style={thStyle}>Email</th>
                            <th style={thStyle}>Roles</th>
                            <th style={thStyle}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageUsers.map(user => (
                            <tr key={user.id}>
                                <td style={tdStyle}>{user.name}</td>
                                <td style={tdStyle}>{user.lastname}</td>
                                <td style={tdStyle}>{user.phoneNumber}</td>
                                <td style={tdStyle}>{user.email}</td>
                                <td style={tdStyle}>{user.roles.join(", ")}</td>
                                <td style={tdStyle}>
                                    <button
                                        style={buttonStyle}
                                        onClick={() => handleOpenModal(user, "admin")}
                                    >
                                        {user.roles.includes("admin") ? "Quitar Admin" : "Hacer Admin"}
                                    </button>
                                    <button
                                        style={{ ...buttonStyle, ...buttonHoverStyle }}
                                        onClick={() => handleOpenModal(user, "eliminar")}
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
                    <button onClick={handleNextPage} style={buttonStyle} disabled={(page + 1) * itemsPerPage >= allUsers.length}>Siguiente</button>
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
                            {modalAction === "admin" ? (selectedUser?.roles.includes("admin") ? "Quitar Admin" : "Hacer Admin") : "Eliminar Usuario"}
                        </Typography>
                        {modalAction === "admin" ? (
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {selectedUser?.roles.includes("admin") ? "¿Está seguro que desea quitar los permisos de administrador a este usuario?" : "¿Está seguro que desea hacer administrador a este usuario?"}
                            </Typography>
                        ) : (
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                ¿Está seguro que desea eliminar este usuario?
                            </Typography>
                        )}
                        <Button onClick={modalAction === "admin" ? (() => handleMakeAdmin(selectedUser.id)) : (() => handleDeleteUser(selectedUser.id))}>Sí</Button>
                        <Button onClick={handleCloseModal}>No</Button>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default AdminUsuarios;
