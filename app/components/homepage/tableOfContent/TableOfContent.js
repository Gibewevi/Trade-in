import Content from "./Content";
import { PrismaClient } from '@prisma/client';
import ContentIntro from "./ContentIntro";

// Création de l'instance PrismaClient
const prisma = new PrismaClient();

// Définition du composant TableOfContent comme un Server Component
export default async function TableOfContent() {
    const color = ['text-[#FF6651]', 'text-[#54BAF3]', 'text-[#FFB905]', 'text-[#8F80F5]', 'text-[#666789]'];
    // Récupération des chapitres et des leçons associées depuis la base de données
    const chapters = await prisma.chapter.findMany({
        include: {
            lessons: true,
        },
    });

    // Fonction pour générer les composants de contenu pour chaque chapitre
    const chaptersComponents = chapters.map((chapter, index) => (
        <Content key={chapter.id} chapter={chapter} color={color[chapter.id-1]} />
    ));

    // Séparation des composants de chapitre en pairs et impairs
    const evenChapters = chaptersComponents.filter((_, index) => index % 2 !== 0);
    const oddChapters = chaptersComponents.filter((_, index) => index % 2 === 0);

    // Rendu du composant avec deux colonnes pour pairs et impairs, inversées et avec un espacement en y de 5
    return (
        <div className="w-full">
            <div className="max-w-4xl mx-auto flex p-3 mt-[35px]">
                <div className="flex-1 space-y-5">
                    <ContentIntro />
                    {evenChapters}
                </div>
                <div className="flex-1 space-y-5">
                    {/* Pour les chapitres impairs à droite */}
                    {oddChapters}
                </div>
            </div>
        </div>
    );
}