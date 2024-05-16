import React from 'react';
import '../App.css';

const Extras = () => {
    return (
        <div className="extras-container">
            <div className="divBody">
                <main>
                    <div className="divEquipajes">
                        <form className="formPesoEquipajes" method="post">
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

                        <div className="equipajeEspecial">
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

                <section className="seccionEquipaje">
                    <div>
                        <h4>RESUMEN DE VUELO</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos fuga quod facere esse quibusdam rem placeat alias dolorem saepe pariatur soluta dolores numquam asperiores voluptatem provident, consequatur expedita modi eius!</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Extras;
