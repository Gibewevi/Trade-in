"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import FormInvestmentSuscription from "../components/subscription/form/formInvestmentSubscription/FormInvestmentSubscription";
import Checkout from "../components/subscription/form/formCheckout/Checkout";

export default function Page() {
    const [stepJoin, setStepJoin] = useState('join');
    const [email, setEmail] = useState();

    const handleSetStepJoin = (stepJoin) => {
        setStepJoin(stepJoin);
    }

    const handleJoin = (email) => {
        // s'execute bien une seule fois
        setEmail(email);
        setStepJoin('checkout');
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-slate-200">
            <FormInvestmentSuscription handleJoin={handleJoin} stepJoin={stepJoin} handleSetStepJoin={handleSetStepJoin} email={email}/>
        </div >
    );
}
