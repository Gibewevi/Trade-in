'use client'
export default function Content({ chapter, color }) {
    const numberLessons = chapter.lessons.length;
    const formatNumber = (number) => number < 10 ? `0${number}` : number;

    const colorTheme = color; //red-400
    return (
        <div className="flex flex-col gap-y-3  max-w-[420px] p-8 text-slate-800 bg-slate-50 shadow-2xl rounded-2xl mb-6">
            <div className="flex flex-col gap-y-2">
                <span className={`font-bold text-lg`}>{formatNumber(chapter.id)}</span>
                <h1 className={`font-extrabold ${colorTheme} text-2xl`}>{chapter.title}</h1>
                <span>{chapter.description}</span>
            </div>

            <div className="flex flex-row">
                <span className={`${colorTheme} font-bold`}>{formatNumber(numberLessons)} lessons - 10h 12mn</span>
            </div>

            <div className="flex flex-col gap-y-2">
                {/* Parcourir les lessons du chapitre */}
                {chapter.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex flex-col p-1 border-dotted-custom border-gray-500">
                        <span className={`${colorTheme} font-semibold`}>{formatNumber(lesson.id)} <span className="text-slate-800 font-normal ml-3">{lesson.title}</span></span>
                    </div>
                ))}
            </div>
        </div>
    )
}