import courseModel from "../models/CourseModel";

async function getCoursePriceById(id) {
    const priceCourse = await courseModel.getCoursePriceById(id);
    return priceCourse;
}
// Contrôleur utilisateur
const courseController = {
    getCoursePriceById,
};

export default courseController;
