import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { auth } from '../firebase'; // Ensure this path is correct

const ModalUsuario = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    const handleLogout = async () => {
        try {
            await auth.signOut(); // Firebase sign out method
            onClose(); // Close the modal after logout
        } catch (error) {
            console.error('Error signing out:', error);
            // Handle error (optional)
        }
    };

    console.log('User:', user);

    return (
        <Dialog 
            open={isOpen} 
            onClose={onClose}
            PaperProps={{
                style: {
                    backgroundColor: '#fdbe0f',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
                    borderRadius: '10px',
                    padding: '20px'
                }
            }}
        >
            <DialogTitle>
                <Typography variant="h6" style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#333' }}>
                    Hola, {user.name}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <div className="contenedor-medio" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="contenedor-izquierda" style={{ flex: 1, marginRight: '10px' }}>
                        <Typography variant="body1" style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#333' }}>
                            Información del usuario
                        </Typography>
                        <Typography variant="body2" className="negrita" style={{ fontWeight: 'bold' }}>
                            Nombre
                        </Typography>
                        <Typography variant="body2" style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#333' }}>
                            {user.name}
                        </Typography>
                        <Typography variant="body2" className="negrita" style={{ fontWeight: 'bold' }}>
                            E-mail
                        </Typography>
                        <Typography variant="body2" style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#333' }}>
                            {user.email}
                        </Typography>
                        <Typography variant="body2" className="negrita" style={{ fontWeight: 'bold' }}>
                            Teléfono
                        </Typography>
                        <Typography variant="body2" style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#333' }}>
                            {user.phoneNumber}
                        </Typography>
                    </div>
                    <div className="contenedor-derecha" style={{ flex: 1, marginLeft: '10px' }}>
                        <Typography variant="body1" style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#333' }}>
                            Próximos vuelos
                        </Typography>
                        <Typography variant="body2" style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#333' }}>

                        </Typography>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={onClose} 
                    style={{
                        backgroundColor: '#ffa800',
                        color: 'black',
                        borderRadius: '20px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        margin: '5px',
                        transition: 'transform 0.2s',
                        boxShadow: '5px 5px 10px rgb(49, 49, 49)'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#d78f00';
                        e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#ffa800';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    Volver
                </Button>
                <Button 
                    href="/" 
                    style={{
                        backgroundColor: '#ffa800',
                        color: 'black',
                        borderRadius: '20px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        margin: '5px',
                        transition: 'transform 0.2s',
                        boxShadow: '5px 5px 10px rgb(49, 49, 49)'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#d78f00';
                        e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#ffa800';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    Nuevo vuelo
                </Button>
                <Button 
                    onClick={handleLogout} // Logout handler
                    style={{
                        backgroundColor: '#ffa800',
                        color: 'black',
                        borderRadius: '20px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        margin: '5px',
                        transition: 'transform 0.2s',
                        boxShadow: '5px 5px 10px rgb(49, 49, 49)'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#d78f00';
                        e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#ffa800';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    Cerrar Sesión
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalUsuario;
