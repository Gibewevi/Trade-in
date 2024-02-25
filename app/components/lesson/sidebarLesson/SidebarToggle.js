// Dans SidebarToggle.js
import HamburgerToArrow from './HamburgerToArrow';

export default function SidebarToggle({ toggleMenu, isToggled }) {
    return (
        <div onClick={toggleMenu} className="group w-[50px] h-[50px] bg-[#1A1A1A] rounded-tr-xl rounded-br-xl mt-[12px] flex justify-center items-center drop-shadow-2xl overflow-hidden">
            <div className="absolute left-0 top-0 w-0 h-full bg-[#262626] transition-all duration-300 ease-in-out group-hover:w-full"></div>
            <HamburgerToArrow isToggled={isToggled} />
        </div>
    );
}
