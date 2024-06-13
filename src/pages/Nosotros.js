import React from "react";

const Nosotros = () => {
    return (
        <>
            <div style={{
                margin: '0 auto',
                display: 'block'
            }}>
                <img src="./img/avionVolando.jpg" alt="Avion Volando" style={{
                    maxWidth: '100%',
                    maxHeight: '100%'
                }} />
            </div>
            <h2 style={{
                paddingTop: '10px',
                textAlign: 'left',
                color: '#fdbe0f'
            }}>FlyChombi: Explora tu país con nosotros</h2>
            <br />
            <h2 style={{
                textAlign: 'center'
            }}>En FlyChombi, nos apasiona conectar a las personas con las maravillas de nuestro país. Somos una
                empresa dedicada a hacer que cada viaje sea una experiencia inolvidable. Con una amplia red de
                destinos nacionales, ofrecemos vuelos cómodos, seguros y accesibles para que puedas explorar cada
                rincón de Argentina con facilidad.
            </h2>
        </>
    );
}

export default Nosotros;
