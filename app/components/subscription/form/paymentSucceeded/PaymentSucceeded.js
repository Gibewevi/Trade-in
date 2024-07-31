'use client'
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "/public/json/check.json"; // Assurez-vous que le chemin est correct

export default function PaymentSucceeded() {
    const [animation, setAnimation] = useState(null);

    useEffect(() => {
        setAnimation(animationData);
    }, []);

    if (!animation) {
        return <div>Loading animation...</div>;
    }

    return (
        <div className="flex flex-col gap-y-5 justify-between items-center p-5">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-slate-700">Paiement Réussi !</h1>
                <Lottie
                    animationData={animation}
                    className="w-[200px] max-w-sm"
                    loop={false} // Désactive la boucle
                    speed={0.3}  // Réduit la vitesse à 50% de la vitesse normale
                />
            </div>
            <p className="text-md mt-4 text-slate-600">
                Un e-mail contenant vos identifiants et <strong>une invitation à notre Discord</strong> vous a été envoyé.
                <strong> Veuillez vérifier votre boîte de réception et les spams.</strong>
            </p>

            <p className="mt-4 text-slate-600">
                Si vous ne trouvez pas l'e-mail, vérifiez vos spams ou contactez notre support.
            </p>
            <button className="group h-[40px] bg-[#705DF2] p-4 rounded-xl flex gap-x-2 justify-center items-center overflow-hidden relative">
                <img src='/images/CarbonLogoDiscord.svg' className="w-[30px]" />
                <span className="z-10 text-slate-100 text-md font-bold">Invitation</span>
            </button>
        </div>
    );
}
