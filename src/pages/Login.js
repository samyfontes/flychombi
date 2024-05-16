import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // handle login logic here
    };

    return (
        <div className="login">
            <section className="sectionRegistro">
                <div className="divFormulario">
                    <form className="formRegistro" action="" method="post">
                        <input className="inputRegistro" type="text" name="Nombre" placeholder="Ingrese su nombre" />
                        <input className="inputRegistro" type="password" name="Apellido" placeholder="Ingrese una contraseña" />
                        <input className="inputRegistro" type="email" name="Correo" placeholder="Ingrese su email" />
                        <input className="botonRegistrar" type="reset" value="Registrarse" />
                    </form>
                </div>
            </section>
            <h1>Iniciar Sesion</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo Electronico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar Sesion</button>
            </form>
            <Link to="/registro">Crear Cuenta</Link>
        </div>
    );
};

export default Login;
