import billingController from '@/app/server/controllers/BillingController';
import invoiceController from '@/app/server/controllers/InvoiceController';
import userController from '@/app/server/controllers/UserController';
import jwtController from '@/app/server/controllers/JwtController';
import cookie from 'cookie'; // Importer la bibliothèque de gestion des cookies

export async function POST(request) {
  try {
    console.log('billing register');
    //vérifier le token jwt pour récupérér le mail de l'utilisateur
    const { billingRegisterJWT } = cookie.parse(request.headers.get('cookie') || '');
    const userTokenVerified = jwtController.verifyJWTVerifiedAccount(billingRegisterJWT);
    const user = await userController.getUserByEmail(userTokenVerified.email);

    const billingData = await request.json();
    console.log('Received billing data:', billingData);

    // Enregistre le formulaire adresse par l'email 
    const savedBilling = await billingController.saveBillingInfo(billingData);
    if (!savedBilling) {
      throw new Error('Failed to save billing information');
    }
    const invoiceData = await invoiceController.getFirstInvoiceByUserId(user.id);


    // vérifier le pays et la province pour vérifier le calcul des taxes
    const BillingMatchInvoice = await invoiceController.UpdateInvoiceTaxByBillingRegister(invoiceData, billingData);

    // Valide le profil de l'utilisateur
    const accountVerified = await userController.setAccountVerified(billingData.email, true);
    if (!accountVerified) {
      throw new Error('Failed to verify account');
    }

    // creer le token et retourner le cookie sécurisé
    const jwtCookie = jwtController.createJWTtoken(user, 'loginJWT', 3600);
    // Ajouter le cookie à l'en-tête de la réponse
    const responseHeaders = {
      'Content-Type': 'application/json',
      'Set-Cookie': jwtCookie // Ajouter le cookie à l'en-tête Set-Cookie
    };

    // Retourne dans la réponse l'email, et le accountVerified
    return new Response(
      JSON.stringify({
        email: billingData.email,
        accountVerified: true,
      }),
      {
        status: 200,
        headers: responseHeaders,
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
