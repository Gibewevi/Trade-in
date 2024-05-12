// Importation des dépendances nécessaires
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';


// Création des instances pour Prisma et OpenAI
const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


export async function POST(request) {
  try {
    // Parse le corps de la requête pour obtenir l'ID de la catégorie
    const { categoryId } = await request.json();
    console.log('category : ', categoryId);
    // Récupérer le prompt de la catégorie dans la base de données
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    // Vérifier si la catégorie existe et a un prompt défini
    if (!category || !category.prompt) {
      throw new Error("Catégorie non trouvée ou prompt non défini.");
    }

    // Générer l'article avec OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      prompt: category.prompt,
      max_tokens: 100,
    });

    // Sauvegarder l'article généré dans la base de données
    const newArticle = await prisma.article.create({
      data: {
        title: `Nouvel Article sur ${category.name}`,
        content: response.data.choices[0].text,
        htmlContent: "", // Vous pouvez convertir le contenu en HTML ici si nécessaire
        categoryId: category.id,
        publishedAt: new Date(),
      },
    });

    // Répondre avec le nouvel article
    return new Response(JSON.stringify(newArticle), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.error('Erreur:', error);
    return new Response(JSON.stringify({ error: "Une erreur est survenue lors de la génération de l'article." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
}
