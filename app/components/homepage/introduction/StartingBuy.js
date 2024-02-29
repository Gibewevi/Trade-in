export default function StartingBuy() {
    return (
        <div className="group flex flex-row w-[350px] h-[70px] shadow-2xl rounded-full justify-center items-center bg-slate-100 overflow-hidden relative hover:scale-105 transition-all duration-500 ease-in-out">
            <div className="absolute left-0 top-0 w-full h-0 group-hover:h-full bg-[#705DF2] transition-all duration-500 ease-in-out z-0"></div>
            <div className="flex-1 flex items-center justify-center h-full border-r-[0.2em] border-slate-200 z-10 relative">
                <span className="font-bold text-lg text-[#8b7bf3] group-hover:text-slate-200">Commence maintenant</span>
            </div>
            <div className="flex items-center justify-center w-[90px] h-full z-10 relative">
                <span className="font-bold text-lg text-[#8b7bf3] group-hover:text-slate-200">$95</span>
            </div>
        </div>
    )
}
