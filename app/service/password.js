// src/service/password.js

const requestPasswordReset = async (email) => {
    console.log('password service - request password reset');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        // Envoi de la demande de réinitialisation de mot de passe à l'API avec la méthode POST
        const response = await fetch(`${API_URL}/api/user/request-password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email }),
        });

        // Vérifiez si la réponse est réussie
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Retournez la réponse JSON si la requête a été réussie
        const resetResponse = await response.json();
        return resetResponse;

    } catch (error) {
        console.error(error);
        throw error;
    }
}


const setPassword = async (currentPassword, newPassword) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        // Envoi des données de modification de mot de passe à l'API avec la méthode PUT
        const response = await fetch(`${API_URL}/api/user/change-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        // Vérifiez si la réponse est réussie
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Retournez la réponse JSON si la requête a été réussie
        const passwordResponse = await response.json();
        return passwordResponse;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

const passwordService = {
    setPassword,
    requestPasswordReset
}

export default passwordService;
