import React from 'react';
import './Layout.css'; // Ensure this CSS file is correctly imported

const ModalUsuario = ({ isOpen, onClose, user }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal" style={{backgroundColor:"#fdbe0f"}}>
                <header className="header">
                    <nav className="navbar">
                        <a href="#" onClick={onClose}>
                            <img src="/img/flecha.svg" alt="volver" />
                            Volver
                        </a>
                    </nav>
                </header>

                <div className="contenedor">
                    <div className="contenedor-arriba">Hola, {user.name}</div>
                    <div className="contenedor-medio">
                        <div className="contenedor-izquierda">
                            Información del usuario
                            <span className="negrita">E-mail</span>
                            <span>{user.email}</span>
                            <span className="negrita">Teléfono</span>
                            <span>{user.phone}</span>
                            <span className="negrita">DNI</span>
                            <span>{user.dni}</span>
                            <span className="negrita">Medio de pago</span>
                            <span>{user.payment}</span>
                        </div>
                        <div className="contenedor-derecha">
                            Próximos vuelos
                            <span>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero quasi officiis ex laborum beatae doloremque tempora aspernatur, magnam, minima, repellendus deleniti enim. Aliquam natus id ut voluptas odio illo ipsum?
                            </span>
                        </div>
                    </div>
                    <div className="contenedor-abajo">
                        <a className="nuevovuelo" href="#">Nuevo vuelo</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalUsuario;
