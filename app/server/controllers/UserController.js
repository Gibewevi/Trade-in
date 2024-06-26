import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import userModel from "../models/UserModel";
import deviseModel from '../models/DeviseModel';
import CurrencyAPI from '@everapi/currencyapi-js';
import jwt from 'jsonwebtoken';

const currencyApi = new CurrencyAPI(process.env.CURRENCY_API_KEY);

async function setAccountVerified(email, isVerified) {
    const accountVerified = await userModel.setAccountVerified(email, isVerified);
    return accountVerified;
};


const verifyJWTVerifiedAccount = (token) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    return jwt.verify(token, JWT_SECRET);
}

// Vérifier que le compte de l'utilisateur est actif.
async function isAccountVerified(email) {
    const isVerified = await userModel.isAccountVerified(email);
    return isVerified;
}
// Checks if the user is located in Canada based on their billing address.

const isUserInCanadaByCountryCode = (countryCode) => {
    return countryCode.toUpperCase() === 'CA' ? true : false;
};

// Récupère la localisation de l'utilisateur à partir de son adresse IP.

async function fetchUserLocationByIp(ip) {
    console.log('Fetching location for IP:', ip);
    const response = await fetch(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch location information from IPStack');
    const data = await response.json();
    console.log('Location Data:', data);
    return data;
}

// Récupère la devise associée à un code pays.
async function getCurrencyByCountryCode(countryCode) {
    const currency = await deviseModel.getCurrencyByCountryCode(countryCode);
    if (!currency) throw new Error('Currency not found for the given country code');
    return currency;
}

// Récupère le taux de change entre deux devises en utilisant l'API Currency.
async function getExchangeRate(baseCurrency, targetCurrency) {
    console.log('Fetching exchange rate for:', baseCurrency, 'to', targetCurrency);
    const currencyExchangeRateAPI = await currencyApi.latest({
        base_currency: baseCurrency,
        currencies: targetCurrency
    });
    if (!currencyExchangeRateAPI.data || !currencyExchangeRateAPI.data[targetCurrency]) {
        throw new Error('Failed to fetch exchange rate from Currency API');
    }
    const exchangeRate = currencyExchangeRateAPI.data[targetCurrency].value;
    console.log('Exchange Rate Data:', exchangeRate);
    return exchangeRate;
}

// Calcule le montant converti dans une devise cible en utilisant le taux de change.
function calculateConvertedAmount(amount, exchangeRate) {
    const amountInDollars = amount / 100;
    const convertedAmount = amountInDollars * exchangeRate;
    const roundedConvertedAmount = Math.round(convertedAmount * 100) / 100;
    console.log('Calculated Converted Amount:', roundedConvertedAmount.toFixed(2));
    return roundedConvertedAmount.toFixed(2);
}

// Récupère le taux de change et calcule le prix de l'article en fonction de l'adresse IP de l'utilisateur.
async function getExchangeRateAndPriceByIp(ip, amount) {
    const location = await fetchUserLocationByIp(ip);
    const countryCode = location.country_code;
    const regionCode = location.region_code;
    console.log('Country Code:', countryCode);

    const currency = await getCurrencyByCountryCode(countryCode);
    const currencyCode = currency.code;
    console.log('Currency:', currency);

    const exchangeRate = await getExchangeRate('USD', currency.code);
    console.log('Exchange Rate:', exchangeRate);

    const convertedAmount = calculateConvertedAmount(amount, exchangeRate);
    console.log('Converted Amount:', convertedAmount);

    return {
        convertedAmount,
        exchangeRate,
        countryCode,
        regionCode,
        currencyCode,
    };
}

// Fonction pour créer un JWT pour vérifier l'account
function createVerificationJWTbyEmail(email) {
    if (!email) {
        throw new Error("Email is required to generate a verification token.");
    }

    return jwt.sign(
        { email: email, tokenType: 'verification' },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
}
// Fonction pour créer un JWT
function createJWTtoken(user) {
    return jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

// vérifier que l'utilisateur existe par le mail
async function authenticateUser(email, password) {
    let user;
    try {
        user = await userModel.findUserByEmail(email);
    } catch (err) {
        console.error('Error finding user by email:', err);
        return {
            success: false,
            message: 'Aucun utilisateur trouvé avec cet email.'
        };
    }
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
        console.log('Password incorrect');
        return {
            success: false,
            message: 'Mot de passe incorrect.'
        };
    }
    if (user.isVerified) {
        const token = createJWTtoken(user);
        return {
            success: true,
            message: "Connexion réussie.",
            token: token
        };
    } else {
        return {
            email: user.email,
            success: true,
            message: "Account not verified."
        };
    }
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
    authenticateUser,
    getExchangeRateAndPriceByIp,
    isUserInCanadaByCountryCode,
    isAccountVerified,
    setAccountVerified,
    createVerificationJWTbyEmail,
    verifyJWTVerifiedAccount
};

export default userController;


