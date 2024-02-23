'use client'
import IsFreeButton from "./isFreeButton";
import { useState } from "react";

export default function Lesson({ lessonData }) {
    // Fonction pour formater le numéro (id ou autre numéro séquentiel) avec un zéro devant si nécessaire
    const formatNumber = (number) => number < 10 ? `0${number}` : number;
    return (
        <div className=" pl-2 pr-2 pt-1 pb-1 relative">
            <div className="group flex flex-row items-center justify-between gap-x-3 rounded-lg w-full h-[50px] p-3 relative overflow-hidden">
                <div className="absolute left-0 top-0 w-0 h-full bg-[#1A1A1A] transition-all duration-300 ease-in-out group-hover:w-full"></div>
                <div className="flex flex-row justify-center items-center gap-x-5 z-10">
                    <div className="w-[20px] h-[20px] border border-1 border-[#838383] rounded-full"></div>
                    <span className="text-md text-[#838383] z-10 relative">{formatNumber(lessonData.id)}. {lessonData.title}</span>
                </div>
                <div className="z-10 relative">
                    <span className="text-md text-[#5A5A5A]">35:24</span>
                </div>
            </div>
            <div className="absolute right-0 top-0">
                {lessonData.isFree && <IsFreeButton />}
            </div>
        </div>
    );
}
