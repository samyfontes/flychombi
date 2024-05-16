import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css'; // Ensure this path is correct
import ModalUsuario from './ModalUsuario';

const Layout = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const user = {
        name: 'usuario',
        email: 'falso123@gmail.com',
        phone: '+54123456789',
        dni: '12345678912',
        payment: 'Mastercad **12',
    };

    return (
        <div>
            <header className="cabecera">
                <div className="logo">
                    <Link to="/">
                        <img src="/img/flychombi logo.png" alt="logoFly" />
                    </Link>
                </div>
                <nav className="navegacion">
                    <Link to="/mireserva" className="link1">Mi Reserva</Link>
                    <Link to="/destinos" className="link2">Destinos</Link>
                    <Link to="/login" className="link1">Inicio Sesion</Link>
                    <button className="link3" onClick={() => setModalOpen(true)}>Usuario</button>
                    <ModalUsuario isOpen={isModalOpen} onClose={() => setModalOpen(false)} user={user} />
                </nav>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
