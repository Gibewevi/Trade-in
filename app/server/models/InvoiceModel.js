import userModel from './UserModel';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// currency by cuntry code
async function getCurrencyByCountryCode(countryCode) {
  const currency = await prisma.devise.findFirst({ where: { countryCode } });
  if (!currency) throw new Error('Currency not found for the given country code');
  return currency;
}

// Retrieves the first invoice associated with a particular user ID.
async function getFirstInvoiceByUserId(userId) {
  const userIdInt = parseInt(userId, 10);
  try {
    const invoice = await prisma.invoice.findFirst({
      where: {
        userId: userIdInt
      },
      orderBy: {
        id: 'asc'
      }
    });
    return invoice;
  } catch (error) {
    console.error('Error fetching the first invoice:', error);
    throw error;
  }
}

const setInvoiceWithoutTaxRatesById = async (invoiceData) => {
  // Calculer le montant total (TTC)
  const totalAmount = parseFloat(invoiceData.totalAmount);
  console.log('Total Amount:', totalAmount);
  const exchangeRate = parseFloat(invoiceData.exchangeRate);
  console.log('exchangeRate:', exchangeRate);
  const currency = invoiceData.currency.toString();
  console.log('currency:', currency);

  // Mettre à jour l'invoice existante sans les taux de taxes
  const updatedInvoice = await prisma.invoice.update({
    where: {
      id: invoiceData.id
    },
    data: {
      totalAmount: totalAmount,
      amountHt: totalAmount, // Sans taxes, montant HT = montant TTC
      tps: 0,
      tvp: 0,
      taxRate: 0,
      currency: currency,
      exchangeRate: exchangeRate,
      countryCode: invoiceData.countryCode,
      regionCode: invoiceData.regionCode,
      paymentStatus: "succeeded",
    }
  });
  return updatedInvoice;
};

const setInvoiceWithTaxRatesById = async (invoiceData, taxRates) => {
  // Calculer le montant HT
  const totalAmount = parseFloat(invoiceData.totalAmount);
  const amountHt = parseFloat((totalAmount / (1 + taxRates.totalTax / 100)).toFixed(2));
  const taxRate = parseFloat(taxRates.totalTax);
  const exchangeRate = parseFloat(invoiceData.exchangeRate);
  const currency = invoiceData.currency.toString();

  // Mettre à jour l'invoice existante avec les taux de taxes et les nouvelles données
  const updatedInvoice = await prisma.invoice.update({
    where: {
      id: invoiceData.id
    },
    data: {
      totalAmount: totalAmount,
      amountHt: amountHt,
      tps: taxRates.tps,
      tvp: taxRates.tvp,
      taxRate: taxRate,
      currency: currency,
      exchangeRate: exchangeRate,
      countryCode: invoiceData.countryCode,
      regionCode: invoiceData.regionCode,
      paymentStatus: "succeeded",
    }
  });
  return updatedInvoice;
};


const newInvoiceWithoutTaxRates = async (invoiceData) => {
  // Récupérer le userId par l'email
  const user = await userModel.findUserByEmail(invoiceData.email);

  if (!user) {
    throw new Error(`User not found for email: ${invoiceData.email}`);
  }

  // Calculer le montant total (TTC)
  const totalAmount = parseFloat((parseFloat(invoiceData.amount) / 100).toFixed(2));
  const exchangeRate = parseFloat(invoiceData.exchangeRate);
  const currency = invoiceData.currencyCode.toString();

  // Enregistrer un nouvel invoice dans la table sans les taux de taxes
  const newInvoice = await prisma.invoice.create({
    data: {
      userId: user.id,
      totalAmount: totalAmount,
      amountHt: totalAmount,  // Sans taxes, montant HT = montant TTC
      tps: 0,
      tvp: 0,
      taxRate: 0,
      currency: currency,
      exchangeRate: exchangeRate,
      countryCode: invoiceData.countryCode,
      regionCode: invoiceData.regionCode,
      paymentStatus: "succeeded",
    }
  });
  return newInvoice;
};

// Creates a new invoice with the given data.
const newInvoiceWithTaxRates = async (invoiceData, taxRates) => {
  // Récupérer le userId par l'email
  const user = await userModel.findUserByEmail(invoiceData.email);

  if (!user) {
    throw new Error(`User not found for email: ${invoiceData.email}`);
  }
  // Calculer le montant HT
  const totalAmount = parseFloat((parseFloat(invoiceData.amount) / 100).toFixed(2));
  const amountHt = parseFloat((totalAmount / (1 + taxRates.totalTax / 100)).toFixed(2));
  const taxRate = parseFloat(taxRates.totalTax);
  const exchangeRate = parseFloat(invoiceData.exchangeRate);
  const currency = invoiceData.currencyCode.toString();
  // Enregistrer un nouvel invoice dans la table avec les taux de taxes et les données de la facture
  const newInvoice = await prisma.invoice.create({
    data: {
      userId: user.id,
      totalAmount: totalAmount,
      // Utiliser les montants fournis dans invoiceData
      amountHt: amountHt,
      tps: taxRates.tps,
      tvp: taxRates.tvp,
      taxRate: taxRate,
      currency: currency,
      exchangeRate: exchangeRate,
      countryCode: invoiceData.countryCode,
      regionCode: invoiceData.regionCode,
      paymentStatus: "succeded",
    }
  });
  return newInvoice;
};



// Function to get tax rates by region code
const getTaxRatesByRegionCode = async (regionCode) => {
  return await prisma.tax_rate.findFirst({
    where: {
      abbreviation: regionCode
    }
  });
};

const invoiceModel = {
  getTaxRatesByRegionCode,
  newInvoiceWithTaxRates,
  getFirstInvoiceByUserId,
  getCurrencyByCountryCode,
  setInvoiceWithTaxRatesById,
  newInvoiceWithoutTaxRates,
  setInvoiceWithoutTaxRatesById
};

export default invoiceModel;
