import React from 'react';
import Lesson from "./Lesson";

export default function Chapter({ chapterData, lessonActive }) {
    const formatNumber = (number) => number < 10 ? `0${number}` : number;

    // Tri des leçons par ordre croissant d'ID
    const sortedLessons = chapterData.lessons.sort((a, b) => a.id - b.id);

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col justify-center pl-5 w-[430px] h-[80px] bg-[#1A1A1A] rounded-xl">
                <span className="text-slate-100 font-extrabold text-md">Chapitre {formatNumber(chapterData.id)}</span>
                <span className="text-[#705DF2] font-bold text-xl">{chapterData.title}</span>
            </div>
            {sortedLessons.map((lesson) => (
                <Lesson key={lesson.id} lessonData={lesson} lessonActive={lessonActive} />
            ))}
        </div>
    );
}
