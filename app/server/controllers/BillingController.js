import billingModel from "../models/BillingModel";

async function setBillingByUserId(userId, billingData){
    const billingUpdated = await billingModel.setBillingByUserId(userId, billingData);
    return billingUpdated;
};

async function saveBillingInfo(user){
    const billing = await billingModel.saveBillingInfo(user);
    return billing;
}
// Contrôleur utilisateur
const billingController = {
    saveBillingInfo,
    setBillingByUserId
};

export default billingController;
