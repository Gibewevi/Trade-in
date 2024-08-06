import billingController from "@/app/server/controllers/BillingController";
import userController from "@/app/server/controllers/UserController";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function PUT(request) {
    try {
        // Récupérer les cookies et le token JWT
        const cookieStore = cookies();
        const tokenCookie = cookieStore.get('loginJWT');

        if (!tokenCookie) {
            return new Response(JSON.stringify({ error: "No session token found" }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        }

        const token = tokenCookie.value;
        let userData;
        let emailJWT;
        try {
            userData = jwt.verify(token, JWT_SECRET);
            emailJWT = userData.email;
        } catch (error) {
            console.error('Invalid token', error);
            return new Response(JSON.stringify({ error: "Invalid token" }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        }

        // Récupérer le corps de la requête (données du formulaire)
        const formData = await request.json();

        // Mettre à jour les données de facturation et l'email de l'utilisateur
        const billingUpdated = await billingController.setBillingByUserId(formData.userId, formData);
        if (emailJWT !== formData.email) {
            console.log('email différent donc je le modifie dans la base de donnée');
            const emailUpdated = await userController.setEmailByUserId(formData.userId, formData.email);
        } else {console.log('email est le meme');};


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
