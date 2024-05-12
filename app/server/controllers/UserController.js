import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import userModel from "../models/UserModel";
import jwt from 'jsonwebtoken';

// vérifier que l'utilisateur existe par le mail
async function authenticateUser(email, password) {
    const user = await userModel.findUserByEmail(email);
    if (user) {
        const isMatch = await comparePasswords(password, user.password);
        if (isMatch) {
            // Création du JWT
            const token = createJWTtoken(user);
            return {
                success: true,
                message: "Connexion réussie.",
                token: token
            };
        } else {
            return {
                success: false,
                message: "Mot de passe incorrect."
            };
        }
    } else {
        return {
            success: false,
            message: "Aucun utilisateur trouvé avec cet email."
        };
    }
}

// Fonction pour créer un JWT
function createJWTtoken(user) {
    return jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

// Fonction pour comparer le mot de passe fourni avec celui enregistré
async function comparePasswords(inputPassword, savedPassword) {
    return await bcrypt.compare(inputPassword, savedPassword);
}

// Fonction pour hacher un mot de passe
async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Fonction pour générer un mot de passe aléatoire
async function generateRandomPassword(length = 8) { // Longueur en octets, 8 octets donneront 16 caractères hexadécimaux
    return randomBytes(length).toString('hex');
}

// Fonction pour créer un mot de passe initial
async function createInitialPassword() {
    const initialPassword = await generateRandomPassword();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(initialPassword, saltRounds);
    return { initialPassword, hashedPassword };
}

// Fonction pour ajouter un nouvel utilisateur
async function addNewUser(user) {
    const userData = await userModel.addNewUser(user);
    return userData;
}

// Contrôleur utilisateur
const userController = {
    addNewUser,
    createInitialPassword,
    authenticateUser
};

export default userController;
