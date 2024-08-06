import userController from "./UserController";
import invoiceModel from "../models/InvoiceModel";
import deviseModel from '../models/DeviseModel';
import CurrencyAPI from '@everapi/currencyapi-js';

const currencyApi = new CurrencyAPI(process.env.CURRENCY_API_KEY);
const JWT_SECRET = process.env.JWT_SECRET;

// Vérifie si le code pays dans les données de facture correspond au code pays dans les données de facturation
const isCountryCodeMatch = (invoiceData, billingData) => invoiceData.countryCode === billingData.country;

// Vérifie si le code région dans les données de facture correspond au code région dans les données de facturation
const isRegionCodeMatch = (invoiceData, billingData) => invoiceData.regionCode === billingData.state;

// Met à jour la facture avec les taux de taxes par identifiant
async function setInvoiceWithTaxRatesById(invoiceData, taxRates) {
    const invoice = await invoiceModel.setInvoiceWithTaxRatesById(invoiceData, taxRates);
    return invoice;
}

// Met à jour la facture sans les taux de taxes par identifiant
async function setInvoiceWithoutTaxRatesById(invoiceData) {
    const invoice = await invoiceModel.setInvoiceWithoutTaxRatesById(invoiceData);
    return invoice;
}

// Met à jour la facture pour un utilisateur canadien avec les taux de taxes
const updateInvoiceWithTaxRates = async (invoice, billing) => {
    console.log("L'utilisateur est au Canada");
    invoice.currency = 'CAD';  // Définit la devise en dollars canadiens
    invoice.exchangeRate = await getExchangeRate('USD', invoice.currency);  // Récupère le taux de change USD vers CAD
    invoice.countryCode = billing.country;
    invoice.regionCode = billing.state;
    const taxRates = await invoiceModel.getTaxRatesByRegionCode(billing.state);  // Récupère les taux de taxes pour la région
    // Met à jour la facture avec les taux de taxes
    return await setInvoiceWithTaxRatesById(invoice, taxRates);
}

// Met à jour la facture pour un utilisateur non canadien sans les taux de taxes
const updateInvoiceWithoutTaxRates = async (invoice, billing) => {
    console.log("L'utilisateur ne réside pas au Canada");
    const currency = await invoiceModel.getCurrencyByCountryCode(billing.country);  // Récupère la devise pour le pays donné
    invoice.currency = currency.code;  
    invoice.exchangeRate = await getExchangeRate('USD', currency.code);  // Récupère le taux de change USD vers la devise locale
    invoice.countryCode = billing.country;
    invoice.regionCode = billing.state;
    return await setInvoiceWithoutTaxRatesById(invoice);
}

// Fonction principale pour mettre à jour les taxes de la facture en fonction des données de facturation
const UpdateInvoiceTaxByBillingRegister = async (invoiceData, billingData) => {
    const invoice = invoiceData;
    const billing = billingData;

    // Si le pays et la région sont identiques entre les données de facture et de facturation, pas de mise à jour nécessaire
    if (isCountryCodeMatch(invoiceData, billingData) && isRegionCodeMatch(invoiceData, billing)) {
        // les données sont identiques, pas besoin de mettre à jour les taxes ou la devise
    } else {
        if (isUserInCanadaByCountryCode(billing.country)) {
            const invoiceUpdated = await updateInvoiceWithTaxRates(invoice, billing);
            console.log('invoiceUpdated : ', invoiceUpdated);
        } else {
            const invoiceUpdated = await updateInvoiceWithoutTaxRates(invoice, billing);
            console.log('invoiceUpdated : ', invoiceUpdated);
        }
    }
};

// Creates a new invoice based on user location and tax rates.
const newInvoice = async (invoiceData) => {

    const isUserLiveInCanada = isUserInCanadaByCountryCode(invoiceData.countryCode);
    console.log('isUserLiveInCanada : ', isUserLiveInCanada);
    if (isUserLiveInCanada) {
        const taxRates = await invoiceModel.getTaxRatesByRegionCode(invoiceData.regionCode);
        console.log('taxRates : ', taxRates);
        if (!taxRates) {
            throw new Error(`Tax rates not found for region code: ${invoiceData.regionCode}`);
        }
        // calculer le hors taxe
        return await newInvoiceWithTaxRates(invoiceData, taxRates);
    } else {
        // Generate invoice without tax rates
        return await newInvoiceWithoutTaxRates(invoiceData);
    }
};


async function newInvoiceWithTaxRates(invoiceData, taxRates) {
    //-> calcul amount HT
    const invoice = await invoiceModel.newInvoiceWithTaxRates(invoiceData, taxRates);
    console.log('invoice : ', invoice);
    return invoice;
};
async function newInvoiceWithoutTaxRates(invoiceData, taxRates) {
    const invoice = await invoiceModel.newInvoiceWithoutTaxRates(invoiceData);
    return invoice;
};

async function getFirstInvoiceByUserId(userId) {
    return await invoiceModel.getFirstInvoiceByUserId(userId);
}

// Récupère la localisation de l'utilisateur à partir de son adresse IP
async function fetchUserLocationByIp(ip) {
    console.log('Fetching location for IP:', ip);
    const response = await fetch(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch location information from IPStack');
    const data = await response.json();
    console.log('Location Data:', data);
    return data;
}

// Récupère la devise associée à un code pays
async function getCurrencyByCountryCode(countryCode) {
    const currency = await deviseModel.getCurrencyByCountryCode(countryCode);
    if (!currency) throw new Error('Currency not found for the given country code');
    return currency;
}

// Récupère le taux de change entre deux devises en utilisant l'API Currency
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

// Calcule le montant converti dans une devise cible en utilisant le taux de change
function calculateConvertedAmount(amount, exchangeRate) {
    const amountInDollars = amount / 100;
    const convertedAmount = amountInDollars * exchangeRate;
    const roundedConvertedAmount = Math.round(convertedAmount * 100) / 100;
    console.log('Calculated Converted Amount:', roundedConvertedAmount.toFixed(2));
    return roundedConvertedAmount.toFixed(2);
}

// Récupère le taux de change et calcule le prix de l'article en fonction de l'adresse IP de l'utilisateur
async function getExchangeRateAndPriceByIp(ip, amount) {
    const location = await fetchUserLocationByIp(ip);
    const countryCode = location.country_code;
    const countryName = location.country_name;
    const regionCode = location.region_code;
    console.log('Country Code:', countryCode);

    const currency = await getCurrencyByCountryCode(countryCode);
    const currencyCode = currency.code;
    console.log('Currency:', currency);
    const exchangeRate = await getExchangeRate('USD', currencyCode);
    console.log('Exchange Rate:', exchangeRate);

    const convertedAmount = calculateConvertedAmount(amount, exchangeRate);
    console.log('Converted Amount:', convertedAmount);

    return {
        convertedAmount,
        exchangeRate,
        countryCode,
        regionCode,
        currencyCode, 
        countryName, 
    };
}

// Checks if the user is located in Canada based on their billing address
function isUserInCanadaByCountryCode(countryCode) {
    return countryCode.toUpperCase() === 'CA';
}

// Contrôleur utilisateur
const invoiceController = {
    newInvoice,
    getFirstInvoiceByUserId,
    UpdateInvoiceTaxByBillingRegister,
    getExchangeRateAndPriceByIp
};

export default invoiceController;
