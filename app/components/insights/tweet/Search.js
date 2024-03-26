"use client"
import { useState } from "react";
import tweet from "@/app/service/tweet";

export default function Search({tweetsList, setTweetsList}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [tweetsSearch, setTweetsSearch] = useState('');
    const handleClick = () => {
        setIsExpanded(true);
    };

    const handleInputChange = async (event) => {
        setTweetsSearch(event.target.value); // Mise à jour de l'état avec la valeur actuelle de l'input
    };

    const handleInputResearch = async() => {
        const tweets = await tweet.getTweetBycontent(tweetsSearch); 
        setTweetsList(tweets);
    };
    return (
        <div className={`${isExpanded ? 'w-[400px] scale-125 ml-[30px]' : 'w-[45px]'} group flex items-center justify-start transition-all duration-300 ease-in-out hover:scale-125 h-[45px] bg-slate-50 rounded-full p-2 shadow-xl overflow-hidden`}>
            {isExpanded  ? <img onClick={handleInputResearch} src="/images/CarbonSearch.svg" className="w-[28px] cursor-pointer"/> : <img onClick={handleClick} src="/images/CarbonSearch.svg" className="w-[28px] cursor-pointer" />}
            <input 
                placeholder="exemple : pixelcoin BTC" 
                className="bg-slate-50 w-full pl-5 text-[#CAC1F6] focus:outline-none" 
                value={tweetsSearch} // Liaison de la valeur de l'input à l'état
                onChange={handleInputChange} // Ajout du gestionnaire d'événements onChange
            />
        </div>
    )
}
