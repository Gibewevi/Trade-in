"use client"
import { useState, useEffect } from "react";
import FormJoin from "../components/join/form/formJoin/FormJoin";
import HeaderJoin from "../components/join/form/formJoin/HeaderJoin";
import Checkout from "../components/join/form/formCheckout/Checkout";
export default function Page() {
    const [stepJoin, setStepJoin] = useState('join');
    const [email, setEmail] = useState();

    const handleJoin = (email) => {
        // s'execute bien une seule fois
        console.log("Setting email:", email);
        setEmail(email);
        setStepJoin('checkout');
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-slate-200">
            <div className="flex flex-col w-[400px] shadow-xl bg-slate-100 rounded-xl p-7 gap-y-9">
                <div className="flex flex-col w-full">
                    <span className="text-sm text-slate-700 font-black">BITLEARN*</span>
                    <span className="text-xl text-slate-700 font-black">INVESTISSEMENT</span>
                </div>
                <div className="w-full flex flex-col gap-y-0 border-b border-gray-500 pb-5">
                    <span className="text-6xl text-slate-700 font-black">249$</span>
                    <span className="text-md text-slate-700 font-bold">one time investment</span>
                </div>


                <div className="flex flex-col gap-y-3 p-2">
                    <div className="flex flex-row items-center gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="#334155" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z" /><path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" /></svg>
                        <span className="text-slate-800"> Formation de base</span>
                    </div>

                    <div className="flex flex-row items-center gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="#334155" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z" /><path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" /></svg>
                        <span className="text-slate-800"> Accompagnement régulier</span>
                    </div>

                    <div className="flex flex-row items-center gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="#334155" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z" /><path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" /></svg>
                        <span className="text-slate-800"> Accès discord privé</span>
                    </div>

                    <div className="flex flex-row items-center gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="#334155" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z" /><path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" /></svg>
                        <span className="text-slate-800"> Outils de backtesting (à venir)</span>
                    </div>
                    <div className="flex flex-row items-center gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="#334155" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z" /><path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" /></svg>
                        <span className="text-slate-800">Journal de trading (à venir)</span>
                    </div>
                </div>

                <button className="bg-slate-800 text-slate-100 font-black rounded-xl h-[50px] text-lg"> Suivant </button>
            </div>
            {/* <div className="flex flex-col w-[500px] min-h-[500px] shadow-2xl rounded-2xl overflow-hidden duration-200 transition-all ease-in-out ">
                <HeaderJoin />
                {stepJoin == 'join' ? <FormJoin handleJoin={handleJoin} /> : <Checkout email={email}/>}
            </div> */}
        </div>
    );
}
