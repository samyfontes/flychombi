import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, admin, db } from '../firebase'; // Ensure this path is correct
import './Layout.css'; // Ensure this path is correct
import ModalUsuario from './ModalUsuario';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Menu, MenuItem } from '@mui/material';

const Layout = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                fetchUserData(user);
                console.log("User:", user.email);
                try {
                    // Call your Firebase Function to check if user is admin
                    const response = await fetch('https://us-central1-flychombi.cloudfunctions.net/checkAdmin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: user.email }), // Send user's UID in the request body
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to check admin status');
                    }

                    const data = await response.json();
                    console.log("Admin status:", response);
                    setIsAdmin(data.isAdmin);
                } catch (error) {
                    console.error("Error checking admin status:", error);
                    setError(error.message);
                }
            } else {
                setUser(null);
                setIsAdmin(false);
                setError(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const cabecera = {
        backgroundColor: 'rgb(255, 253, 253)',
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '10px 20px',
        position: 'sticky',
    };

    const logo = {
        display: 'flex',
        alignItems: 'center',
    };

    const fetchUserData = async (user) => {
        //we search for the user in the firestore database with the email
        const querySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", user.email)));
        const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserData(userData[0]);
    }

    const logoImg = {
        width: 'auto',
        maxHeight: '60px',
        borderRadius: '10px',
        marginRight: '10px',
    };

    const navegacion = {
        display: 'flex',
        alignItems: 'center',
    };

    const link = {
        display: 'inline-block',
        color: 'rgb(7, 7, 7)',
        backgroundColor: 'rgb(241, 174, 30)',
        borderRadius: '10px',
        textDecoration: 'none',
        fontSize: '16px',
        padding: '10px 20px',
        margin: '5px',
    };

    return (
        <div>
            <header style={cabecera} className="container mt-4">
                <div style={logo}>
                    <Link to="/">
                        <img style={logoImg} src="/img/flychombi logo.png" alt="logoFly" />
                    </Link>
                </div>
                <nav style={navegacion}>
                    {!user ? (
                        <>
                            <Link to="/login" style={link}>Iniciar Sesión</Link>
                        </>
                    ) : (
                        <>
                            <button style={link} onClick={() => {
                                setModalOpen(true)
                            }}>Usuario</button>
                            {isAdmin && (
                                <>
                                <button id="basic-button" aria-controls="basic-menu" aria-haspopup="true" onClick={handleClick} style={link}>Admin</button>
                                <Menu id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}>
                                    <MenuItem><Link to='/admin/vuelos'>Admin vuelos</Link></MenuItem>
                                    <MenuItem><Link to='/admin/usuarios'>Admin usuarios</Link></MenuItem>
                                </Menu>
                                </>
                                // <Link to="/admin/vuelos" style={link}>Admin</Link>
                            )}
                        </>
                    )}
                </nav>
            </header>
            <main>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {children}
            </main>
            <footer className="pie">
                <p>© 2021 FlyChombi</p>
                <Link to="/nosotros">nosotros</Link>
            </footer>
            <ModalUsuario isOpen={isModalOpen} onClose={() => setModalOpen(false)} user={userData} />
        </div>
    );
};

export default Layout;
