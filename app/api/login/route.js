import userController from "@/app/server/controllers/UserController";
import cookie from 'cookie'; // Importer la bibliothèque de gestion des cookies

export async function POST(request) {
    try {
        // Extraire les données de connexion du corps de la requête
        let credentials = await request.json();
        console.log('credentials : ', credentials);
        
        // Appeler la méthode de connexion du UserController
        let user = await userController.authenticateUser(credentials.email, credentials.password);
        
        // Vérifier si l'utilisateur est trouvé et authentifié
        if (user.success) {

            // Générer le token JWT
            const token = user.token;
            
            // Définir les options du cookie
            const cookieOptions = {
                httpOnly: true, // Pour des raisons de sécurité, le cookie ne peut pas être accédé par JavaScript côté client
                maxAge: 3600, // Durée de vie du cookie en secondes (ici, 1 heure)
                path: '/', // Le cookie est disponible sur tout le site
                sameSite: 'lax', // Restriction du cookie aux requêtes provenant du même site
                secure: process.env.NODE_ENV === 'production' // Le cookie est sécurisé uniquement en production (HTTPS)
            };

            // Créer le cookie contenant le token JWT
            const jwtCookie = cookie.serialize('jwt', token, cookieOptions);

            // Ajouter le cookie à l'en-tête de la réponse
            const responseHeaders = {
                'Content-Type': 'application/json',
                'Set-Cookie': jwtCookie // Ajouter le cookie à l'en-tête Set-Cookie
            };

            // Répondre avec les détails de l'utilisateur
            return new Response(JSON.stringify({
                status: 200,
                body: {
                    message: "Login successful",
                    data: user
                }
            }), {
                headers: responseHeaders // Ajouter les en-têtes à la réponse
            });
        } else {
            // Si l'authentification échoue, envoyer une réponse d'erreur
            return new Response(JSON.stringify({
                status: 401,
                body: {
                    message: user.message
                }
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (error) {
        // Gérer les exceptions éventuelles, comme les erreurs de serveur
        return new Response(JSON.stringify({
            status: 500,
            body: {
                message: "Server error",
                error: error.message
            }
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}