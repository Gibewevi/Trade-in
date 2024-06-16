import userController from "@/app/server/controllers/UserController";
import jwtController from "@/app/server/controllers/JwtController";


export async function POST(request) {
    try {
        // Extraire les données de connexion du corps de la requête
        const credentials = await request.json();

        // Appeler la méthode de connexion du UserController
        const user = await userController.authenticateUser(credentials.email, credentials.password);
        // Vérifier si l'utilisateur est trouvé et authentifié
        if (user.success) {
            // Vérifier que l'utilisateur est vérifié
            const isAccountVerified = await userController.isAccountVerified(credentials.email);
            if (isAccountVerified) {
                // Créer un token JWT pour l'utilisateur authentifié
                const jwtCookie = jwtController.createJWTtoken(user, 'loginJWT', 3600);
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
                const billingRegisterCookie = jwtController.createJWTtoken(user, 'billingRegisterJWT', 900);
                console.log("billingRegisterCookie", billingRegisterCookie);
                const responseHeaders = {
                    'Content-Type': 'application/json',
                    'Set-Cookie': billingRegisterCookie
                };
                console.log("responseHeaders", responseHeaders);
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
