import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Ensure this path is correct
import '../App.css';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Redirect or handle success as needed
            console.log("User logged in:", user.uid);
            navigate('/'); // Example: Redirect to home page after successful login
        } catch (error) {
            console.error("Error signing in:", error.message);
            // Handle error (show message, etc.)
        }
    };

    const divFormulario = {
        width: '90%',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '15px',
        border: '1px solid black',
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '3%',
    };

    const formRegistro = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    };

    return (
        <section className="sectionLogin">
            <div className="divFormulario" style={divFormulario}>
                <h1 className="loginTitle">Iniciar Sesion</h1>
                <form className="formRegistro" style={formRegistro} onSubmit={handleSubmit}>
                    <input
                        className="inputRegistro"
                        type="email"
                        placeholder="Correo Electronico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="inputRegistro"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="botonRegistrar" type="submit">Iniciar Sesion</button>
                </form>
                <Link className="linkRegistro" to="/registro">Crear Cuenta</Link>
            </div>
        </section>
    );
};

export default Login;
