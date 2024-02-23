import Lesson from "./Lesson"
export default function Chapter({ chapterData }) {
    const formatNumber = (number) => number < 10 ? `0${number}` : number;
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col justify-center pl-5 w-[430px] h-[80px] bg-[#1A1A1A] rounded-xl ">
                <span className="text-slate-100 font-extrabold text-md">Chapitre {formatNumber(chapterData.id)}</span>
                <span className="text-[#705DF2] font-bold text-xl">{chapterData.title}</span>
            </div>

            {chapterData.lessons.map((lesson) => (
                <Lesson key={lesson.id} lessonData={lesson} />
            ))}
        </div>
    )
}