import billingController from "@/app/server/controllers/BillingController";

export async function PUT(request) {
    try {
        // Récupérer le corps de la requête (données du formulaire)
        const formData = await request.json();
        console.log('formdata : ', formData);
        const billingUpdated = await billingController.setBillingByUserId(formData.userId, formData);
    
        return new Response(JSON.stringify({ message: "PUT request received", data: formData }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return new Response(JSON.stringify({ error: "Une erreur est survenue lors de la récupération des données." }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
}