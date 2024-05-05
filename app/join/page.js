"use client"
import { useState, useEffect } from "react";
import FormJoin from "../components/join/form/formJoin/FormJoin";
import HeaderJoin from "../components/join/form/formJoin/HeaderJoin";
import Checkout from "../components/join/form/formCheckout/Checkout";
export default function Page() {
    const [stepJoin, setStepJoin] = useState('join');
    const [email, setEmail] = useState();

    const handleJoin = (email) => {
        setEmail(email);
        setStepJoin('checkout');
    };
    
    return (
        <div className="flex items-center justify-center w-full h-screen bg-slate-200">
            <div className="flex flex-col w-[500px] min-h-[500px] shadow-2xl rounded-2xl overflow-hidden duration-200 transition-all ease-in-out ">
                <HeaderJoin />
                {stepJoin == 'join' ? <FormJoin handleJoin={handleJoin} /> : <Checkout email={email}/>}
            </div>
        </div>
    );
}
