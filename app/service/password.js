// src/service/password.js

const setPassword = async (currentPassword, newPassword) => {
    console.log('password service');
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
}

export default passwordService;
