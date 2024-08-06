import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

// Fonction pour modifier son mot de passe par userId
const setPasswordByUserId = async (userId, hashedPassword) => {
  try {
    // Mettre à jour le mot de passe dans la base de données
    const user = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { success: true, message: 'Password updated successfully.', user };
  } catch (error) {
    console.error('Error updating password:', error);
    return { success: false, message: 'Failed to update password.' };
  }
};

// Récupérer l'utilisateur par son ID
const getUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
};

const setEmailByUserId = async (userId, email) => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { email: email }
    });
    return user;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'email:', error);
    throw new Error('La mise à jour de l\'email a échoué.');
  }
};

// Fonction qui valide ou non le compte de l'utilisateur
const setAccountVerified = async (email, isVerified) => {
  return await prisma.user.update({
    where: { email: email },
    data: { isVerified: isVerified },
  });
}

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
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
      }
    });
    return newUser;
  } catch (error) {
    console.error("Error adding new user:", error);
    throw error;
  }
};


const userModel = {
  addNewUser,
  findUserByEmail,
  isAccountVerified,
  setAccountVerified,
  setEmailByUserId,
  getUserById,
  setPasswordByUserId

};

export default userModel;