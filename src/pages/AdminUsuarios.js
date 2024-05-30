import React from "react";

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
                    <tr>
                        <td style={tdStyle}>Juan</td>
                        <td style={tdStyle}>Perez</td>
                        <td style={tdStyle}>juanperez@gmail.com</td>
                        <td style={tdStyle}>Usuario</td>
                        <td style={tdStyle}>
                            <button style={buttonStyle}>Modificar</button>
                            <button style={{ ...buttonStyle, ...buttonHoverStyle }}>Eliminar</button>
                        </td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>Maria</td>
                        <td style={tdStyle}>Gomez</td>
                        <td style={tdStyle}>mariagomez@gmail.com</td>
                        <td style={tdStyle}>Usuario</td>
                        <td style={tdStyle}>
                            <button style={buttonStyle}>Modificar</button>
                            <button style={{ ...buttonStyle, ...buttonHoverStyle }}>Eliminar</button>
                        </td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>Pedro</td>
                        <td style={tdStyle}>Rodriguez</td>
                        <td style={tdStyle}>pedrorodriguez@gmail.com</td>
                        <td style={tdStyle}>Empleado</td>
                        <td style={tdStyle}>
                            <button style={buttonStyle}>Modificar</button>
                            <button style={{ ...buttonStyle, ...buttonHoverStyle }}>Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button style={{ ...buttonStyle, marginTop: "20px" }}>Agregar Usuario</button>
        </div>
    );
}

export default AdminUsuarios;