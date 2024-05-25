import userController from "./UserController";
import invoiceModel from "../models/InvoiceModel";

// Creates a new invoice based on user location and tax rates.
const newInvoice = async (invoiceData) => {
    const isUserLiveInCanada = userController.isUserInCanadaByCountryCode(invoiceData.countryCode);
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

async function newInvoiceWithTaxRates(invoiceData, taxRates){
    //-> calcul amount HT
    const invoice = await invoiceModel.newInvoiceWithTaxRates(invoiceData, taxRates);
    console.log('invoice : ', invoice);
    return invoice;
};
async function newInvoiceWithoutTaxRates(invoiceData, taxRates){
    const invoice = await invoiceModel.newInvoiceWithoutTaxRates(invoiceData);
    return invoice;
};

// Contrôleur utilisateur
const invoiceController = {
    newInvoice
};

export default invoiceController;
