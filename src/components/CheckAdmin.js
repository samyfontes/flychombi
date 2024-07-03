// utils/checkAdmin.js
import { auth } from '../firebase'; // Asegúrate de que esta ruta sea correcta

const checkAdmin = async () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const response = await fetch('https://us-central1-flychombi.cloudfunctions.net/checkAdmin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: user.email }),
                    });

                    const data = await response.json();
                    if (data.isAdmin) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } catch (error) {
                    console.error("Error checking admin status:", error);
                    resolve(false);
                }
            } else {
                resolve(false);
            }
        });
    });
};

export default checkAdmin;
