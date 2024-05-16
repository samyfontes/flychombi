import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Registro = () => {
    return (
        <section className="sectionRegistro" >
            <div className="divFormulario" >
                <form className="formRegistro" action="" method="post">
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
