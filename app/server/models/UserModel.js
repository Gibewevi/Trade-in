import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

// Fonction qui récupère isVerified de la table user par l'email
const isAccountVerified = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        isVerified: true,
      },
    });
    return user ? user.isVerified : false;
  } catch (error) {
    console.error("Error checking if account is verified:", error);
    throw error;
  }
};

// Fonction pour vérifier que l'utilisateur existe par son email
const findUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

const addNewUser = async (user) => {
  console.log('user model : ', user);
  try {
    // Crée un nouvel utilisateur dans la base de données
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
      }
    });
    return newUser;
  } catch (error) {
    console.error("Error adding new user:", error);
    // Gérer l'erreur ou la relancer selon les besoins de votre application
    throw error;
  }
};
const userModel = {
 addNewUser,
 findUserByEmail,
 isAccountVerified
};

export default userModel;