import Stripe from "stripe";
import userController from "@/app/server/controllers/UserController";
import invoiceController from "@/app/server/controllers/InvoiceController";
import courseController from "@/app/server/controllers/CourseController";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { items, email } = await request.json();
  const courseId = 1;
  const coursePrice = await courseController.getCoursePriceById(courseId);
  console.log('coursePrice : ', coursePrice);

  //récupérer le prix de la formation par son id;
  // Récupérer l'adresse IP du client
  // const ipAddress = request.headers.get('X-Forwarded-For') || request.socket.remoteAddress;
  const ipAddress = "70.26.181.114";

  try {

    const { convertedAmount, exchangeRate, countryCode, currencyCode, regionCode, countryName } = await invoiceController.getExchangeRateAndPriceByIp(ipAddress, coursePrice);

    // const convertedAmount = 131.36;
    // const exchangeRate = 1.3827202641;
    // const countryCode = 'CA';
    // const currencyCode = 'CAD';
    // const regionCode = 'QC';

    // console.log('exchangeRate : ', exchangeRate);
    // console.log('countryCode : ', countryCode);
    // console.log('currencyCode : ', currencyCode);
    // console.log('regionCode : ', regionCode);
    console.log('countryName : ', countryName);
  
    const customer = await stripe.customers.create({
      email: email,
      metadata: {
        email: email.toString(),
        courseId: courseId.toString(),
        amount: coursePrice.toString(),
        amountDevise: convertedAmount.toString(),
        exchangeRate: exchangeRate.toString(),
        countryCode: countryCode.toString(),
        countryName: countryName.toString(),
        regionCode: regionCode.toString(),
        currencyCode: currencyCode.toString(),
      }
    });
    console.log('customer : ', customer);
    //console.log('amount_devise : ', customer.metadata.amountDevise);
    //console.log('currencyCode : ', customer.metadata.currencyCode);
    //console.log('exchangeRate : ', customer.metadata.exchangeRate);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: coursePrice,
      currency: 'USD',
      customer: customer.id,
      setup_future_usage: "off_session",
      automatic_payment_methods: { enabled: true },
    });

    // console.log('paymentIntent: ', paymentIntent);
    const coursePriceInDollars = coursePrice / 100;
    //converti coursePrice avant de le retourner 
    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret, convertedAmount: convertedAmount, currencyCode: currencyCode, coursePrice: coursePriceInDollars }), {
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
