import deviseModel from "../models/DeviseModel";

async function getCountryNameByCountryCode(countryCode) {
    const countryName = await deviseModel.getCountryNameByCountryCode(countryCode);
    return countryName;
}
// Contrôleur utilisateur
const deviseController = {
    getCountryNameByCountryCode,
};

export default deviseController;
