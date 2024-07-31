

const setBillingByUserId = async (billingData) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        // Envoi des données de facturation à l'API avec la méthode PUT
        const response = await fetch(`${API_URL}/api/user/${billingData.userId}/billing`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(billingData),
        });

        // Vérifiez si la réponse est réussie
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Retournez la réponse JSON si la requête a été réussie
        const billingResponse = await response.json();
        return billingResponse;

    } catch (error) {
        console.error(error);
        throw error;
    }
}


const billingService = {
    setBillingByUserId,
}

export default billingService;
