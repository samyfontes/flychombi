import React from 'react';
import '../App.css';

const Extras = () => {


    const extrasContainer = {
        widht: '100vw',
        height: '100vh',
        display: 'flex',
        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#faebd7'
    }

    const divBody = {
        width: '100%',
        maxWidth: '1200px',
    }

    const divEquipajes = {
        flexDirection: 'column',
        width: '60%',
        margin: '0 auto',
    }

    const formPesoEquipajes = {
        display: 'flex',
        flexDirection: 'row',
    }

    const equipajeEspecial = {
        marginTop: '10px',
    }

    const seccionEquipaje = {
        backgroundColor: "#ffa800",
        width: "35%",
        padding: "25px",
        margin: "0 4% 8% 0",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        border: "1px solid black",
        borderRadius: "20px"
    }




    return (
        <div style={extrasContainer}>
            <div style={divBody}>
                <main>
                    <div style={divEquipajes}>
                        <form style={formPesoEquipajes} method="post">
                            <div className="divOpcionesPesoEquipajes">
                                <img src="/img/equipaje de bodega 1.png" alt="" className="imgOpcionesPesoEquipajes" />
                                <label>Equipaje hasta 9kg $10000 </label>
                                <br />
                                <input type="radio" name="pesoEquipaje" defaultChecked />
                            </div>
                            <div className="divOpcionesPesoEquipajes">
                                <img src="/img/equipaje de bodega 1.png" alt="" className="imgOpcionesPesoEquipajes" />
                                <label>Equipaje hasta 15kg $15000 </label>
                                <br />
                                <input type="radio" name="pesoEquipaje" />
                            </div>
                            <div className="divOpcionesPesoEquipajes">
                                <img src="/img/equipaje de bodega 1.png" alt="" className="imgOpcionesPesoEquipajes" />
                                <label>Equipaje hasta 20kg $20000 </label>
                                <br />
                                <input type="radio" name="pesoEquipaje" />
                            </div>
                        </form>

                        <div style={equipajeEspecial}>
                            <form className="formEquipajeEspecial" method="post">
                                <div className="divOpcionesEquipajesEspeciales">
                                    <img src="/img/equipaje de mano.png" alt="" className="imgEquipajeEspecial" />
                                    <label>Equipaje de mano incluido (6kg)</label>
                                </div>
                                <div className="divOpcionesEquipajesEspeciales">
                                    <img src="/img/equipaje especial.png" alt="" className="imgEquipajeEspecial" />
                                    <label>Equipaje especial $12500 </label>
                                    <input type="radio" name="tipoDeEquipaje" />
                                </div>
                                <div className="divOpcionesEquipajesEspeciales">
                                    <img src="/img/mascota en cabina.png" alt="" className="imgEquipajeEspecial" />
                                    <label>Mascota en cabina $15000 </label>
                                    <input type="radio" name="tipoDeEquipaje" />
                                </div>
                            </form>
                        </div>

                        <input type="button" value="Continuar" id="btnContinuar" />
                    </div>
                </main>

                <section style={seccionEquipaje} >
                    <div style={{ height:'100%', backgroundColor:'white', borderRadius:'20px', padding:'2.5%', fontSize:'medium'}}>
                        <h4 style={{fontSize:'medium'}}>RESUMEN DE VUELO</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos fuga quod facere esse quibusdam rem placeat alias dolorem saepe pariatur soluta dolores numquam asperiores voluptatem provident, consequatur expedita modi eius!</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Extras;
