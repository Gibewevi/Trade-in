'use client'
import HamburgerToArrow from './HamburgerToArrow';

export default function SidebarToggle({ toggleMenu }) {
    return (
        <div onClick={toggleMenu} className="w-[50px] h-[50px] bg-[#262626] rounded-tr-xl rounded-br-xl mt-[12px] flex justify-center items-center">
            <HamburgerToArrow />
        </div>
    );
}
