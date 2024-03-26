export default function AnimateButton (props){
    return (
        <button className="group w-[90px] h-[55px] bg-[#705DF2] p-4 rounded-xl flex justify-center items-center overflow-hidden relative">
            <div className="absolute left-0 top-0 w-0 h-full bg-[#8b7bf3] transition-all duration-300 ease-in-out group-hover:w-full"></div>
            <span className="z-10 text-slate-100 text-md font-bold">{props.title}</span>
        </button>
    )
}