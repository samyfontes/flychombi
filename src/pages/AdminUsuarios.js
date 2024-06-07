import React, { useEffect } from "react";
import { db } from './firebase';

// El componente AdminUsuarios se encarga de renderizar la vista del admin para la administración de usuarios.
// Esta vista consta de una tabla que muestra los usuarios existentes en la base de datos y permite al admin
// modificar y eliminar usuarios con una columna de botones para cada uno de estos casos y un botón para agregar
// un nuevo usuario.

const AdminUsuarios = () => {
    const containerStyle = {
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#faebd7",
        borderRadius: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
    };

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px"
    };

    const thStyle = {
        backgroundColor: "#ffa800",
        color: "black",
        padding: "10px",
        border: "1px solid #ddd",
        fontSize: "18px"
    };

    const tdStyle = {
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "center"
    };

    const buttonStyle = {
        backgroundColor: "#ffa800",
        border: "none",
        borderRadius: "5px",
        color: "black",
        padding: "10px 20px",
        cursor: "pointer",
        transition: "transform 0.2s"
    };

    const buttonHoverStyle = {
        backgroundColor: "#d78f00",
        transform: "scale(1.1)"
    };

    const headerStyle = {
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#FDBE0F",
        fontSize: "24px",
        borderRadius: "16px",
        fontStyle: "italic",
    };

    const AdminUsuarios = () => {
        const [usuarios, setUsuarios] = useState([]);

        useEffect(() =>{
            const obtencionUsuarios =async () => {
                const snapshot = await db.collection('usuarios').get();
                const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsuarios(usersList);
            };
            obtenerUsuarios();

        }, []);
    }

    
    const eliminarUsuario = async (id) => {
        await db.collection('usuarios').doc(id).delete();
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    };


    const agregarUsuario = async()=>{
        const nuevoUsuario = { nombre: 'Nuevo', apellido: 'Apellido', email: 'Email', rol: 'rol'
        };
        const docRef = await db.collection('usuarios').add(nuevoUsuario);
        setUsuarios([...usuarios, {id:docRef.id, ...nuevoUsuario}]);
    };


    const modificarUsuario = async (id, updateDate) =>{

        await db.collection('usuarios').doc(id).update(updateData);
        setUsuarios(usuarios.map(usuario => (usuario.id === id ? { ...usuario, ...updatedData } : usuario)));
        setEditUsuario(null);
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Administrar Usuarios</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Nombre</th>
                        <th style={thStyle}>Apellido</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Rol</th>
                        <th style={thStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td style={tdStyle}>{usuario.nombre}</td>
                            <td style={tdStyle}>{usuario.apellido}</td>
                            <td style={tdStyle}>{usuario.email}</td>
                            <td style={tdStyle}>{usuario.rol}</td>
                            <td style={tdStyle}>
                                <button style={buttonStyle} onClick={() => modificarUsuario(usuario.id, { rol: 'Nuevo Rol' })}>Modificar</button>
                                <button style={{ ...buttonStyle, ...buttonHoverStyle }} onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button style={{ ...buttonStyle, marginTop: "20px" }} onClick={agregarUsuario}>Agregar Usuario</button>
        </div>
    );
}

export default AdminUsuarios;