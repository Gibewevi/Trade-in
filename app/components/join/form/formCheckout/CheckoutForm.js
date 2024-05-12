'use client'
import userService from "@/app/service/user";
import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    // Rendre la fonction asynchrone pour utiliser await à l'intérieur
    
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/confirmation",
      },
    });


    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="p-5 flex flex-col relative">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <div className="flex flex-row gap-x-5 mt-5">
        <div className="flex flex-row">
          <div>
            <button disabled={isLoading || !stripe || !elements} id="submit" className="absolute group w-[150px] h-[60px] bg-[#8b7bf3] p-4 rounded-xl flex justify-center items-center overflow-hidden relative">
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span className="z-10 font-bold">Pay USD 95.00</span>
              )}
              <div className="absolute left-0 top-0 w-0 h-full bg-[#705DF2] transition-all duration-300 ease-in-out group-hover:w-full"></div>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message" className="text-red-500">{message}</div>}
          </div>
        </div>
      </div>
    </form>
  );
}