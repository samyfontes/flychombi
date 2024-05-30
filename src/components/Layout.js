import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css'; // Ensure this path is correct
import ModalUsuario from './ModalUsuario';

const Layout = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const cabecera = {
        // backgroundColor: 'rgb(255, 253, 253)',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '10px 20px',
    }

    const logo = {
        display: 'flex',
        alignItems: 'center',
    }

    const logoImg = {
        width: 'auto',
        maxHeight: '60px',
        borderRadius: '10px',
        marginRight: '10px',
    }

    const navegacion = {
        display: 'flex',
        alignItems: 'center',
    }

    const link = {
        display: 'inline - block',
        color: 'rgb(7, 7, 7)',
        backgroundColor: 'rgb(241, 174, 30)',
        borderRadius: '10px',
        textDecoration: 'none',
        fonSize: '16px',
        padding: '10px 20px',
        margin: '5px',
    }

const user = {
    name: 'usuario',
    email: 'falso123@gmail.com',
    phone: '+54123456789',
    dni: '12345678912',
    payment: 'Mastercad **12',
};

return (
    <div>
        <header style={cabecera}>
            <div style={logo}>
                <Link to="/">
                    <img style={logoImg} src="/img/flychombi logo.png" alt="logoFly" />
                </Link>
            </div>
            <nav style={navegacion}>
                <Link to="/mireserva" style={link}>Mi Reserva</Link>
                <Link to="/destinos" style={link}>Destinos</Link>
                <Link to="/extras" style={link}>Extras</Link>
                <Link to="/informacion-pasajeros" style={link}>Informacion Pasajeros</Link>
                <Link to="/login" style={link}>Inicio Sesion</Link>
                <Link to="/registro" style={link}>Registro</Link>
                <button style={link} onClick={() => setModalOpen(true)}>Usuario</button>
            </nav>
        </header>
        <main>
            {children}
        </main>
        <footer className="pie">
            <p>© 2021 FlyChombi</p>
            <Link to="/nosotros" >nosotros</Link>
        </footer>
        <ModalUsuario isOpen={isModalOpen} onClose={() => setModalOpen(false)} user={user} />
    </div>
);
};

export default Layout;
