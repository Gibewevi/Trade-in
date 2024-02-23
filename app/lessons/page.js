import SidebarLesson from "../components/lesson/sidebarLesson/SidebarLesson";

export default function Page() {
    return (
        // Utilisez `flex` pour disposer la sidebar et le contenu principal côte à côte
        <div className="flex pt-[80px] w-full bg-[##242424]">
            <SidebarLesson />
            <div className="text-slate-100 text-2xl mx-auto h-[2000px]">Contenu Principal</div>
        </div>
    );
}
