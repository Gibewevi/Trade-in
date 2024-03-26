'use client'
import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();


  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
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
    <form id="payment-form" onSubmit={handleSubmit} className="p-5 flex flex-col">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <div className="flex flex-row gap-x-5 mt-5">
        <div className="flex flex-row">
          <div>

          <button disabled={isLoading || !stripe || !elements} id="submit" className="group h-[60px] bg-[#8b7bf3] p-4 rounded-xl flex justify-center items-center overflow-hidden relative">
            <div className="absolute left-0 top-0 w-0 h-full bg-[#705DF2] transition-all duration-300 ease-in-out group-hover:w-full"></div>
            <span id="button-text" className="z-10 font-bold">
              {isLoading ? <div className="spinner" id="spinner"></div> : "Pay USD 95.00"}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && <div id="payment-message" className="text-red-500">{message}</div>}
        </div>
        </div>
      </div>
    </form>
  );
}