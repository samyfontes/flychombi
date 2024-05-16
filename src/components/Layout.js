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
                    <Link to="/extras" className="link2">Extras</Link>
                    <Link to="/informacion-pasajeros" className="link2">Informacion Pasajeros</Link>
                    <Link to="/login" className="link1">Inicio Sesion</Link>
                    <Link to="/registro" className="link2">Registro</Link>
                    <button className="link3" onClick={() => setModalOpen(true)}>Usuario</button>
                </nav>
            </header>
            <main>
                {children}
            </main>
            <footer className="pie">
                <p>© 2021 FlyChombi</p>
                <Link to="/nosotros" className="link4">nosotros</Link>
            </footer>
            <ModalUsuario isOpen={isModalOpen} onClose={() => setModalOpen(false)} user={user} />
        </div>
    );
};

export default Layout;
