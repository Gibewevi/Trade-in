import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import userModel from "../models/UserModel";

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
    console.log('controller user : ', user);
    const userData = await userModel.addNewUser(user);
    return userData;
}

// Contrôleur utilisateur
const userController = {
    addNewUser,
    createInitialPassword
};

export default userController;
