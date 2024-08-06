import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getCoursePriceById(courseId) {
    try {
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
            },
            select: {
                price: true,
            },
        });
        return course ? course.price : null;
    } catch (error) {
        console.error("Erreur lors de la récupération du prix du cours :", error);
        throw error;
    }
}

const courseModel = {
    getCoursePriceById,
};

export default courseModel;
