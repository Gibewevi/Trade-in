import { PrismaClient } from '@prisma/client';
import Chapter from "./Chapter";
import SidebarToggle from "./SidebarToggle";

const prisma = new PrismaClient();

export default async function SidebarLesson() {
    // Utilisation de `include` pour récupérer les leçons associées à chaque chapitre
    const chapters = await prisma.chapter.findMany({
        include: {
            lessons: true, // Inclut les leçons pour chaque chapitre
        },
    });


    return (
        <div className="fixed top-[80px] left-[10px] top-[90px] z-10 w-[480px] h-screen">
            <div className="flex flex-row w-full h-full">
                <div className="w-[430px] h-full bg-[#0E0E0E] rounded-xl relative">
                    <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                        <div className="pr-2">
                            {/* Itération sur les chapitres pour afficher chaque `Chapter` et passer les données nécessaires en props */}
                            {chapters.map((chapter) => (
                                <Chapter key={chapter.id} chapterData={chapter} />
                            ))}
                        </div>
                    </div>
                </div>
                <SidebarToggle /> 
            </div>
        </div>
    );
}
