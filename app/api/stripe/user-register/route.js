const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import userController from '@/app/server/controllers/UserController';
export async function POST(request) {
    const event = await request.json();
    console.log('-------------------------- STRIPE ROUTE --------------------------');

    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                const customerId = paymentIntent.customer;
                console.log('customerId', customerId);
                const customer = await stripe.customers.retrieve(customerId);
                console.log('Customer email:', customer.email);
                // Actions post-paiement
                // creation du password
                const { initialPassword, hashedPassword } = await userController.createInitialPassword();

                console.log('initialPassword : ',initialPassword);
                console.log('hashedPassword : ',hashedPassword);
                // envoie du user a la BDD
                const user = {
                    password : hashedPassword,
                    email : customer.email
                };
                const userRegister = await userController.addNewUser(user);
                console.log('user : ', user);
                break;
            // Ajoutez d'autres cas au besoin
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.error('Error in Stripe webhook handling:', error);
        return new Response(JSON.stringify({ error: 'Webhook handler failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ received: true }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
