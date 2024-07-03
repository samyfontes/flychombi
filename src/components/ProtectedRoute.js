// components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import checkAdmin from './CheckAdmin'; // Asegúrate de que esta ruta sea correcta

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAdmin = async () => {
            const isAdmin = await checkAdmin();
            setIsAuthorized(isAdmin);
            setLoading(false);
        };

        verifyAdmin();
    }, []);

    if (loading) {
        return <p>Cargando...</p>; // Puedes reemplazar esto con un componente de carga
    }

    return isAuthorized ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" />
    );
};

export default ProtectedRoute;
