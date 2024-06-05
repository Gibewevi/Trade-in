import userModel from './UserModel';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
      currency: invoiceData.currencyCode,
      paymentStatus: "succeded",
    }
  });
  console.log('invoice model : ', newInvoice);
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
  newInvoiceWithTaxRates
};

export default invoiceModel;
