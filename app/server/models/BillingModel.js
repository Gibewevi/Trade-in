import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function newBilling(user) {
    // Récupérer l'utilisateur par email pour obtenir l'ID
    const userData = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    });

    if (!userData) {
        throw new Error('User not found');
    }

    // Continuer avec la création de l'entrée de facturation
    const billingEntry = await prisma.billing.create({
        data: {
            userId: userData.id, // Utiliser l'ID trouvé
            formationId: user.formationId,
            amount: user.amount, // Montant spécifié en centimes
            billingDate: user.billingDate, // Date de facturation, doit être un objet Date valide
            line1: user.line1, // Rue et numéro
            line2: user.line2, // Complément d'adresse
            city: user.city, // Ville
            postalCode: user.postalCode, // Code postal
            state: user.state, // État ou région
            country: user.country // Pays
        }
    });
    return billingEntry;
}


const billingModel = {
    newBilling
};

export default billingModel;