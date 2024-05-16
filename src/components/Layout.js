import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css'; // Assuming you have some CSS for the layout

const Layout = ({ children }) => {
    return (
        <div>
            <header className="cabecera">
                <div className="logo">
                    <Link to="/">
                        <img src="/img/flychombi logo.png" alt="logoFly" ></img>
                    </Link>
                </div>
                <nav className="navegacion">
                    <Link to="/mireserva" className="link1">Mi Reserva</Link>
                    <Link to="/destinos" className="link2">Destinos</Link>
                    <Link to="/login" className="link3">Inicio Sesion</Link>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;