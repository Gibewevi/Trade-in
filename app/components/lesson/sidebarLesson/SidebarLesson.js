'use client'
import SidebarToggle from "./SidebarToggle";
import { useState } from "react";

export default function SidebarLesson({children}) {
    const [isToggled, setIsToggled] = useState(true);
    const toggleMenu = () => {
        setIsToggled(!isToggled);
    };
    return (
        <div className={`fixed top-[90px] left-0 z-10 w-[480px] h-screen transition duration-500 ease-in-out ${isToggled ? 'translate-x-[-430px]' : 'translate-x-0'}`}>
            <div className="flex flex-row w-full h-full">
                <div className="w-[430px] h-full bg-[#0E0E0E] rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                        <div className="pr-2">
                            {children}
                        </div>
                    </div>
                </div>
                <SidebarToggle toggleMenu={toggleMenu} setIsToggled={setIsToggled} isToggled={isToggled}/>
            </div>
        </div>
    );
}
