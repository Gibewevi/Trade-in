import userController from "@/app/server/controllers/UserController";
import cookie from 'cookie'; // Importer la bibliothèque de gestion des cookies

export async function POST(request) {
    try {
        // Extraire les données de connexion du corps de la requête
        const credentials = await request.json();

        // Appeler la méthode de connexion du UserController
        const user = await userController.authenticateUser(credentials.email, credentials.password);
        console.log('user API : ', user);
        // Vérifier si l'utilisateur est trouvé et authentifié
        if (user.success) {
            // Vérifier que l'utilisateur est vérifié
            const isAccountVerified = await userController.isAccountVerified(credentials.email);
            console.log('(isAccountVerified : ', isAccountVerified);
            if (isAccountVerified) {
                // Générer le token JWT
                const token = user.token;
                console.log('token =  user.token : ', user.token);
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

                // Répondre avec les détails de l'utilisateur et le statut de vérification du compte
                return new Response(JSON.stringify({
                    status: 200,
                    message: "Login successful",
                    data: {
                        ...user,
                        isAccountVerified: isAccountVerified
                    }
                }), {
                    headers: responseHeaders // Ajouter les en-têtes à la réponse
                });
            } else {
                // créé un token d'authentification spécialement pour la vérification du compte avec son adresse
                console.log('pas vérifier, creation du token ');
                console.log('user ', user.email);
                const verificationToken = userController.createVerificationJWTbyEmail(user.email);
                console.log('verificationToken : ', verificationToken);
                const cookieOptions = {
                    httpOnly: true,
                    maxAge: 900,
                    path: '/',
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV === 'production'
                };

                const verificationCookie = cookie.serialize('verificationToken', verificationToken, cookieOptions);
                console.log('verificationCookie : ', verificationCookie);
                const responseHeaders = {
                    'Content-Type': 'application/json',
                    'Set-Cookie': verificationCookie
                };

                return new Response(JSON.stringify({
                    status: 200,
                    message: "Account not verified",
                    data: {
                        ...user,
                        isAccountVerified: isAccountVerified
                    }
                }), {
                    headers: responseHeaders
                });
            }
        } else {
            // Si l'authentification échoue, envoyer une réponse d'erreur
            return new Response(JSON.stringify({
                status: 401,
                message: user.message
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
            message: "Server error",
            error: error.message
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
