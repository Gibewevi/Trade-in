import Stripe from "stripe";
import userController from "@/app/server/controllers/UserController";
import invoiceController from "@/app/server/controllers/InvoiceController";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  // Récupérer l'adresse IP du client
  // const ipAddress = request.headers.get('X-Forwarded-For') || request.socket.remoteAddress;
  const ipAddress = "90.93.131.147";
  const amount = '9500';
  try {

    const { convertedAmount,exchangeRate,countryCode,currencyCode,regionCode } = await invoiceController.getExchangeRateAndPriceByIp(ipAddress, amount);

    const { items, email } = await request.json();
    const customer = await stripe.customers.create({
      email: email,
      metadata: {
        email: email.toString(),
        amount: amount.toString(),
        amountDevise: convertedAmount.toString(),
        exchangeRate: exchangeRate.toString(),
        countryCode: countryCode.toString(),
        regionCode: regionCode.toString(),
        currencyCode: currencyCode.toString(),
      }
    });

    console.log('amount_devise : ', customer.metadata.amountDevise);
    console.log('currencyCode : ', customer.metadata.currencyCode);
    console.log('exchangeRate : ', customer.metadata.exchangeRate);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'USD',
      customer: customer.id,
      setup_future_usage: "off_session",
      automatic_payment_methods: { enabled: true }
    });

    console.log('paymentIntent: ', paymentIntent);

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret, convertedAmount : convertedAmount, currencyCode : currencyCode }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Erreur:', error);
    return new Response(JSON.stringify({ error: "Une erreur est survenue." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
