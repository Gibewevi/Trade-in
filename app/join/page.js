"use client"
import { useState, useEffect } from "react";
import FormJoin from "../components/join/form/formJoin/FormJoin";
import HeaderJoin from "../components/join/form/formJoin/HeaderJoin";
import Checkout from "../components/join/form/formCheckout/Checkout";
export default function Page() {
    const [stepJoin, setStepJoin] = useState('join');
    const [user, setUser] = useState();
    const handleJoin = (user) => {
        setUser(user);
        setStepJoin('checkout');
    };
    return (
        <div className="flex items-center justify-center w-full h-screen bg-slate-200">
            <div className="flex flex-col w-[500px] shadow-2xl rounded-2xl overflow-hidden">
            <HeaderJoin />
            { stepJoin == 'join' ?  <FormJoin handleJoin={handleJoin}/> : <Checkout />}
            </div>
        </div>
    );
}