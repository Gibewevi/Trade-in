import passwordModel from "../models/PasswordModel";

const generateResetToken = async (userId) => {
    const token = await passwordModel.generateResetToken(userId);
    return token.uuid;
};
// Contrôleur utilisateur
const passwordController = {
    generateResetToken
};

export default passwordController;
