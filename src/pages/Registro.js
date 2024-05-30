import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Registro = () => {

    const sectionRegistro ={
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
    }
    const divFormulario={

        width: '90%',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '15px',
        border: '1px solid black',
        backgroundColor: 'rgb(255, 255, 255)',
        padding: '3%',

    }
    const formRegistro={
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    }

    

    return (
        <section className="sectionRegistro" style={sectionRegistro}>
            <div className="divFormulario" style={divFormulario}>
                <form className="formRegistro" style={formRegistro} action="" method="post">
                    <input className="inputRegistro" type="text" name="Nombre" placeholder="Ingrese su nombre" />
                    <input className="inputRegistro" type="password" name="Apellido" placeholder="Ingrese una contraseña" />
                    <input className="inputRegistro" type="email" name="Correo" placeholder="Ingrese su email" />
                    <input className="botonRegistrar" type="reset" value="Registrarse" />
                </form>
            </div>
        </section>
    );
};

export default Registro;
