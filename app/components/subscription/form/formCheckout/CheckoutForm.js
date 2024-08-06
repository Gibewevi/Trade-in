import React from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({ convertedAmount, currencyCode, handleSetStepJoin, coursePrice }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      console.log("Stripe.js hasn't yet loaded.");
      return;
    }
    console.log("Stripe.js has loaded.");
    console.log(stripe);
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    console.log('clientSecret : ', clientSecret);
    if (!clientSecret) {
      console.log("No client secret found in URL.");
      return;
    }

    console.log("Stripe and Elements are ready.");
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe.js hasn't yet loaded or Elements is not available.");
      return;
    }
    console.log("handleSetStepJoin:", handleSetStepJoin); // Ajout de cette ligne pour vérifier que setStepJoin est bien une fonction
    if (typeof handleSetStepJoin !== 'function') {
      console.error("handleSetStepJoin is not a function");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: 'if_required', // Ajoutez cette ligne
    });

    if (error) {
      console.error("Error during payment confirmation:", error);
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Payment succeeded:", paymentIntent);
      setMessage("Payment succeeded!");
      handleSetStepJoin('PaymentSucceeded');
    } else {
      console.log("Payment not succeeded or still processing:", paymentIntent);
      setMessage("Payment processing or incomplete.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="p-5 flex flex-col relative">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <div className="flex flex-row gap-x-5 mt-5 justify-end">
        <button disabled={isLoading || !stripe || !elements} id="submit" className="absolute group w-[210px] h-[45px] bg-slate-800 text-slate-100 font-black p-4 rounded-xl flex justify-center items-center overflow-hidden relative">
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <div className="flex flex-col">
              <span className="z-10 text-sm font-bold">Payer {coursePrice} USD</span>
              <span className="flex justify-end">
                <span className="z-10 text-xs font-bold">~ {currencyCode} {convertedAmount}</span>
              </span>
            </div>
          )}
          <div className="absolute left-0 top-0 w-0 h-full bg-[#705DF2] transition-all duration-300 ease-in-out group-hover:w-full"></div>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message" className="text-red-500">{message}</div>}
      </div>
    </form>
  );
}
