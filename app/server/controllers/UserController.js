import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import userModel from "../models/UserModel";
import CurrencyAPI from '@everapi/currencyapi-js';

const currencyApi = new CurrencyAPI(process.env.CURRENCY_API_KEY);
const JWT_SECRET = process.env.JWT_SECRET;

// récupérer user par son email
async function getUserByEmail(email) {
    try {
        const user = await userModel.findUserByEmail(email);
        return user;
    } catch (error) {
        throw new Error("Unable to retrieve user by email.");
    }
}

// Vérifier que l'utilisateur existe par le mail et le mot de passe
async function authenticateUser(email, password) {
    try {
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            console.log('User not found');
            return { success: false, message: 'Aucun utilisateur trouvé avec cet email.' };
        }
        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            console.log('Password incorrect');
            return { success: false, message: 'Mot de passe incorrect.' };
        }
        if (user.isVerified) {
            return { success: true, message: "Connexion réussie."};
        } else {
            return { email: user.email, success: true, message: "Account not verified." };
        }
    } catch (err) {
        console.error('Error finding user by email:', err);
        return { success: false, message: 'Aucun utilisateur trouvé avec cet email.' };
    }
}

// Vérifier que le compte de l'utilisateur est actif
async function isAccountVerified(email) {
    return await userModel.isAccountVerified(email);
}

// Valider le profil de l'utilisateur
async function setAccountVerified(email, isVerified) {
    return await userModel.setAccountVerified(email, isVerified);
}

// Ajouter un nouvel utilisateur
async function addNewUser(user) {
    return await userModel.addNewUser(user);
}

// Comparer le mot de passe fourni avec celui enregistré
async function comparePasswords(inputPassword, savedPassword) {
    return await bcrypt.compare(inputPassword, savedPassword);
}

// Hacher un mot de passe
async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Générer un mot de passe aléatoire
async function generateRandomPassword(length = 8) {
    return randomBytes(length).toString('hex');
}

// Créer un mot de passe initial
async function createInitialPassword() {
    const initialPassword = await generateRandomPassword();
    const hashedPassword = await hashPassword(initialPassword);
    return { initialPassword, hashedPassword };
}

const userController = {
    addNewUser,
    createInitialPassword,
    authenticateUser,
    isAccountVerified,
    setAccountVerified,
    getUserByEmail
};

export default userController;
