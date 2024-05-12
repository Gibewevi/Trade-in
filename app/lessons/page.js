import SidebarLesson from "../components/lesson/sidebarLesson/SidebarLesson";
import Chapters from "../components/lesson/sidebarLesson/Chapters";
export default function Page() {
    return (
        <div className="flex pt-[80px] w-full bg-slate-200">
            <SidebarLesson>
                <Chapters />
            </SidebarLesson>
            <div className="text-slate-100 text-2xl mx-auto h-[2000px]">Contenu Principal</div>
        </div>
    );
}
