import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleRegistro = async (e) => {
        e.preventDefault();

        // Validar campos
        if (!nombre.trim()) {
            setError('Por favor, ingresa tu nombre.');
            return;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError('Por favor, ingresa un email válido.');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Usuario registrado:', userCredential.user);
            setNombre('');
            setPassword('');
            setEmail('');
            navigate('/Home');
        } catch (err) {
            let errorMessage = 'Ocurrió un error al registrar el usuario. Por favor, intenta de nuevo.';
            if (err.message.includes('email-already-in-use')) {
                errorMessage = 'El email ya está registrado. Por favor, usa otra dirección de email.';
            } else if (err.message.includes('weak-password')) {
                errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
            }
            setError(errorMessage);
        }
    };

    const sectionRegistro = {
        backgroundPosition: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '80vh',
        width: '100%',
        backgroundColor: '#ffa800',
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '#4F4C4D',
        marginTop: 'auto'
    };

    const divFormulario = {
        width: '90%',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '15px',
        border: '1px solid black',
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '3%'
    };

    const formRegistro = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    };

    return (
        <section className="sectionRegistro" style={sectionRegistro}>
            <div className="divFormulario" style={divFormulario}>
                <form className="formRegistro" style={formRegistro} onSubmit={handleRegistro}>
                    <input
                        className="inputRegistro"
                        type="text"
                        name="nombre"
                        placeholder="Ingrese su nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <input
                        className="inputRegistro"
                        type="password"
                        name="password"
                        placeholder="Ingrese una contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="inputRegistro"
                        type="email"
                        name="email"
                        placeholder="Ingrese su email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input className="botonRegistrar" type="submit" value="Registrarse" />
                    {error && <p>{error}</p>}
                </form>
            </div>
        </section>
    );
};

export default Registro;
