import Chapter from "./Chapter";
import SidebarToggle from "./SidebarToggle"

export default function SidebarLesson() {
    return (
        <div className="w-[480px] h-screen absolute left-0 mt-3 ml-3">
            <div className="flex flex-row w-full h-full">
                <div className="w-[430px] h-full bg-[#0E0E0E] relative">
                    <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                        <div className="pr-2">
                            <Chapter></Chapter>
                            <Chapter></Chapter>
                        </div>
                    </div>
                </div>
                <div className="w-[50px] h-[50px] bg-[#262626] rounded-tr-xl rounded-br-xl mt-[12px]"></div>
            </div>
        </div>
    );
}
