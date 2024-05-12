import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
 // Remplacez cette constante par un calcul du montant de la commande
 return 9500;
};

export async function POST(request) {
 try {
    const { items, email } = await request.json();
    
    // Créez un client Stripe avec l'email de l'utilisateur
    const customer = await stripe.customers.create({
      email: email,
    });

    // Utilisez l'ID du client pour le PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      customer: customer.id, // Utilisez l'ID du client ici
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
    });
 } catch (error) {
    console.error('Erreur:', error);
    return new Response(JSON.stringify({ error: "Une erreur est survenue." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      },
    });
 }
}
