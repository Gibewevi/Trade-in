'use client';
import Link from "next/link";

export default function Invoice() {

    return (
        <div className='flex flex-col p-4 gap-y-6'>
            <div className="">
                <h1 className="text-slate-800 text-2xl font-semibold">Invoice</h1>
                <span className="text-slate-800">Les factures sont disponibles en Français et en Anglais</span>
            </div>

            <div className="flex flex-row justify-between items-center gap-x-1  p-2 rounded-lg bg-slate-100 shadow-xl">
                <div>
                    <span className="text-slate-800 text-lg font-semibold">Formation <span className="font-bold text-lg">INVESTISSEMENT</span></span>
                </div>
                <div className="flex flex-row gap-x-2">
                    <Link href="/account/invoice/investment/fr" >
                        <button className='bg-slate-800 text-slate-200 w-[40px] h-[40px] rounded-xl font-bold'><span className='text-sm'>FR </span></button>
                    </Link>
                    <button className='bg-slate-800 text-slate-200 w-[40px] h-[40px] rounded-xl font-bold'><span className='text-sm'>GB </span></button>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center p-3 w-full h-[90px] bg-gradient-to-r from-[#705DF2] to-blue-400 rounded-xl text-slate-100 p-6">
                <div className="w-[80px] p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 32 32">
                        <path fill="none" d="M16 8a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 8m4 13.875h-2.875v-8H13v2.25h1.875v5.75H12v2.25h8Z" />
                        <path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 6a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 8m4 16.125h-8v-2.25h2.875v-5.75H13v-2.25h4.125v8H20Z" />
                    </svg>
                </div>
                <span className="p-3">
                    Vos coordonnées peuvent être mises à jour via la page <strong><u>Billing</u></strong> du compte.
                </span>
            </div>

            <div className="flex flex-row items-center p-3 w-full bg-gradient-to-r from-[#705DF2] to-blue-400 rounded-xl text-slate-100 p-6">
                <div className="w-[80px] p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 32 32">
                        <path fill="none" d="M16 8a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 8m4 13.875h-2.875v-8H13v2.25h1.875v5.75H12v2.25h8Z" />
                        <path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 6a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 16 8m4 16.125h-8v-2.25h2.875v-5.75H13v-2.25h4.125v8H20Z" />
                    </svg>
                </div>
                <div className="flex flex-col justify-center gap-y-2">
                    <span>
                        Si vous avez besoin d'un PDF
                    </span>
                    <div className="flex flex-col gap-y-1">
                        <span className="before:content-['•'] before:mr-2">Ouvrez le lien</span>
                        <span className="before:content-['•'] before:mr-2">Demandez à l'imprimer (CTRL + P)</span>
                        <span className="before:content-['•'] before:mr-2">Choisissez "Enregistrer sous" au lieu de votre imprimante</span>
                    </div>
                </div>

            </div>

        </div>
    );
}
