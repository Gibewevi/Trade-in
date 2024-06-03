import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function saveBillingInfo(billing) {
    console.log('model billing : ', billing);
    // Récupérer l'utilisateur par email pour obtenir l'ID
    const userData = await prisma.user.findUnique({
        where: {
            email: billing.email
        }
    });
    console.log('BillingModel  : ', userData);
    
    if (!userData) {
        throw new Error('User not found');
    }

    // Continuer avec la création de l'entrée de facturation
    const billingEntry = await prisma.billing.create({
        data: {
            userId: userData.id, // Utiliser l'ID trouvé
            fullName: billing.fullName, // Nom complet de l'utilisateur
            billingAddressLine1: billing.line1, // Rue et numéro
            billingAddressLine2: billing.line2, // Complément d'adresse
            billingCity: billing.city, // Ville
            billingState: billing.state, // État ou région
            billingPostalCode: billing.postal_code, // Code postal
            billingCountry: billing.country // Pays
        }
    });
    console.log('saveBillingInfo billingEntry : ', billingEntry);
    return billingEntry;
}

const billingModel = {
    saveBillingInfo
};

export default billingModel;
