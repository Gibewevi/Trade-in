import billingModel from "../models/BillingModel";

async function saveBillingInfo(user){
    const billing = await billingModel.saveBillingInfo(user);
    return billing;
}
// Contrôleur utilisateur
const billingController = {
    saveBillingInfo
};

export default billingController;
