import billingController from '@/app/server/controllers/BillingController';
import invoiceController from '@/app/server/controllers/InvoiceController';
import userController from '@/app/server/controllers/UserController';
import deviseController from '@/app/server/controllers/DeviseController';
import jwtController from '@/app/server/controllers/JwtController';
import cookie from 'cookie'; // Importer la bibliothèque de gestion des cookies

// Récupère l'utilisateur à partir de la requête
async function getUserFromRequest(request) {
  const { billingRegisterJWT } = cookie.parse(request.headers.get('cookie') || '');
  const verifiedUserToken = jwtController.verifyJWTVerifiedAccount(billingRegisterJWT);
  const user = await userController.getUserByEmail(verifiedUserToken.email);
  console.log('user', user);
  return user;
}

// Enregistre les informations de facturation
async function saveBillingInformation(billingData) {
  const savedBilling = await billingController.saveBillingInfo(billingData);
  if (!savedBilling) {
    throw new Error('Failed to save billing information');
  }
}

// Vérifie le compte utilisateur
async function setAccountVerified(email) {
  const accountVerified = await userController.setAccountVerified(email, true);
  if (!accountVerified) {
    throw new Error('Failed to verify account');
  }
}

// Crée la réponse HTTP avec les données et le cookie JWT
function createResponse(data, jwtCookie) {
  return new Response(
    JSON.stringify(data),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': jwtCookie,
      },
    }
  );
}

// Crée la réponse HTTP en cas d'erreur
function createErrorResponse(error) {
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

export async function POST(request) {
  try {
    // Récupère l'utilisateur à partir de la requête
    const user = await getUserFromRequest(request);

    // Récupère les données de facturation du corps de la requête
    const billingData = await request.json();
    console.log('billing data api : ', billingData);
    //récupérer le billingState grace au billing Country.
    const countryName = await deviseController.getCountryNameByCountryCode(billingData.country);
    billingData.state = countryName;
    console.log('billing save info : ', billingData);

    // Enregistre les informations de facturation
    await saveBillingInformation(billingData);

    // Récupère la première facture de l'utilisateur
    const invoiceData = await invoiceController.getFirstInvoiceByUserId(user.id);

    // Met à jour les taxes de la facture en fonction des informations de facturation
    await invoiceController.UpdateInvoiceTaxByBillingRegister(invoiceData, billingData);

    // Vérifie le compte utilisateur
    await setAccountVerified(billingData.email);

    // Crée le cookie JWT pour l'utilisateur
    const jwtCookie = jwtController.createJWTtoken(user, 'loginJWT', 3600);

    // Prépare les en-têtes de réponse
    const responseHeaders = {
      'Content-Type': 'application/json',
      'Set-Cookie': jwtCookie // Ajouter le cookie à l'en-tête Set-Cookie
    };

    // Retourne la réponse HTTP avec l'email et le statut de vérification du compte
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
    // Gère les exceptions éventuelles, comme les erreurs de serveur
    return createErrorResponse(error);
  }
}
