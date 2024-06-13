import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import axios from 'axios';
import '../App.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Registro = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("las contraseñas no son iguales, por favor vuelva a intentar");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth ,email, password);
            const user = userCredential.user;

            const response = await axios.post('https://us-central1-flychombi.cloudfunctions.net/createUser', {
                name,
                lastname,
                email,
                phoneNumber: phone,
                password,
                uid: user.uid
            });

            console.log('User created:', response.data);

            navigate('/'); 
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Error creating user');
        }
    };

    return (
        <section className="sectionRegistro" style={sectionRegistro}>
            <div className="divFormulario" style={divFormulario}>
                <form className="formRegistro" style={formRegistro} onSubmit={handleSubmit}>
                    <input className="inputRegistro" type="text" name="Nombre" placeholder="Ingrese su nombre" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input className="inputRegistro" type="text" name="Apellido" placeholder="Ingrese su apellido" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                    <input className="inputRegistro" type="email" name="Correo" placeholder="Ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className="inputRegistro" type="password" name="Contraseña" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input className="inputRegistro" type="password" name="ConfirmarContraseña" placeholder="Confirme su contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <input className="inputRegistro" type="text" name="Telefono" placeholder="Ingrese su telefono" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <button className="botonRegistrar" type="submit">Registrarse</button>
                </form>
            </div>
        </section>
    );
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

export default Registro;
