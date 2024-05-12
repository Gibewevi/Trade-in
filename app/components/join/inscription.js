"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import Inscription from "../components/join/inscription";
import CheckoutForm from "../components/checkout/CheckoutForm";
export default function Page() {
    const [isCheck, setIsCheck] = useState(true);

    useEffect(() => {
        console.log("isCheck a été mis à jour:", isCheck);
    }, [isCheck]);

    const isCheckToggle = (event) => {
        event.stopPropagation();
        setIsCheck(prevIsCheck => !prevIsCheck);
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-slate-200">
            <div className="flex flex-col w-[500px] shadow-2xl rounded-2xl overflow-hidden">
                <div className="flex justify-center items-center w-full h-[100px] bg-[#705DF2]">
                    <span className="text-2xl text-slate-200 font-bold">Join</span>
                </div>
                <div className="flex flex-col w-full gap-y-8 bg-slate-100 p-[20px]">

                    <div className="flex flex-row gap-x-5 items-center justify-center p-3 w-full h-[80px] bg-slate-200 rounded-2xl">
                        <label className="text-slate-700 font-semibold w-[150px]">Email*</label>
                        <input className="w-full h-full bg-slate-200" placeholder="email@domain.com" />
                    </div>

                    <div class="w-full rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
                        <div className="flex flex-row gap-y-5 bg-slate-100 w-full h-full rounded-lg p-4">
                            <div className="flex flex-col items-center justify-center w-[90px]">
                                {/* <span className="text-slate-700 font-bold text-lg">Fondateur</span> */}
                                <span className="text-purple-600 font-bold text-xl">$94.99</span>
                            </div>
                            <div className="flex flex-col w-full justify-center items-center text-slate-800">
                                <div className="flex flex-row gap-x-3">
                                    <img src='/images/CarbonCheckmarkFilled.svg' className="w-[20px]" alt="Checked" />
                                    <span>formation compléte</span>
                                </div>
                                <div className="flex flex-row gap-x-3">
                                    <img src='/images/CarbonCheckmarkFilled.svg' className="w-[20px]" alt="Checked" />
                                    <span>accès discord privé</span>
                                </div>
                            </div>
                        </div>
                        <span className="text-slate-100 text-sm">payment en une seule fois (à vie)</span>
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" id="terms" className="hidden" checked={isCheck} />
                        <label htmlFor="terms" className="flex items-center cursor-pointer">
                            <span className="flex justify-center items-center w-[20px] h-[20px] inline-block mr-2 rounded border border-gray-300 bg-white shadow-sm" onClick={isCheckToggle}>
                                {isCheck && <img src='/images/CarbonCheckmark.svg' className="w-[20px]" alt="Checked" />}
                            </span>
                            <span className="text-slate-600" onClick={(event) => isCheckToggle(event)}>J'accepte les Conditions Générales de Vente et d'Utilisation.</span>
                        </label>
                    </div>
                    <div className="w-full h-[55px] relative">
                        {!isCheck ?
                            <div className="flex justify-center items-center bg-[#8b7bf3] w-[90px] h-[55px] rounded-lg absolute right-0">
                                <span className=" font-semibold">suivant</span>
                            </div>
                            :
                            <Link href="/checkout">
                                <button className="group w-[90px] h-[55px] bg-[#705DF2] p-4 rounded-lg flex justify-center items-center absolute right-0 overflow-hidden">
                                    <div className="absolute left-0 top-0 w-0 h-full bg-[#8b7bf3] transition-all duration-300 ease-in-out group-hover:w-full"></div>
                                    <span className="z-10 text-slate-100 text-md font-bold">suivant</span>
                                </button>
                            </Link>
                        }

                    </div>

                </div>
            </div>
        </div>
    );
}
