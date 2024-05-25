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

const deviseModel = {
    getCurrencyByCountryCode
};

export default deviseModel;
