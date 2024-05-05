import billingModel from "../models/BillingModel";

async function newBilling(user){
    const billing = await billingModel.newBilling(user);
}
// Contrôleur utilisateur
const billingController = {
    newBilling
};

export default billingController;
