import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import PlayerVideo from '@/app/components/playerVideo/PlayerVideo';
import SidebarLesson from '@/app/components/lesson/sidebarLesson/SidebarLesson';
import Chapters from '@/app/components/lesson/sidebarLesson/Chapters';

export default async function Page({ params }) {
    // Récupérez le slug à partir des params de l'URL
    const { slug } = params;

    // Utilisez Prisma pour récupérer les données de la leçon associées au slug
    const lesson = await prisma.lesson.findUnique({
        where: { slug: slug },
    });

    // Vérifiez que la leçon a été trouvée avant de tenter de l'afficher
    if (!lesson) {
        return <div>Leçon non trouvée</div>;
    }

    return (
        <div className='flex pt-[60px] w-full h-screen z-0'>
            <SidebarLesson>
                <Chapters lessonActive={slug} />
            </SidebarLesson>
            <div className='w-full h-[100%]'>
                <PlayerVideo lesson={lesson} />
            </div>
        </div>
    );
}
