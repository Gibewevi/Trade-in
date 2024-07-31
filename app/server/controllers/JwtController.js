import jwt from 'jsonwebtoken';
import cookie from 'cookie';
const JWT_SECRET = process.env.JWT_SECRET;

// Fonction pour créer un JWT d'authentification
function createJWTtoken(user, tokenName, maxAgeJwt) {
    const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    const cookieOptions = {
        httpOnly: true,
        maxAge: maxAgeJwt,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    };
    return cookie.serialize(tokenName, token, cookieOptions);
}


// Vérifier un JWT pour la vérification du compte
function verifyJWTVerifiedAccount(token) {
    const tokenVerified = jwt.verify(token, JWT_SECRET);
    return tokenVerified;
}


const jwtController = {
    createJWTtoken,
    verifyJWTVerifiedAccount
}

export default jwtController;