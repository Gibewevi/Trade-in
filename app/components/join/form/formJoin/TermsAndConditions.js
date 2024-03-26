'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
export default function TermsAndConditions({props}) {
    const [isCheck, setIsCheck] = useState(true);

    useEffect(() => {
        console.log("isCheck a été mis à jour:", isCheck);
    }, [isCheck]);

    const isCheckToggle = (event) => {
        event.stopPropagation();
        setIsCheck(prevIsCheck => !prevIsCheck);
    };
    return (
        <>
            <div className="flex items-center">
                <input type="checkbox" id="terms" className="hidden" checked={isCheck} readOnly />
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
                        <button type='submit' onClick={props.handleSubmit} className="group w-[90px] h-[55px] bg-[#705DF2] p-4 rounded-lg flex justify-center items-center absolute right-0 overflow-hidden">
                            <div className="absolute left-0 top-0 w-0 h-full bg-[#8b7bf3] transition-all duration-300 ease-in-out group-hover:w-full"></div>
                            <span className="z-10 text-slate-100 text-md font-bold">suivant</span>
                        </button>
                    </Link>
                }

            </div>
        </>
    );
}
