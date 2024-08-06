'use client'
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
console.log('stripePromise : ', stripePromise);

export default function Checkout({ email, handleSetStepJoin  }) {
  const [stripeIsLoaded, setStripeIsLoaded] = useState(false);
  const [coursePrice, setCoursePrice] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencyCode, setCurrencyCode] = useState(null);

  useEffect(() => {
    if (!email || clientSecret) return;

    console.log("Creating PaymentIntent");
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: "xl-tshirt" }],
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setConvertedAmount(data.convertedAmount);
        setCurrencyCode(data.currencyCode);
        setStripeIsLoaded(true);
        setCoursePrice(data.coursePrice);
        console.log('clientSecret : ', clientSecret);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, [email, clientSecret]);


  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <div className={`flex justify-center items-center ${stripeIsLoaded ? '' : 'h-[500px]'}`}>

        {stripeIsLoaded ? (
          clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm convertedAmount={convertedAmount} currencyCode={currencyCode} coursePrice={coursePrice} handleSetStepJoin={handleSetStepJoin}/>
            </Elements>
          )
        ) : (
          <div className="flex flex-col justify-center items-center gap-y-4">
            <div className="animate-spin rounded-full h-[40px] w-[40px] border-t-4 border-blue-500 mr-2"></div>
            <span className="text-slate-800 text-lg">Veuillez patienter...</span>
          </div>
        )}
      </div>
    </>

  );
}