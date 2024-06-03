import billingController from '@/app/server/controllers/BillingController';
import userController from '@/app/server/controllers/UserController';
import cookie from 'cookie'; // Importer la bibliothèque de gestion des cookies

export async function POST(request) {
  try {
    const billingData = await request.json();
    console.log('Received billing data:', billingData);
    
    // Enregistre le formulaire adresse par l'email
    const savedBilling = await billingController.saveBillingInfo(billingData);
    if (!savedBilling) {
      throw new Error('Failed to save billing information');
    }

    // Valide le profil de l'utilisateur
    const accountVerified = await userController.setAccountVerified(billingData.email, true);
    if (!accountVerified) {
      throw new Error('Failed to verify account');
    }

    // Retourne dans la réponse l'email, et le accountVerified
    return new Response(
      JSON.stringify({
        email: billingData.email,
        accountVerified: true,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    // Gérer les exceptions éventuelles, comme les erreurs de serveur
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: 'Server error',
        error: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
