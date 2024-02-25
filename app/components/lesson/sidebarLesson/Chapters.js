
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import Chapter from './Chapter';

export default async function Chapters() {
    const formatNumber = (number) => number < 10 ? `0${number}` : number;
    const chapters = await prisma.chapter.findMany({
        include: {
            lessons: true, // Inclut les leçons pour chaque chapitre
        },
    });

    return (
        <div className="flex flex-col w-full">
            {chapters.map((chapter) => (
                <Chapter key={chapter.id} chapterData={chapter} />
            ))}
        </div >
    )
}
