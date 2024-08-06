const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import userController from '@/app/server/controllers/UserController';
import mailController from '@/app/server/controllers/MailController';
import invoiceController from '@/app/server/controllers/InvoiceController';

export async function POST(request) {
    const event = await request.json();

    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                console.log('payment_intent.succeeded');
                const paymentIntent = event.data.object;
                const customerId = paymentIntent.customer;
                const customer = await stripe.customers.retrieve(customerId);
                const amount = paymentIntent.amount; 
                const { initialPassword, hashedPassword } = await userController.createInitialPassword();
                const user = {
                    password: hashedPassword,
                    email: customer.email,
                };
                console.log('user : ',user);
                const userRegister = await userController.addNewUser(user);
                console.log('userRegister : ',userRegister)
                const mail = await mailController.sendStartPassword(user.email, initialPassword);
                console.log('mail : ', mail);
                const invoice = await invoiceController.newInvoice(customer.metadata);
                console.log('invoice : ', invoice);
                break;

            default:
                console.log(`Type d'événement non géré ${event.type}`);
        }
    } catch (error) {
        console.error('Erreur lors du traitement du webhook Stripe:', error);
        return new Response(JSON.stringify({ error: 'Le gestionnaire de webhook a échoué' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ received: true }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
