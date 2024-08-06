import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userController from '@/app/server/controllers/UserController';

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
        try {
            userData = jwt.verify(token, JWT_SECRET);
        } catch (error) {
            console.error('Invalid token', error);
            return new Response(JSON.stringify({ error: "Invalid token" }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        }

        // Récupérer l'ID utilisateur depuis le token
        const userId = userData.id;
        console.log('User ID:', userId);
        // Récupérer le corps de la requête (données du formulaire)
        const formData = await request.json();
        const { currentPassword, newPassword } = formData;
        console.log('Current Password:', currentPassword, 'New Password:', newPassword);

        // Récupérer le mot de passe de l'utilisateur et le comparer avec l'ancien mot de passe fourni
        const user = await userController.getUserById(userId);
        console.log('User:', user);
        const isPasswordCorrect = await userController.comparePasswords(currentPassword, user.password);
        console.log('Is Password Correct:', isPasswordCorrect);


        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        }

        if (!isPasswordCorrect) {
            return new Response(JSON.stringify({ error: "Current password is incorrect" }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        }

        // Mettre à jour le mot de passe dans la base de données
        await userController.setPasswordByUserId(userId, newPassword);

        return new Response(JSON.stringify({ message: "Password changed successfully" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        console.error('Erreur lors de la modification du mot de passe:', error);
        return new Response(JSON.stringify({ error: "Une erreur est survenue lors de la modification du mot de passe." }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
}
