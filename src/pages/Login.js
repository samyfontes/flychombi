import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Asegúrate de ajustar la ruta según sea necesario
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home'); // Redirige a la página principal o la que prefieras
        } catch (error) {
            setError(error.message);
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
                <h1 className="loginTitle">Iniciar Sesión</h1>
                <form className="formRegistro" style={formRegistro} onSubmit={handleSubmit}>
                    <input
                        className="inputRegistro"
                        type="email"
                        placeholder="Correo Electrónico"
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
                    <button className="botonRegistrar" type="submit">Iniciar Sesión</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Link className="linkRegistro" to="/registro">Crear Cuenta</Link>
            </div>
        </section>
    );
};

export default Login;
