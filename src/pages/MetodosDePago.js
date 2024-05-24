import React from "react";

const MetodosDePago = () =>{

    return(
        <div>
            <section class= " columnas ">
                <div class="TextoIzquierdo">
                    <p class="Subtitulo" >
                        <b>
                            Tarjeta de Crédito/Debito
                        </b>
                    </p>
                    <form class="DatosDelUsuario" action="" method="post">
                        <div class="datos1">
                            <label for=" NumeroDeTarjeta "></label>
                            <input type="number" class="input-formas-de-pago" id="Tarjeta" name="NumeroDeTarjeta" placeholder=" Numero de tarjeta " maxlength="16" required>
                            <label for="nombre"></label>
                            <input type=" text " class="input-formas-de-pago" id=" nombre " name=" nombre " placeholder=" Nombre del titular "  required> 
                        </div>
                        <div class="datos1">
                            <label for="documento" class="label-formas-de-pago"></label>
                            <input type="number" class="input-formas-de-pago" id="documento" name="documento" placeholder="Ingresa el documento " required>
                            <label for=" FechaDeCaducidad "> </label>
                            <input type="date" class="input-formas-de-pago" id="FechaDeCaducidad" name="FechaDeCaducidad" placeholder="Fecha de caducidad"  required>
                        </div>
                        <div class="datos1">
                            <label for="Codigo"></label>
                            <input type="number" class="input-formas-de-pago" id="codigo" name="codigo" placeholder="Ingresa el codigo" maxlength="3" required>
                        </div>
                    </form>
                    <div class="MP">
                        <p class="TextoMP">
                            <b>
                                Para pagar con mercado pago:
                            </b>
                        </p>
                        <button class="BotonMP">
                            Continuar hacia MP
                        </button>
                    </div>
                    <div class="DatosDelUsuario">
                        <button class="BotonContinuar">
                            <b>
                                Continuar
                            </b>
                        </button>
                    </div>
                </div>
                <div class=" TextoDerecha ">
                    <ul class="contenido"> 
                        <li > Fecha: </li>
                        <li > Lugar de ida: </li>
                        <li > Lugar de vuelta: </li>
                        <li > Horarios: </li>
                        <li >Informacion del usuario: </li>
                    </ul>
                </div>
            </section>
        </div>
    );

}

export default MetodosDePago;