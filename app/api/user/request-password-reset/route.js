// api/user/request-password-reset/route.js
import userController from '@/app/server/controllers/UserController';
import passwordController from '@/app/server/controllers/PasswordController';
import mailController from '@/app/server/controllers/MailController';

export async function POST(request) {
    try {
        // Récupérer l'email depuis la requête
        const { email } = await request.json();
        console.log('Email:', email);

        // Vérifier si l'email est fourni
        if (!email) {
            return new Response(JSON.stringify({ error: "L'email est requis." }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Vérifier si l'utilisateur existe dans la base de données
        const user = await userController.getUserByEmail(email);
        console.log('User:', user);

        if (!user) {
            return new Response(JSON.stringify({ error: "Utilisateur non trouvé." }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Générer et enregistrer le jeton de réinitialisation
        const uuid = await passwordController.generateResetToken(user.id);
        console.log('uuid:', uuid);

        // Envoyer l'email de réinitialisation
        const mailResponse = await mailController.sendPasswordResetEmail(email, uuid);
        console.log('mailResponse:', mailResponse);

        return new Response(JSON.stringify({ message: "Email de réinitialisation envoyé avec succès." }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Erreur lors de la demande de réinitialisation du mot de passe:', error);
        return new Response(JSON.stringify({ error: "Une erreur est survenue lors de la demande de réinitialisation du mot de passe." }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
