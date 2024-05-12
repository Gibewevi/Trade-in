const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import userController from '@/app/server/controllers/UserController';
import mailController from '@/app/server/controllers/MailController';
import billingController from '@/app/server/controllers/BillingController';

export async function POST(request) {
    const event = await request.json();

    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                const customerId = paymentIntent.customer;
                const customer = await stripe.customers.retrieve(customerId);
                const customerAddress = customer.address; // Utiliser l'adresse du client Stripe

                // Montant de la transaction
                const amount = paymentIntent.amount; // Montant en centimes
                console.log('amount : ', amount);
                // Création du password
                const { initialPassword, hashedPassword } = await userController.createInitialPassword();
                console.log('usinitialPassworder : ', initialPassword);
                console.log('hashedPassword : ', hashedPassword);
                console.log('customer : ', customer);
                // Envoi de l'utilisateur à la BDD
                const user = {
                    password: hashedPassword,
                    email: customer.email,
                    name: customer.name, // Utiliser le nom du client Stripe si disponible
                    line1: customerAddress.line1,
                    line2: customerAddress.line2,
                    city: customerAddress.city,
                    postalCode: customerAddress.postal_code,
                    state: customerAddress.state,
                    country: customerAddress.country,
                    formationId: 1,
                    billingDate: new Date(),
                    amount: amount
                };
                console.log('user : ', user);
                // Ajouter l'utilisateur dans la base de données
                const userRegister = await userController.addNewUser(user);
                console.log('userRegister : ', userRegister);
                // Ajouter la facture dans la base de données
                const billingEntry = await billingController.newBilling(user);
                console.log('billingEntry : ', billingEntry);
                // Envoi de l'email
                const mail = await mailController.sendStartPassword(user.email, initialPassword);
                break;

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
