'use client'
import Link from 'next/link';
import IsFreeButton from "./isFreeButton";

export default function Lesson({ lessonData, lessonActive }) {
    // Fonction pour formater le numéro (id ou autre numéro séquentiel) avec un zéro devant si nécessaire
    const formatNumber = (number) => number < 10 ? `0${number}` : number;
    const isActive = lessonData.slug == lessonActive;

    return (
        <div className=" pl-2 pr-2 pt-1 pb-1 relative">
            <Link href={`/lessons/${lessonData.slug}`} passHref>
                <div className="group flex flex-row items-center justify-between gap-x-3 rounded-lg w-full h-[50px] p-3 relative overflow-hidden">
                    <div className="absolute left-0 top-0 w-0 h-full bg-[#1A1A1A] transition-all duration-300 ease-in-out group-hover:w-full"></div>
                    <div className="flex flex-row  items-center gap-x-3 z-10">
                        {isActive ?
                            <div className="w-[35px] h-[35px] flex justify-center items-center">
                                <img src='/images/CarbonPlayFilled.svg' className="w-[35px]" />
                            </div>
                            :
                            <div className="w-[35px] h-[35px] flex justify-center items-center">
                                <div className="w-[20px] h-[20px] border border-1 border-[#838383] rounded-full"></div>
                            </div>
                        }
                        <span className={`${isActive ? "text-md text-[#FFFFFF] z-10 relative" : "text-[#838383] "}`}>{formatNumber(lessonData.id)}. {lessonData.title}</span>
                    </div>
                    <div className="z-10 relative">
                        <span className="text-md text-[#5A5A5A]">35:24</span>
                    </div>
                </div>
                <div className="absolute right-0 top-0">
                    {lessonData.isFree && <IsFreeButton />}
                </div>
            </Link>
        </div>
    );
}
