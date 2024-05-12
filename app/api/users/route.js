import userController from "@/app/server/controllers/UserController";

export async function POST(request) {
  console.log('user api');
  try {
    // Parsez le corps de la requête pour obtenir les données utilisateur.
    const userData = await request.json();
    console.log('route user : ');
    console.log('user : ', userData);
    // Ajoutez l'utilisateur avec les données reçues.
    const newUser = await userController.addNewUser(userData);
    console.log('new user : ', newUser);
    // Répondez avec le nouvel utilisateur ajouté.
    return new Response(JSON.stringify(newUser), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.error('Erreur:', error);
    return new Response(JSON.stringify({ error: "Une erreur est survenue lors de l'ajout de l'utilisateur." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
}
