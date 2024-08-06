import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Récupère la devise associée à un code pays.
 * @param {string} countryCode - Le code pays.
 * @returns {Object} La devise correspondant au code pays.
 * @throws {Error} Si aucune devise n'est trouvée pour le code pays donné.
 */
async function getCurrencyByCountryCode(countryCode) {
    const currency = await prisma.devise.findFirst({ where: { countryCode } });
    if (!currency) throw new Error('Currency not found for the given country code');
    return currency;
}

async function getCountryNameByCountryCode(countryCode) {
    try {
        const country = await prisma.devise.findFirst({
            where: { countryCode },
            select: { country: true }
        });
        return country ? country.country : null;
    } catch (error) {
        console.error('Error fetching country name:', error);
        throw error;
    }
}

const deviseModel = {
    getCurrencyByCountryCode,
    getCountryNameByCountryCode
};

export default deviseModel;
