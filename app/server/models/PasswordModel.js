import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Fonction pour enregistrer le jeton de réinitialisation dans la base de données
const generateResetToken = async (userId) => {
  const uuid = uuidv4();
  const expiresAt = new Date(Date.now() + 3600000); // 1 heure de validité

  try {
    const resetToken = await prisma.passwordResetToken.create({
      data: {
        uuid,
        userId,
        expiresAt,
      },
    });
    return resetToken;
  } catch (error) {
    console.error("Erreur lors de la création du jeton de réinitialisation :", error);
    throw error;
  }
};

const passwordModel = {
  generateResetToken,
};

export default passwordModel;
