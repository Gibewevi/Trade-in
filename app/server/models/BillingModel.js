import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function setBillingByUserId(userId, billing) {
    try {

        // Mettre à jour les données de facturation pour l'utilisateur
        const updatedBilling = await prisma.billing.upsert({
            where: { userId: userId },
            update: {
                fullName: billing.fullName,
                billingAddressLine1: billing.billingAddressLine1,
                billingAddressLine2: billing.billingAddressLine2 || null,
                billingCity: billing.billingCity,
                billingState: billing.billingState,
                billingPostalCode: billing.billingPostalCode,
                billingCountry: billing.billingCountry,
            },
            create: {
                userId: userId,
                fullName: billing.fullName,
                billingAddressLine1: billing.billingAddressLine1,
                billingAddressLine2: billing.billingAddressLine2 || null,
                billingCity: billing.billingCity,
                billingState: billing.billingState,
                billingPostalCode: billing.billingPostalCode,
                billingCountry: billing.billingCountry,
            }
        });
        return updatedBilling;
    } catch (error) {
        console.error('Erreur lors de la mise à jour des données de facturation:', error);
        throw new Error('Erreur lors de la mise à jour des données de facturation');
    }
}
async function saveBillingInfo(billing) {
    // Récupérer l'utilisateur par email pour obtenir l'ID
    const userData = await prisma.user.findUnique({
        where: {
            email: billing.email
        }
    });

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
    return billingEntry;
}

const billingModel = {
    saveBillingInfo,
    setBillingByUserId
};

export default billingModel;
