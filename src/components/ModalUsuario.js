import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ModalUsuario = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>
                <Typography variant="h6">Hola, {user.name}</Typography>
            </DialogTitle>
            <DialogContent>
                <div className="contenedor-medio">
                    <div className="contenedor-izquierda">
                        <Typography variant="body1">Información del usuario</Typography>
                        <Typography variant="body2" className="negrita">E-mail</Typography>
                        <Typography variant="body2">{user.email}</Typography>
                        <Typography variant="body2" className="negrita">Teléfono</Typography>
                        <Typography variant="body2">{user.phone}</Typography>
                        <Typography variant="body2" className="negrita">DNI</Typography>
                        <Typography variant="body2">{user.dni}</Typography>
                        <Typography variant="body2">{user.payment}</Typography>
                    </div>
                    <div className="contenedor-derecha">
                        <Typography variant="body1">Próximos vuelos</Typography>
                        <Typography variant="body2">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero quasi officiis ex laborum beatae doloremque tempora aspernatur, magnam, minima, repellendus deleniti enim. Aliquam natus id ut voluptas odio illo ipsum?
                        </Typography>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Volver
                </Button>
                <Button href="/" color="primary">
                    Nuevo vuelo
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalUsuario;
